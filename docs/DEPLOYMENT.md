# Deploying the EON8 website to a VPS

Recommended starting size: 2 vCPU, 4 GB RAM, 40 GB SSD, Ubuntu 24.04, with
Cloudflare (or another CDN) in front. Do the whole setup on **stage.eon8.com**
first, test it, then repeat for www.eon8.com.

## 1. Prepare the server (once)

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx certbot python3-certbot-nginx git ufw
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER        # log out and in again
sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable
```

Use SSH keys only (`PasswordAuthentication no` in `/etc/ssh/sshd_config`).

## 2. Get the code and settings

```bash
sudo mkdir -p /srv/eon8 && sudo chown $USER /srv/eon8
git clone <repo-url> /srv/eon8 && cd /srv/eon8
cp .env.example .env && chmod 600 .env
```

Edit `.env`:

| Setting | Value |
|---|---|
| `NODE_ENV` | `production` |
| `SITE_URL` | `https://stage.eon8.com` (staging) or `https://www.eon8.com` |
| `POSTGRES_PASSWORD` | long random value with letters and digits only (`openssl rand -hex 32`); it goes into a URL |
| `CMS_ADMIN_EMAIL` / `CMS_ADMIN_PASSWORD` | first admin; remove the password after first start |
| `SMTP_*`, `MAIL_FROM` | mail service for lead notifications |
| `LEAD_IP_SALT` | random value |
| `DATA_ENCRYPTION_KEY` | `openssl rand -hex 32`; encrypts lead personal data in the database. **Store a copy in the company password manager before the first start**: if the key is lost, the lead details are lost (backups hold the same encrypted values). Never commit it. Use a different key for staging and production. |
| `BACKUP_PASSPHRASE` | long random value (`openssl rand -base64 32`), also kept in the password manager; encrypts the backup files |

`DATABASE_URL` is set by `docker-compose.prod.yml`; leave it out of `.env` there.

## 3. Start the site

```bash
docker compose -f docker-compose.prod.yml up -d --build
curl http://127.0.0.1:4173/api/health     # {"ok":true,"database":"ok"}
```

## 4. DNS, HTTPS certificate and Nginx

Point the DNS A record for stage.eon8.com at the VPS and wait until it resolves.
Leave the **MX records alone**: email does not move with the website.

Get the certificate **before** enabling the site: the Nginx config refers to the
certificate files, and Nginx refuses to start without them.

```bash
dig +short stage.eon8.com                          # must show the VPS IP
sudo certbot certonly --standalone -d stage.eon8.com \
     --pre-hook "systemctl stop nginx" --post-hook "systemctl start nginx"
sudo certbot renew --dry-run                       # the hooks make renewals automatic

sudo cp deploy/nginx/eon8-proxy.conf /etc/nginx/snippets/
sudo cp deploy/nginx/eon8-staging.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/eon8-staging.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

`eon8-staging.conf` already uses stage.eon8.com and sends a noindex header. For
production use `deploy/nginx/eon8.conf` and
`certbot certonly --standalone -d www.eon8.com -d eon8.com` with the same hooks.

To allow the admin only from office IPs, uncomment the `location` block marked
"Optional" in `eon8.conf` and list the IPs.

Then check the site from any computer:

```bash
deploy/smoke-test.sh https://stage.eon8.com        # health, redirects, 404, SEO tags, headers
node tests/url-check.mjs https://stage.eon8.com    # all 308 old WordPress URLs
```

## 5. Backups and monitoring

```bash
crontab -e
30 2 * * * cd /srv/eon8 && BACKUP_MODE=docker deploy/backup.sh >> logs/backup.log 2>&1
```

Set `BACKUP_PASSPHRASE` in `.env` so the database dump and the uploads archive
are encrypted while they are written (`backups/db-*.dump.enc`,
`backups/uploads-*.tar.gz.enc`; openssl AES-256-CBC with PBKDF2, no unencrypted
copy on disk). Set `BACKUP_RCLONE_REMOTE` to copy backups off the server; the
script warns if that is set without a passphrase.

Test a restore once (on staging or a scratch database):

```bash
read -rs BACKUP_PASSPHRASE && export BACKUP_PASSPHRASE     # paste it from the password manager
# check the file decrypts and is a valid dump
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -pass env:BACKUP_PASSPHRASE \
  -in backups/db-YYYYMMDD-HHMMSS.dump.enc | pg_restore --list > /dev/null && echo OK
# restore the database
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -pass env:BACKUP_PASSPHRASE \
  -in backups/db-YYYYMMDD-HHMMSS.dump.enc | pg_restore --clean --if-exists --no-owner -d "$DATABASE_URL"
# restore uploaded images
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -pass env:BACKUP_PASSPHRASE \
  -in backups/uploads-YYYYMMDD-HHMMSS.tar.gz.enc | tar -xzf - -C public
```

With Docker, pipe the decrypted dump into the database container instead:
`... | docker compose -f docker-compose.prod.yml exec -T db pg_restore --clean --if-exists --no-owner -U eon8 -d eon8`.
Unencrypted backups (no passphrase) restore with
`pg_restore --clean --if-exists --no-owner -d <db> backups/db-*.dump`.

A restored database still needs the same `DATA_ENCRYPTION_KEY` to show lead
details: keep both the key and the passphrase in the password manager.

Monitor `https://www.eon8.com/api/health` with an uptime checker (UptimeRobot,
Better Stack) and alert the team by email.

## 6. After staging is signed off: go live

1. Import data in the admin: Redirects (Rank Math CSV export), Leads (Flamingo CSV export).
2. Set Site Settings: lead recipients, GTM and Google Ads IDs, verification codes.
3. Run the same steps for www.eon8.com (or reuse the server with a second `server` block).
4. Lower the DNS TTL to 300 a day before, then switch the **A record** for
   eon8.com and www to the VPS. Keep the old WordPress hosting for 2–4 weeks as fallback.
5. Submit `https://www.eon8.com/sitemap.xml` in Google Search Console and watch
   the Coverage report for 404s.

## Updating

```bash
cd /srv/eon8 && deploy/deploy.sh main
```

`deploy/deploy.sh` backs up the database and uploads, pulls the branch, rebuilds,
waits for `/api/health`, and rolls back to the previous commit if the site does
not come up. Database migrations run automatically on start; they only add
tables and columns, so restore a backup if one must be undone.

## Without Docker (PM2)

Install Node 24 and PostgreSQL 16 on the server, set `DATABASE_URL` in `.env`, then:

```bash
npm ci && npm run build
npx pm2 start deploy/ecosystem.config.cjs && npx pm2 save && npx pm2 startup
```

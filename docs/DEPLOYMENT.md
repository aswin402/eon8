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

`DATABASE_URL` is set by `docker-compose.prod.yml`; leave it out of `.env` there.

## 3. Start the site

```bash
docker compose -f docker-compose.prod.yml up -d --build
curl http://127.0.0.1:4173/api/health     # {"ok":true,"database":"ok"}
```

## 4. Nginx and HTTPS

```bash
sudo cp deploy/nginx/eon8-proxy.conf /etc/nginx/snippets/
sudo cp deploy/nginx/eon8.conf /etc/nginx/sites-available/eon8.conf
# staging: change the server_name values to stage.eon8.com and enable the X-Robots-Tag line
sudo ln -s /etc/nginx/sites-available/eon8.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d stage.eon8.com
```

Point the DNS A record for stage.eon8.com at the VPS before running certbot.
Leave the **MX records alone**: email does not move with the website.

## 5. Backups and monitoring

```bash
crontab -e
30 2 * * * cd /srv/eon8 && BACKUP_MODE=docker deploy/backup.sh >> logs/backup.log 2>&1
```

Set `BACKUP_RCLONE_REMOTE` to copy backups off the server. Test a restore once:
`pg_restore --clean --if-exists --no-owner -d <db> backups/db-*.dump`.

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
cd /srv/eon8 && git pull
docker compose -f docker-compose.prod.yml up -d --build
```

Database migrations run automatically on start. To roll back, check out the
previous commit and run the same command (migrations only add; restore from a
backup if a migration must be undone).

## Without Docker (PM2)

Install Node 24 and PostgreSQL 16 on the server, set `DATABASE_URL` in `.env`, then:

```bash
npm ci && npm run build
npx pm2 start deploy/ecosystem.config.cjs && npx pm2 save && npx pm2 startup
```

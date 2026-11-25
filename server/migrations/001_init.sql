-- EON8 website backend: admin users, CMS content, leads, redirects, SEO, settings, audit log.

-- Admin accounts and sessions -------------------------------------------------
CREATE TABLE admin_users (
  id                   bigserial PRIMARY KEY,
  email                text NOT NULL UNIQUE,
  name                 text NOT NULL DEFAULT '',
  role                 text NOT NULL CHECK (role IN ('admin', 'editor')),
  password_hash        text NOT NULL,
  is_active            boolean NOT NULL DEFAULT true,
  must_change_password boolean NOT NULL DEFAULT false,
  last_login_at        timestamptz,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE admin_sessions (
  token_hash  text PRIMARY KEY,
  user_id     bigint NOT NULL REFERENCES admin_users (id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  expires_at  timestamptz NOT NULL,
  ip          text,
  user_agent  text
);
CREATE INDEX admin_sessions_user_idx ON admin_sessions (user_id);
CREATE INDEX admin_sessions_expires_idx ON admin_sessions (expires_at);

CREATE TABLE audit_log (
  id          bigserial PRIMARY KEY,
  user_id     bigint REFERENCES admin_users (id) ON DELETE SET NULL,
  user_email  text,
  action      text NOT NULL,
  entity      text NOT NULL,
  entity_id   text,
  detail      jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX audit_log_created_idx ON audit_log (created_at DESC);

-- Blog CMS (same model as the former data/cms-content.json) -------------------
-- Posts created or edited in the admin. Built-in posts that ship with the site
-- stay in the code until they are edited here.
CREATE TABLE cms_posts (
  id          bigint PRIMARY KEY,
  slug        text NOT NULL UNIQUE,
  status      text NOT NULL CHECK (status IN ('published', 'draft')),
  featured    boolean NOT NULL DEFAULT false,
  data        jsonb NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Built-in posts hidden from the site (deleted in the admin).
CREATE TABLE cms_hidden_posts (id bigint PRIMARY KEY);
CREATE TABLE cms_hidden_slugs (slug text PRIMARY KEY);

-- Old blog slug -> new blog slug after a rename.
CREATE TABLE cms_slug_redirects (
  from_slug text PRIMARY KEY,
  to_slug   text NOT NULL
);

CREATE TABLE cms_categories (
  slug text PRIMARY KEY,
  name text NOT NULL
);
CREATE TABLE cms_hidden_categories (slug text PRIMARY KEY);

-- Small key/value store for CMS bookkeeping (content version, import flags).
CREATE TABLE cms_meta (
  key   text PRIMARY KEY,
  value jsonb NOT NULL
);
INSERT INTO cms_meta (key, value) VALUES ('version', '1');

-- Leads from every website form ------------------------------------------------
CREATE TABLE leads (
  id              bigserial PRIMARY KEY,
  source          text NOT NULL,
  name            text,
  email           text,
  phone           text,
  country         text,
  website         text,
  message         text,
  preferred_slot  text,
  page_url        text,
  referrer        text,
  utm             jsonb,
  extra           jsonb,
  status          text NOT NULL DEFAULT 'new'
                  CHECK (status IN ('new', 'contacted', 'qualified', 'won', 'lost', 'spam')),
  notes           text,
  ip_hash         text,
  user_agent      text,
  email_status    text NOT NULL DEFAULT 'pending'
                  CHECK (email_status IN ('pending', 'sent', 'failed', 'skipped')),
  email_error     text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX leads_created_idx ON leads (created_at DESC);
CREATE INDEX leads_status_idx ON leads (status);
CREATE INDEX leads_source_idx ON leads (source);

-- Server-side redirects (real 301/302/410 responses) ---------------------------
CREATE TABLE redirects (
  id           bigserial PRIMARY KEY,
  source_path  text NOT NULL UNIQUE,
  target       text NOT NULL DEFAULT '',
  status_code  integer NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308, 410)),
  is_active    boolean NOT NULL DEFAULT true,
  hits         bigint NOT NULL DEFAULT 0,
  last_hit_at  timestamptz,
  note         text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- Per-page SEO overrides -------------------------------------------------------
CREATE TABLE page_seo (
  path         text PRIMARY KEY,
  title        text,
  description  text,
  og_image     text,
  canonical    text,
  noindex      boolean NOT NULL DEFAULT false,
  schema_json  jsonb,
  updated_at   timestamptz NOT NULL DEFAULT now(),
  updated_by   bigint REFERENCES admin_users (id) ON DELETE SET NULL
);

-- Site-wide settings (contact details, social links, lead recipients, tracking).
CREATE TABLE site_settings (
  key         text PRIMARY KEY,
  value       jsonb NOT NULL,
  updated_at  timestamptz NOT NULL DEFAULT now(),
  updated_by  bigint REFERENCES admin_users (id) ON DELETE SET NULL
);

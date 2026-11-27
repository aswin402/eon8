-- Editable website pages.
--   kind = 'override': an edited copy of a page that ships with the site (services,
--                      crypto, NFT, influencer, policy pages). Deleting the row
--                      puts the original content back.
--   kind = 'custom':   a page created in the admin, served at /<slug>/.
-- page_key is '<template>:<slug>', e.g. 'service:seo-packages'. Alias URLs that
-- show the same content share one key, so one edit updates all of them.
CREATE TABLE cms_pages (
  page_key         text PRIMARY KEY,
  path             text NOT NULL,
  kind             text NOT NULL CHECK (kind IN ('override', 'custom')),
  template         text NOT NULL,
  title            text NOT NULL DEFAULT '',
  status           text NOT NULL CHECK (status IN ('published', 'draft')),
  data             jsonb NOT NULL,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  updated_by       bigint REFERENCES admin_users (id) ON DELETE SET NULL,
  updated_by_email text
);
CREATE UNIQUE INDEX cms_pages_path_idx ON cms_pages (lower(path));

-- Previous versions of a page, saved each time it is edited (newest 20 kept).
CREATE TABLE cms_page_revisions (
  id              bigserial PRIMARY KEY,
  page_key        text NOT NULL,
  title           text NOT NULL DEFAULT '',
  status          text NOT NULL,
  data            jsonb NOT NULL,
  saved_at        timestamptz NOT NULL DEFAULT now(),
  saved_by        bigint REFERENCES admin_users (id) ON DELETE SET NULL,
  saved_by_email  text
);
CREATE INDEX cms_page_revisions_key_idx ON cms_page_revisions (page_key, saved_at DESC);

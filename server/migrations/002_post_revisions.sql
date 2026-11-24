-- Previous versions of blog posts, saved each time a post is edited in the admin.
CREATE TABLE cms_post_revisions (
  id              bigserial PRIMARY KEY,
  post_id         bigint NOT NULL,
  data            jsonb NOT NULL,
  saved_at        timestamptz NOT NULL DEFAULT now(),
  saved_by        bigint REFERENCES admin_users (id) ON DELETE SET NULL,
  saved_by_email  text
);
CREATE INDEX cms_post_revisions_post_idx ON cms_post_revisions (post_id, saved_at DESC);

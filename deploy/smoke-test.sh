#!/usr/bin/env bash
# Quick checks after a deploy. Read-only: it only sends GET/HEAD requests.
#   deploy/smoke-test.sh https://stage.eon8.com
#   deploy/smoke-test.sh https://www.eon8.com
set -uo pipefail

BASE="${1:?Usage: deploy/smoke-test.sh https://stage.eon8.com}"
BASE="${BASE%/}"
fail=0

check() {  # name, condition result (0 = ok), detail
  if [ "$2" -eq 0 ]; then echo "PASS  $1"; else echo "FAIL  $1  ($3)"; fail=$((fail + 1)); fi
}
status() { curl -s -o /dev/null -w '%{http_code}' "$BASE$1"; }
location() { curl -s -o /dev/null -w '%{redirect_url}' "$BASE$1" | sed -E "s#^$BASE##"; }

body="$(curl -s "$BASE/api/health")"
echo "$body" | grep -q '"ok":true'; check "health endpoint" $? "$body"

s="$(status /)"; [ "$s" = 200 ]; check "home page 200" $? "$s"
s="$(status /about-us/)"; [ "$s" = 200 ]; check "/about-us/ 200" $? "$s"
s="$(status /blog/)"; [ "$s" = 200 ]; check "/blog/ 200" $? "$s"
s="$(status /no-such-page-smoke-test/)"; [ "$s" = 404 ]; check "unknown page 404" $? "$s"
s="$(status /admin-dashboard)"; [ "$s" = 200 ]; check "admin page loads" $? "$s"

l="$(location /twitter-mindshare/)"; [ "$l" = "/blog/twitter-mindshare/" ]; check "old post URL 301 to /blog/" $? "$l"
l="$(location /feed/)"; [ "$l" = "/blog/" ]; check "/feed/ 301 to /blog/" $? "$l"
l="$(location /orm)"; [ "$l" = "/online-reputation-management-agency/" ]; check "renamed page 301" $? "$l"

html="$(curl -s "$BASE/about-us/")"
echo "$html" | grep -q '<title>About Eon8'; check "page title in HTML" $? "title missing"
echo "$html" | grep -q 'rel="canonical" href="[^"]*/about-us/"'; check "canonical with trailing slash" $? "canonical missing"
echo "$html" | grep -q 'id="eon8-jsonld"'; check "JSON-LD in HTML" $? "json-ld missing"

n="$(curl -s "$BASE/sitemap.xml" | grep -c '<loc>')"; [ "$n" -gt 250 ]; check "sitemap has URLs" $? "$n"
curl -s "$BASE/robots.txt" | grep -qi 'disallow: /admin-dashboard'; check "robots.txt blocks admin" $? "rule missing"

headers="$(curl -sI "$BASE/")"
echo "$headers" | grep -qi '^content-security-policy'; check "Content-Security-Policy header" $? "missing"
case "$BASE" in https://*)
  echo "$headers" | grep -qi '^strict-transport-security'; check "HSTS header" $? "missing";;
esac
s="$(status /seo-manifest.json)"; [ "$s" = 404 ]; check "build files not public" $? "$s"
s="$(status /google2013d7c7aad306e8.html)"; [ "$s" = 200 ]; check "Google verification file" $? "$s"

echo
if [ "$fail" -eq 0 ]; then echo "All checks passed."; else echo "$fail check(s) failed."; fi
exit "$fail"

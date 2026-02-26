#!/usr/bin/env bash
# Verify profile SEO: fetches a subdomain URL and checks for injected meta, JSON-LD, and noscript content.
# Usage: ./scripts/verify-profile-seo.sh <subdomain> [host]
# Example: ./scripts/verify-profile-seo.sh john
# Example: ./scripts/verify-profile-seo.sh john localhost:8080

SUBDOMAIN="${1:?Usage: $0 <subdomain> [host]}"
HOST="${2:-withlumeo.com}"
# Use http for localhost so you can test locally (e.g. host = localhost:8080)
if [[ "$HOST" == localhost* ]]; then
  URL="http://${SUBDOMAIN}.${HOST}"
else
  URL="https://${SUBDOMAIN}.${HOST}"
fi
# Use Googlebot user agent so the server sees a crawler (if you ever vary behavior by UA)
UA="Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"

echo "Fetching: $URL"
echo "User-Agent: $UA"
echo ""

# Get response headers (for X-Profile-SEO when request hits the Node server)
HEADERS=$(curl -sS -I -A "$UA" "$URL" 2>/dev/null)
SEO_HEADER=$(echo "$HEADERS" | grep -i '^X-Profile-SEO:' | sed 's/^X-Profile-SEO: //I' | tr -d '\r')
if [[ -n "$SEO_HEADER" ]]; then
  echo "--- Server (X-Profile-SEO) ---"
  echo "  $SEO_HEADER"
  echo ""
fi

BODY=$(curl -sS -A "$UA" "$URL" 2>/dev/null)

check() {
  if echo "$BODY" | grep -q "$1"; then
    echo "  OK: $2"
  else
    echo "  MISSING: $2"
  fi
}

echo "--- Checks ---"
# Custom title = not the default "Lumeo"
if echo "$BODY" | grep -q '<title>Lumeo</title>'; then
  echo "  DEFAULT: Title is still 'Lumeo' (profile SEO not applied)"
elif echo "$BODY" | grep -q '<title>'; then
  echo "  OK: Custom <title> (profile SEO applied)"
else
  echo "  MISSING: <title>"
fi
check 'application/ld+json' "JSON-LD script"
check '"@graph"' "JSON-LD @graph"
check '"worksFor"' "JSON-LD worksFor (experience)"
check '"alumniOf"' "JSON-LD alumniOf (education)"
check '"knowsAbout"' "JSON-LD knowsAbout (skills)"
check '"ItemList"' "JSON-LD ItemList (projects)"
check '<noscript>' "Noscript block"
check 'profile-seo-content' "Full profile article"
check 'Experience</h2>' "Experience section"
check 'Projects</h2>' "Projects section"
check 'Skills</h2>' "Skills section"
check 'Education</h2>' "Education section"
check 'og:title' "Open Graph meta"
check 'rel="canonical"' "Canonical URL"

echo ""
echo "--- Verdict ---"
if echo "$BODY" | grep -q '"@graph"' && echo "$BODY" | grep -q 'profile-seo-content'; then
  echo "Profile SEO is active: JSON-LD and noscript content present."
else
  echo "Profile SEO is NOT active. You are seeing the default Lumeo page."
  if [[ -n "$SEO_HEADER" ]]; then
    echo "Reason from server: $SEO_HEADER"
  else
    echo "No X-Profile-SEO header — request likely not reaching the Node server (e.g. static host/CDN)."
    echo "Fix: point subdomain at the same app that runs the Node server and preserves Host header."
  fi
  echo ""
  echo "If X-Profile-SEO was present: reason=no-subdomain → proxy not forwarding Host; reason=portfolio-not-found → DB has no row with subdomain='$SUBDOMAIN' and is_public=1."
fi

echo ""
echo "--- Sample (first 120 chars of title and description) ---"
echo "$BODY" | sed -n 's/.*<title>\([^<]*\)<\/title>.*/\1/p' | head -1
echo "$BODY" | sed -n 's/.*<meta name="description" content="\([^"]*\)".*/\1/p' | head -1

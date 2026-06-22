#!/bin/bash
# Check that new/modified blog posts include an atUri for standard.site verification.
# This runs in CI on PRs to remind authors to create a site.standard.document record.

set -euo pipefail

BASE_BRANCH="${1:-origin/main}"
ERRORS=0

# Get blog files that were added or modified in this branch
CHANGED_BLOGS=$(git diff --name-only --diff-filter=AM "$BASE_BRANCH"...HEAD -- 'src/content/blog/*.md' 'src/content/blog/*.mdx' 2>/dev/null || true)

if [ -z "$CHANGED_BLOGS" ]; then
  echo "No new or modified blog posts found. Skipping atUri check."
  exit 0
fi

for file in $CHANGED_BLOGS; do
  # Skip draft posts
  if grep -q '^draft: true' "$file"; then
    echo "SKIP (draft): $file"
    continue
  fi

  if ! grep -q '^atUri:' "$file"; then
    echo "WARNING: $file is missing 'atUri' in frontmatter."
    echo "  -> Create a site.standard.document record on your PDS (e.g. via pdsls.dev)"
    echo "  -> Then add to frontmatter: atUri: \"at://did:plc:7sagqfh4v4t6zl7bdwbikdc2/site.standard.document/RKEY\""
    echo ""
    ERRORS=$((ERRORS + 1))
  else
    echo "OK: $file"
  fi
done

if [ "$ERRORS" -gt 0 ]; then
  echo ""
  echo "$ERRORS blog post(s) missing atUri. Please create site.standard.document records."
  echo "See: https://standard.site/docs/quick-start/"
  exit 1
fi

echo "All blog posts have atUri set."

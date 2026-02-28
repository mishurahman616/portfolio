# Caching external stats for GitHub Pages

This project uses external APIs (Codeforces, LeetCode) which are not always reliable or available from client-side code due to CORS and rate limits. Since the site is published to GitHub Pages (static hosting), we cache these stats at build/runtime using a scheduled GitHub Action.

What the workflow does

- Runs every 6 hours (configurable) or manually via `workflow_dispatch`.
- Fetches Codeforces (`https://codeforces.com/api/user.info?handles=...`) and LeetCode data (both a public stats API and a GraphQL query) from the runner.
- Writes combined data to `public/data/stats.json`.
- Commits `public/data/stats.json` back to the repository so GitHub Pages serves it as a static file.

Frontend behavior

- The `ProblemSolving` component first attempts to read `data/stats.json` (served from GitHub Pages) and uses it if available.
- If the cached file is missing or stale, the component falls back to runtime fetches (best-effort) using the previous approach.

Benefits

- No runtime CORS proxies required for normal operation.
- Fast and reliable reads from GitHub Pages static files.
- Reduces dependency on third-party services and rate limits.

Notes and next steps

- You can change the schedule in `.github/workflows/fetch-stats.yml`.
- If you prefer not to commit generated files, modify the workflow to upload the JSON as an artifact or deploy to a bucket/CDN instead.
- Consider storing only non-sensitive public info; do not cache private tokens.

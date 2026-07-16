# Content queue — automated article pipeline for mycomputer.education

This folder is the handoff point between the scheduled cloud writing agent and the live site. The agent cannot reach the VPS directly (no SSH access, no local secrets) — it only has a git checkout — so the flow is split in two:

1. **Cloud agent** (scheduled 2x/week via a Claude Code routine) writes one bilingual article, drops it as a JSON file in `content-queue/pending/`, updates `topics-backlog.json`, and pushes directly to `master`.
2. **GitHub Actions** (`.github/workflows/publish-queued-articles.yml`, triggered on push touching `content-queue/pending/**`) SSHes into the VPS and runs `content-queue/scripts/publish-from-queue.js`, which calls the site's own `articles.js` `create()` — the same mechanism the admin panel itself uses. Successfully published files move to `content-queue/published/`.

## Files

- `guides/humanize-guide.md`, `guides/geo-guide.md` — mirrored copies of the cross-project content guides (source of truth: `C:\Users\MrCOMP\Documents\AI-Content-Playbook\`). The cloud agent reads these from the repo since it can't reach the local filesystem. **If the source guides are updated, re-copy them here too** — this is a manual mirror, not a symlink.
- `topics-backlog.json` — planned topics not yet written. The agent picks the next `"status": "pending"` entry and flips it to `"done"` after writing. If the backlog runs dry, the agent either finds a real, dated, verifiable trending topic via web search, or generates a new one grounded in live course-API data (never fabricated).
- `pending/` — articles written but not yet published (should normally be empty — CI processes them within minutes of push).
- `published/` — archive of successfully published article JSONs, for history/dedup reference.
- `scripts/publish-from-queue.js` — the actual publish step, run on the VPS by CI.

## Hard rules (same as the guides, restated because this runs unattended)

- Never fabricate a fact, statistic, case study, or competitor claim. Every concrete number must trace to the live `/api/courses` data, a real cited source, or the site owner's own prior input.
- Never touch existing published articles or their slugs.
- One article per scheduled run, both `content` (Ukrainian) and `content_ru` (Russian) required.
- Match the exact JSON field shape of existing articles (`slug, title, title_ru, excerpt, excerpt_ru, content, content_ru, category, coverEmoji, author`) — verify against a live article via the API before writing.

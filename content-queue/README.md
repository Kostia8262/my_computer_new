# Content queue — automated article pipeline for mycomputer.education

This folder is the handoff point between the scheduled cloud writing agent and the live site. The agent cannot reach the VPS directly (no SSH access, no local secrets), and — confirmed 2026-07-16 — its sandbox's network policy also blocks outbound requests to mycomputer.education entirely (the sandbox's own proxy returns 403 before the request reaches the site). So the agent only ever has a git checkout, and the flow is split in three:

1. **GitHub Actions** (`.github/workflows/refresh-content-snapshot.yml`, cron 45min before each writer run) fetches `/api/courses` and `/api/articles` from the live site — from the Actions runner, which has normal network access — and commits the result to `content-queue/snapshot/`. This is how the agent gets real, current data without needing outbound access itself.
2. **Cloud agent** (scheduled 2x/week via a Claude Code routine) reads the snapshot, writes one bilingual article, drops it as a JSON file in `content-queue/pending/`, updates `topics-backlog.json`, and pushes directly to `master`.
3. **GitHub Actions** (`.github/workflows/publish-queued-articles.yml`, triggered on push touching `content-queue/pending/**`) SSHes into the VPS and runs `content-queue/scripts/publish-from-queue.js`, which calls the site's own `articles.js` `create()` — the same mechanism the admin panel itself uses. Successfully published files move to `content-queue/published/`.

## Files

- `guides/humanize-guide.md`, `guides/geo-guide.md` — mirrored copies of the cross-project content guides (source of truth: `C:\Users\MrCOMP\Documents\AI-Content-Playbook\`). The cloud agent reads these from the repo since it can't reach the local filesystem. **If the source guides are updated, re-copy them here too** — this is a manual mirror, not a symlink.
- `snapshot/courses.json`, `snapshot/articles.json`, `snapshot/meta.json` — auto-refreshed live-data mirror the agent reads instead of hitting the API directly (see above). `meta.json` has a `refreshed_at` timestamp — if it's more than a few hours old when the agent runs, the refresh workflow itself may need attention.
- `topics-backlog.json` — planned topics not yet written. The agent picks the next `"status": "pending"` entry and flips it to `"done"` after writing. If the backlog runs dry, the agent either finds a real, dated, verifiable trending topic via web search, or generates a new one grounded in the snapshot's course data (never fabricated).
- `pending/` — articles written but not yet published (should normally be empty — CI processes them within minutes of push).
- `published/` — archive of successfully published article JSONs, for history/dedup reference.
- `scripts/publish-from-queue.js` — the actual publish step, run on the VPS by CI.

## Known environment limitation (2026-07-16)

The cloud agent's sandbox cannot reach mycomputer.education directly — confirmed via a test run where every fetch attempt got a 403 at the sandbox's own outbound proxy, for the whole domain, not just `/api/*`. WebSearch/WebFetch to *other* domains (for the trending-topic fallback) were not confirmed broken by that test, only mycomputer.education specifically was tested and found blocked — if a future run reports WebSearch also failing, that's a separate, new finding worth recording here. The snapshot workflow above is the permanent workaround; if Anthropic's environment settings later expose a way to allowlist a domain per-environment, that could replace it, but isn't required for this pipeline to work.

## Hard rules (same as the guides, restated because this runs unattended)

- Never fabricate a fact, statistic, case study, or competitor claim. Every concrete number must trace to the live `/api/courses` data, a real cited source, or the site owner's own prior input.
- Never touch existing published articles or their slugs.
- One article per scheduled run, both `content` (Ukrainian) and `content_ru` (Russian) required.
- Match the exact JSON field shape of existing articles (`slug, title, title_ru, excerpt, excerpt_ru, content, content_ru, category, coverEmoji, author`) — verify against a live article via the API before writing.

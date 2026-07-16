# Water ripple background (shelved 2026-07-16)

Interactive canvas ripple that reacted to the cursor across the whole
homepage — behind all content (z-index:-1), sections went transparent
via `body.ripple-on` so their own white/dark backgrounds appeared to
ripple, while text/cards/images/buttons stayed untouched on top.

User decided against it after seeing it live and asked to revert
`sites/main` to its pre-feature state (commit `a4df52e`).

## Contents
- `feature.patch` — the exact diff (`git diff a4df52e HEAD -- sites/main/css/style.css sites/main/index.html sites/main/js/main.js`)
- `snapshot/` — full copies of the three touched files as they were with the feature live

## To reapply
From repo root, with `sites/main` at (or compatible with) `a4df52e`:

```
git apply features/water-ripple-background/feature.patch
```

or just copy the files from `snapshot/` back into `sites/main/`.

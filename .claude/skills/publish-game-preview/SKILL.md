---
name: publish-game-preview
description: Publishes an exported HTML5 game build to a password-gated preview link on preview.crowloop.studio, for sharing work-in-progress builds with clients. Use whenever the user wants to share a game demo/build/prototype with a client, create or publish a preview link, mentions "preview.crowloop.studio", "Spiele-Preview", "Kunden-Preview", "Spiel hochladen", or asks how to get a client review link for a game build — even if they don't name this skill directly. Also use to troubleshoot a failed or stuck preview upload.
---

# Publish a game preview

Crow Loop Studio hosts client-facing HTML5 game previews on a dedicated subdomain, separate
from the main marketing site. Every build gets published to
`https://preview.crowloop.studio/{game-name}/{date}/`, gated by a freshly generated password,
and is invisible to search engines. This exists so Guido can send a client a working link to
review a prototype without it being a public, indexable, or guessable URL.

The infrastructure (S3 bucket, CloudFront distribution, the auth logic) already exists in AWS
account `780976818971` — see "Infrastructure reference" below. **Do not recreate any of it.**
This skill is about *using* the existing pipeline, not building it.

## Prerequisites

1. **Local AWS CLI credentials must be active.** The upload script shells out to `aws s3 sync`
   and `aws cloudfront-keyvaluestore put-key`, which need real credentials on the machine running
   it (this can't go through a sandboxed MCP tool — the KeyValueStore write API needs
   `botocore[crt]`/SigV4A support that sandboxed environments typically don't have).
   Check with:
   ```bash
   aws sts get-caller-identity
   ```
   If that fails (`Unable to locate credentials` or similar), credentials have expired —
   `aws login` credentials last ~12 hours. Ask the user for confirmation, then run:
   ```bash
   aws login
   ```
   (This opens a browser for sign-in. If AWS CLI is missing or older than 2.32.0, point the user
   to https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html instead of
   trying to work around it.)

2. **The build folder must contain `index.html` at its root.** This is the exported output of
   whatever engine the game was built with (Construct, Unity WebGL, Godot HTML5 export, etc.) —
   not the source project. If unsure what the user means by "the build," ask where the export
   landed rather than guessing a path.

## Publishing a build

From the repo root (`C:\guido-GIT\CrowLoopWebsite`):

```bash
npm run preview:upload -- <game-name> <path-to-build-folder>
```

- `<game-name>`: lowercase letters, digits, and hyphens only — it becomes part of the URL. If the
  user gives a name with spaces or capitals, slugify it (e.g. "Dino Runner" → `dino-runner`) and
  confirm the result with them if it's not obvious.
- `<path-to-build-folder>`: the exported game's folder (must contain `index.html`).
- An optional third argument overrides the date (`YYYY-MM-DD`); omit it — the script defaults to
  today, which is what you want almost always. Only override it if the user explicitly asks for a
  specific date (e.g. backfilling or matching an external record).

What the script does, in order: syncs the folder to S3 (`aws s3 sync ... --delete`), generates a
random 24-character password, registers it against the `{game-name}/{date}` key in the CloudFront
KeyValueStore, and invalidates the CDN cache for that path. It prints the final URL and password
at the end — hand both to the user so they can send them to the client. Re-running the same
command for the same game on a later day publishes a new, independently-passworded version at a
new date path; it does not touch or invalidate the previous one.

**Report the output back to the user plainly** — the URL and password are the actual deliverable
here, not implementation detail to summarize away:
```
URL:      https://preview.crowloop.studio/dino-runner/2026-09-07/
Password: mAmRbCWauqecvKbhH9SHQYaX
```

## Lifecycle

Published builds and their passwords expire automatically 60 days after upload (an S3 lifecycle
rule deletes the objects; once they're gone, the password stops working — nothing else to clean
up). If the user wants something to last longer, there's no override — re-running the upload
command extends it by publishing a fresh copy.

## Troubleshooting

**`Unable to locate credentials` / any `aws` step fails with an auth-flavored error** — `aws
login` credentials expired. Confirm with the user, then re-run `aws login` and retry the upload.

**Script exits at the `index.html` check** — the given build folder doesn't have `index.html` at
its root. Ask the user for the actual export folder rather than passing `--force` or working
around it; a missing `index.html` almost always means the wrong folder was pointed at (e.g. the
Unity project root instead of the `Build/` output), not a real edge case to bypass.

**Upload succeeds but the URL 404s or won't authenticate right after publishing** — CloudFront
invalidation can take a minute or two to propagate globally; this is normal, not a failure. If it
still doesn't work after several minutes, check the distribution status (see reference below)
rather than assuming the upload script is broken.

**User wants to reuse a password across games, or wants one shared studio-wide password instead
of per-game** — this was a deliberate design decision (each game/version gets its own generated
password so a client can never stumble into another client's preview). Don't build a workaround
for this without the user explicitly asking to change that behavior.

## Infrastructure reference (already provisioned — do not recreate)

| Resource | Value |
|---|---|
| S3 bucket | `crowloop-game-previews` (eu-central-1, private, OAC-locked, 60-day lifecycle expiry) |
| CloudFront distribution | `E86C5WH38WK2F` (`d3hsk4ip9xd9o8.cloudfront.net`) |
| CloudFront Function | `crowloop-preview-basic-auth` — viewer-request: per-`{game}/{date}` Basic Auth via KeyValueStore, plus an `index.html` rewrite so trailing-slash-free URLs resolve. Unknown game/date → 404 (not 401, so nonexistent previews don't even confirm they once existed); wrong/missing password → 401. |
| CloudFront KeyValueStore | `crowloop-preview-passwords`, ARN ending `.../db546f82-8b6c-4936-af5d-38fa0b6ae8f1` |
| Upload script | `scripts/upload-preview.mjs` in this repo |
| ACM certificate | us-east-1 (CloudFront requires this regardless of where the bucket/origin lives — not a data-residency exception) |

If any of this needs to change (e.g. adding a second preview domain, changing password length,
extending the 60-day expiry), treat it as real infrastructure work — check current state via the
AWS MCP tools before assuming what's configured, the same way you would for any other AWS change
in this project. Don't just edit `scripts/upload-preview.mjs`'s constants without also confirming
they match what's actually deployed.

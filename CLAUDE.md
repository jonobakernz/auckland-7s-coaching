# Sevens Coaching Form: notes for Claude

A phone app (progressive web app) for rugby referee coaches at sevens tournaments. Coaches score games, save them on the phone, and upload them. Organisers rank referees. Read `README.md` for the full picture and `docs/RELEASE_NOTES.md` for support notes.

## How the project is built
- The front end has no build step and no packages: the whole app is in `index.html` (HTML, CSS and JavaScript).
  Keep it that way unless asked. There is now a small amount of server code too (see below) -- that is a
  deliberate exception, not a drift back towards a build pipeline; do not add one for the front end.
- `sw.js` is the offline service worker. `manifest.webmanifest` holds install details.
- `fonts/`, `icons/`, `lib/` (QR code maker and scanner) and `demo/` hold assets. `tools/` holds scripts.
- **This project (`auckland-7s-coaching`) is a separate site from `sevens-coaching-form`, the project it was copied
  from, and must stay separate.** Hosting is not connected yet, deliberately: when it is, this project runs on its
  own Cloudflare Worker with static assets, on its own domain. **Never point it at `coach7srefs.nz`, or at any
  other Worker, D1 database, secret or domain belonging to the original `sevens-coaching-form` project.** That
  domain, and the GitHub Pages / static.app retirement history further down this file and in
  `docs/RELEASE_NOTES.md`, describe that project's own deploy history from before this repo was copied -- none of
  it is this project's history, and none of it should be repeated as if it happened here.
  **This repo is private.**
- **Coaching-results uploads and in-app feedback are stored in this site's own Cloudflare D1 database**, written
  through the Worker in `worker/index.js` (`wrangler.toml` wires the Worker, the static-assets binding and the D1
  binding together). This replaced SnapItForms, a third-party form backend used briefly as a trial (Sept 2026) and
  found to have no independent track record -- see `docs/RELEASE_NOTES.md` for that history. Nothing is a vendor
  trial any more: it is our own data, in our own database, on the same origin as the app, so there is no
  cross-origin `fetch` or CSP concern the way SnapItForms and static.app both were.
- `POST /api/results` and `POST /api/feedback` accept a result upload and a feedback message respectively, gated
  by `UPLOAD_KEY` (a header the client sends, checked against a Worker secret of the same name -- not a real
  secret, see Rule 3). `GET /api/results` and `GET /api/feedback` are the organiser-only export, gated by
  `ADMIN_KEY` (a real secret, never in this repo). See `worker/index.js` for the routes and
  `migrations/0001_init.sql` for the schema -- each result row stores its payload as JSON, so the schema does not
  need to change when `SECTIONS` or `UP_FIELDS` do.
- Setting up a new environment needs a one-off `wrangler d1 create auckland_7s_results`, pasting the database ID
  into `wrangler.toml`, running the migration, and `wrangler secret put UPLOAD_KEY` / `ADMIN_KEY`. None of that
  lives in this repo. Use a fresh Cloudflare Worker and D1 database for this project -- never the original
  `sevens-coaching-form` project's.

## Rules that matter
1. **Work on a branch and open a pull request.** Never push to `main`. Never merge. Once Cloudflare is connected for this project, a merge to `main` will deploy it -- to this project's own Worker and domain, never `coach7srefs.nz` or anything else belonging to `sevens-coaching-form`.
2. **Do not change the upload fields** (`UP_FIELDS` in `index.html`) unless the task says so. Anyone exporting from the Worker, or from an old CSV, expects these column names to stay put. `node tools/check.js` fails if they change. If a change is on purpose, run `node tools/check.js --update-fields` and say so in the pull request.
3. **Never put real names, keys or hosting tokens in the repo.** `ADMIN_KEY` (the organiser export key) is a real secret and must only ever be set with `wrangler secret put ADMIN_KEY`, never written to a file. `UPLOAD_KEY` in `index.html` is different: it has to sit in plain sight for a browser-only app to work, so it is not a secret Anthropic-style, but it should not be advertised -- anyone who has it can write junk rows into the database. `wrangler.toml`'s `database_id` is not secret either (it just names which D1 database to use) but leave it as the placeholder in this repo; each environment fills in its own. Demo data is made up.
4. **Private notes stay private.** They must never appear in the shared summary, the email, or the print. They do go in uploads, backups and CSV exports.
5. **Voice notes stay on the phone.** They are not uploaded, not in backups, and not emailed. Dictation sends audio to the browser's speech service, so it keeps its warning and its switch in Setup.
6. **Do not edit `CACHE` in `sw.js` by hand for a release.** The deploy workflow sets it from the commit.
7. **Keep old data working.** Forms saved by older releases must still open. Add new fields with defaults, as `normalise()` does.
8. Update `docs/RELEASE_NOTES.md` when a change is user-visible.

## Test before you finish
- `node tools/check.js` must pass.
- Run the front end alone: `python3 -m http.server 8000`, then open http://localhost:8000. Test on a phone-size screen (about 390 px wide). Uploads and feedback will report "offline" this way, since `/api/*` does not exist without the Worker.
- To exercise `/api/results` and `/api/feedback` for real, run `wrangler dev` instead (needs a D1 binding -- `wrangler dev` can use a local D1 database, no live account access required for that part). Otherwise test with a mock of `window.fetch` for `/api/results` and `/api/feedback`, covering a success, an HTTP failure, a JSON `success: false`, and a thrown/network error.
- If changing `worker/index.js`, also sanity-check the export routes (`GET /api/results`, `GET /api/feedback`) with a real or `wrangler dev` D1 database, including the `ADMIN_KEY` check rejecting a missing or wrong key.
- Voice and dictation: use a fake microphone in Playwright, and a mock `SpeechRecognition`.
- Keep touch targets at 44 px or more, keep text contrast at 4.5 to 1, and run an accessibility scan (axe) on all four tabs.

## Writing style for the app
- Short sentences and plain words. New Zealand spelling: organise, colour, referee.
- Te reo Māori labels carry macrons. Do not change them without a fluent speaker's check.
- Score meanings (`ANCHORS`), areas and quick notes (`SECTIONS`) are drafts the coaches will agree. Change them only when asked.

## Where things are in `index.html`
`ANCHORS`, `SECTIONS` (areas and quick notes), storage keys (`LS_*`), form records (`blank()`, `normalise()`), upload and feedback (`UP_FIELDS`, `payload()`, `uploadOne()`, `submitFeedback()`, `RESULTS_ENDPOINT`, `FEEDBACK_ENDPOINT`, `UPLOAD_KEY`), review table (`collect()`, `renderReview()`), setup link and QR (`makeSetup()`, `startScan()`), voice notes and dictation (search "Voice notes" and "Dictation"), demo (`loadDemo()`).

## Where things are outside `index.html`
`worker/index.js` is the whole backend: routes, D1 queries, CSV/JSON export. `migrations/0001_init.sql` is the D1 schema. `wrangler.toml` wires the Worker, the static-assets binding and the D1 binding together.

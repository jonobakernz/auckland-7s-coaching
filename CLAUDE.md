# Sevens Coaching Form: notes for Claude

A phone app (progressive web app) for rugby referee coaches at sevens tournaments. Coaches score games, save them on the phone, and upload them. Organisers rank referees. Read `README.md` for the full picture and `docs/RELEASE_NOTES.md` for support notes.

## How the project is built
- No build step and no packages. The whole app is in `index.html` (HTML, CSS and JavaScript). Keep it that way unless asked.
- `sw.js` is the offline service worker. `manifest.webmanifest` holds install details.
- `fonts/`, `icons/`, `lib/` (QR code maker and scanner) and `demo/` hold assets. `tools/` holds scripts.
- **Hosted on Cloudflare** (a Worker with static assets, connected to this GitHub repo), at `https://coach7srefs.nz`.
  Cloudflare redeploys automatically after a push to `main`, no workflow needed on this side -- Cloudflare's own
  GitHub integration handles it. Two earlier addresses are retired and must not be used or linked anywhere:
  `https://jonobakernz.github.io/sevens-coaching-form/` (GitHub Pages -- now 404, since Pages does not work on a
  private repo on the Free plan and the repo is private again) and `https://easy-goingcrow.staticdomains.app/`
  (static.app -- still online but its own CSP header blocks results and feedback there; see the next point).
  **The repo is private again.** It only had to be public for the GitHub Pages era; Cloudflare has no such
  restriction. Do not assume public-repo conventions (like the old "keep the SnapItForms key unpublicised, but the
  repo itself doesn't matter" framing) still apply -- treat the repo as private going forward.
- **Coaching-results uploads and in-app feedback both go to SnapItForms** (`api.snapitforms.com`), not static.app.
  This is why the app had to leave static.app hosting: static.app sends a `Content-Security-Policy` header
  (`connect-src 'self' https://*.static.domains https://static.app`) that silently blocks `fetch()` to any other
  domain, including SnapItForms. GitHub Pages sends no such header. Do not reintroduce anything that assumes the
  app is served by static.app.
- SnapItForms itself is a small third-party service with no independent track record found when this was added
  (Sept 2026) -- treat it as unproven until it has held up over real use. `uploadOne()` and `submitFeedback()` both
  post with `fetch`; there is no hidden form or vendor script for either any more.

## Rules that matter
1. **Work on a branch and open a pull request.** Never push to `main`. Never merge. A merge to `main` deploys to Cloudflare. There is no longer a static.app deploy workflow -- that address is frozen at its last release and will never update again.
2. **Do not change the upload fields** (`UP_FIELDS` in `index.html`) unless the task says so. Anyone exporting from SnapItForms, or from an old CSV, expects these column names to stay put. `node tools/check.js` fails if they change. If a change is on purpose, run `node tools/check.js --update-fields` and say so in the pull request.
3. **Never put real names, keys or hosting tokens in the repo.** The static.app deploy key and the `STATICAPP_API_KEY`/`STATICAPP_PID` secret and variable it lived in have been removed entirely, now that nothing deploys there any more -- if a hosting secret is ever needed again, it belongs in a GitHub secret, never in a file. The SnapItForms access key (`SNAPIT_ACCESS_KEY` in `index.html`) is different: it has to sit in plain sight for a browser-only app to work, so it is not a secret Anthropic-style, but it should not be advertised -- anyone who has it can send junk into the SnapItForms dashboard. Demo data is made up.
4. **Private notes stay private.** They must never appear in the shared summary, the email, or the print. They do go in uploads, backups and CSV exports.
5. **Voice notes stay on the phone.** They are not uploaded, not in backups, and not emailed. Dictation sends audio to the browser's speech service, so it keeps its warning and its switch in Setup.
6. **Do not edit `CACHE` in `sw.js` by hand for a release.** The deploy workflow sets it from the commit.
7. **Keep old data working.** Forms saved by older releases must still open. Add new fields with defaults, as `normalise()` does.
8. Update `docs/RELEASE_NOTES.md` when a change is user-visible.

## Test before you finish
- `node tools/check.js` must pass.
- Run the app: `python3 -m http.server 8000`, then open http://localhost:8000. Test on a phone-size screen (about 390 px wide).
- Coaching-results uploads and feedback both go to SnapItForms: test with a mock of `window.fetch` for `api.snapitforms.com`, covering a success, an HTTP failure, a JSON `success: false`, and a thrown/network error. A local `python3 -m http.server` copy has none of static.app's headers, so it cannot catch a CSP-type problem -- if a future host might add its own restrictive headers, check the real deployed page's response headers directly (`curl -I`), not just a local copy.
- Voice and dictation: use a fake microphone in Playwright, and a mock `SpeechRecognition`.
- Keep touch targets at 44 px or more, keep text contrast at 4.5 to 1, and run an accessibility scan (axe) on all four tabs.

## Writing style for the app
- Short sentences and plain words. New Zealand spelling: organise, colour, referee.
- Te reo Māori labels carry macrons. Do not change them without a fluent speaker's check.
- Score meanings (`ANCHORS`), areas and quick notes (`SECTIONS`) are drafts the coaches will agree. Change them only when asked.

## Where things are in `index.html`
`ANCHORS`, `SECTIONS` (areas and quick notes), storage keys (`LS_*`), form records (`blank()`, `normalise()`), upload and feedback, both to SnapItForms (`UP_FIELDS`, `payload()`, `uploadOne()`, `submitFeedback()`, `SNAPIT_ACCESS_KEY`), review table (`collect()`, `renderReview()`), setup link and QR (`makeSetup()`, `startScan()`), voice notes and dictation (search "Voice notes" and "Dictation"), demo (`loadDemo()`).

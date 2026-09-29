# Sevens Coaching Form: release notes

Updated 29 Sept 2026. Current release: 30.

## At a glance

Release 27 is live at <https://coach7srefs.nz>. It is a phone app. Coaches use it to score referees. Organisers
use it to rank them. This release moves coaching-results uploads and in-app feedback off SnapItForms and onto this
site's own Cloudflare Worker and D1 database -- see "What is new for organisers" and the Support reference below.
SnapItForms is no longer used anywhere in the app.

**The site moved from GitHub Pages to Cloudflare, at a new custom domain, and the repo is private again.**
GitHub Pages had forced this repo to be public, since Pages does not support private repos on the Free plan.
Cloudflare has no such restriction, so the repo has gone back to private -- reversing that compromise entirely,
not just relocating it. GitHub Pages itself is now offline (404) as a direct result. No coaching data has ever
lived in the repo itself, public or private -- only fictional demo data.

Coaching-results uploads and in-app feedback both go to this site's own Worker and database now, not a third
party. This is still new, so watch real submissions closely -- see the Support reference below before relying on
it for a real event. Bugs and feature ideas go somewhere else again: a GitHub issue (now private, since the repo
is), separate from the organiser's feedback box.

A coach scores a game, the phone saves it, and the coach uploads it. The app works without signal. An organiser
sets up a tournament with one QR code and reviews every referee in one table.

Main changes since the first release:

- A New Zealand rugby look, in Auckland Rugby Referees' navy and gold, with te reo Māori labels.
- Eight scored areas, score meanings, quick notes and feedback boxes.
- Dictation and voice notes in every comment box.
- Upload, email, share and print options.
- Organiser tools: setup QR code, referee ranking, coach marking, and a demo tournament.

## What is new for coaches

A coach can score a game in about 15 taps. Notes can be typed, spoken, or recorded.

**Scoring**

- Score eight areas from 1 to 5: fitness, foul play, breakdowns, set phase, game awareness, game management, communication, and an overall rating.
- Communication is a new area. "Good position" is a new choice under distance from contest.
- Each score shows a one-line meaning, such as "3. Meets the standard for this level." Open "How to score" to see all five.
- "Tap a score to set it. Tap it again to clear it." is shown on screen above the scores, not just in "How to score".
- Under distance from contest, "Too close" and "In the way" can both apply. "Good position" is a separate choice and clears the other two. A line under the buttons explains this, and "Good position" now sits apart from the other two.

**Notes**

- Quick notes add a ready phrase to a comment box with one tap.
- Foul play, breakdowns and game management each have new quick notes, taken from the printed coaching sheet: recognising foul play and applying the law, respecting the jackler's rights and getting the ball available quickly, and being proactive rather than reactive.
- "Strength to keep" and "One thing to work on" are for the referee.
- Private notes stay out of the summary, the email and the print. The organiser sees them after an upload.
- Dictation: tap the microphone in any comment box and speak. Say "full stop", "comma", "question mark" or "new line" for punctuation.
- Voice notes: tap the wave button. Record up to 2 minutes. Then play, record again, share or delete the clip.
- The microphone and wave buttons are lighter now, so the form reads less cluttered. They still work the same and are still easy to tap.

**Match details**

- Referee, field and time are always on screen. Coach, tournament, date, level, game and role sit under "Match details". The app remembers them.
- A "Union" dropdown sits above Tournament under "Match details", listing the 24 New Zealand provincial unions. It is optional and carries over between forms the same way tournament and level do.
- Coach sits beside Referee, Field and Time, always on screen. It is needed before the first upload.
- If the organiser has set up a referee list, the app suggests names and checks the spelling.
- Once the referee name and the rating are in, "Start next game" is ready. It copies the tournament, coach and level, and adds one to the game number. It does not need an upload first, so it works with no signal.

**Saving and sending**

- The form saves on the phone as you type. Losing signal loses nothing.
- "Upload results" sends the form. "Upload all waiting" sends every form not yet uploaded. A yellow number on the Saved tab shows how many wait.
- "Share summary", "Copy text", "Email this form" and "Print or save PDF" all work. Share summary also sends voice notes where the phone allows it.
- A coach must enter a name before the first upload.
- On the Saved tab, each form has its own delete button. Deleting no longer means opening the form first.
- "Select forms to delete" ticks off several forms at once and removes them together, with one confirmation.
- If "Upload all waiting" stops partway, the message now names the referee whose form failed, not just "the next one".
- The rating badge on each saved form now labels itself correctly for a screen reader, found in a full accessibility scan of all four tabs.
- "Feedback for the organiser" in Setup sends a note straight to the organiser, the same way results upload. Needs signal. If there is none, the note is copied so it can be sent another way. There was no way to send feedback from inside the app before.
- "Bugs and ideas" in Setup opens a prefilled GitHub issue -- a separate, public channel from the feedback box above it, for reporting problems with the app itself rather than a tournament. Needs internet and a GitHub account. "Email instead" sends the same note privately, for a coach without one.

**Look and feel**

- A navy jersey theme in Auckland Rugby Referees' colours, a welcome screen on the first visit, and a compact header after that.
- Four tabs at the top: Form, Saved, Review and Setup.
- Larger buttons and clearer text. The accessibility scan finds no problems.
- Sun mode (white and black, heavy edges) for bright fields. Dark mode follows the phone.
- Te reo Māori labels sit beside the English ones. Dates and times use New Zealand style.

## What is new for organisers

An organiser can set up a tournament with one scan and rank every referee across all games and coaches.

**Setup tab**

- Make a setup link and QR code. It holds the tournament name, tournament code, field names, levels, coaches and referees.
- Coaches scan the QR code in the app, paste the link, or open the link. Their lists fill in.
- The tournament code goes with every upload. Loading a results file skips rows with a wrong or missing code. The code is a filter, not a password.
- Open "Referees and coaches" under "This device" to check the names a setup loaded, without exporting anything.

**Review tab**

- A ranked table shows games, coaches, rating and the seven area averages. Tap a heading to sort. Tap a name to read every comment, private notes included.
- Filters: tournament, role, date range and minimum games.
- A referee with fewer games than the minimum is "provisional" and has no rank.
- "Adjust ratings for coach marking style" corrects for hard and easy markers. It adjusts only coaches with 3 or more forms.
- The coach marking table shows each coach's forms, average and difference from all coaches.
- "Needs more assessments" lists referees below the minimum, including those with no games.
- "Names" finds spellings that look alike and offers to merge them.
- The table fits a laptop screen. On a phone, each referee is a card instead, with a "Sort by" box above the list in place of tapping a heading.

**Results**

- Each upload is one row in this site's own database. Editing and re-uploading a form updates its row rather than adding another.
- Uploads and CSV/JSON exports now include which provincial union hosted the tournament, alongside tournament, level and game.
- Feedback from a coach goes into its own table in the same database. A bug report or feature idea never reaches it at all -- it opens a public GitHub issue instead.
- The organiser exports results and feedback from a Worker URL (needs the `ADMIN_KEY` -- see the Support reference), not a third-party dashboard.
- "Load results file" reads a CSV or JSON export and merges it. "Export ranking table (CSV)" saves the ranking.
- The Saved tab still has the CSV export and the backup file.

**Demo and training**

- Setup, then "Demo and training", loads 45 made-up games. Demo forms are never uploaded. "Remove the demo data" clears them and keeps real forms.

## Release history

There have been 30 releases, newest first. Dates are New Zealand time. The last column helps support tell which release a phone has.

| Date | Release | What changed | How to spot it on a phone |
| --- | --- | --- | --- |
| 29 Sept 2026 | 30. Auckland Rugby Referees colours | The jersey theme (header, tabs, primary buttons, selected states, review table headers) changed from near-black to Auckland Rugby Referees' navy (`#0E234B`), matching their site at arra.org.nz. The gold used for the yellow-card accent was already close to ARRA's gold and is unchanged. The app icon and browser theme colour were regenerated to match. No fields, scoring or layout changed. | The header, tab bar and primary buttons are navy blue instead of near-black. |
| 29 Sept 2026 | 29. Areas regrouped under Auckland Rugby Referees' three coaching priorities | The 7 scored areas are unchanged, but now sit under three group headings from Auckland Rugby Referees' "Sevens Priorities & Application" session: Decision-making accuracy (Foul play, Breakdowns / tackle, Restarts -- renamed from Set phase), Referee positioning (Positioning & fitness -- renamed from Fitness, now also holding the distance-from-contest chips, moved off Game awareness), and Game feel & awareness (Game awareness, Game management, Communication). Quick-note tags were refreshed with wording from that session (e.g. "Jackler stayed on feet to contest", "Kept to the 30-second kick clock"). `UP_FIELDS` order changed to match (`node tools/check.js --update-fields` run) -- field names themselves did not change. | Three bold section headings (Decision-making accuracy / Referee positioning / Game feel & awareness) above the score rows. Distance from contest now sits under Positioning & fitness, not Game awareness. |
| 27 Sept 2026 | 28. Provincial union field in Match details | A new "Union" dropdown sits above Tournament under "Match details", listing the 24 New Zealand provincial unions. It carries over between forms like tournament and level do. Added to `UP_FIELDS` (`node tools/check.js --update-fields` run), so it uploads and exports alongside the other match details. | A "Union" dropdown above Tournament under "Match details". |
| 27 Sept 2026 | 27. Results and feedback moved off SnapItForms, onto this site's own Cloudflare Worker and D1 database | `uploadOne()` and `submitFeedback()` now post to `/api/results` and `/api/feedback` on the same origin, not `api.snapitforms.com`. A new Worker (`worker/index.js`) writes to D1; organisers export with a Worker URL and `ADMIN_KEY` instead of the SnapItForms dashboard. `UPLOAD_KEY` in `index.html` replaces `SNAPIT_ACCESS_KEY`. Upload fields (`UP_FIELDS`) are unchanged. | No visible change to coaching or scoring. The upload status line no longer says "This is a trial upload service." |
| 27 Sept 2026 | 26. Removed the static.app deploy workflow | The GitHub Actions workflow that deployed to static.app is deleted, along with the `STATICAPP_API_KEY` secret and `STATICAPP_PID` variable. That address (easy-goingcrow.staticdomains.app) is now permanently frozen at release 21's code and will never update again. Nothing about the app changed. | No visible change. Documentation and repository housekeeping only. |
| 27 Sept 2026 | 25. Moved to Cloudflare, repo private again | Hosting moved from GitHub Pages to Cloudflare (a Worker with static assets), at a new custom domain, coach7srefs.nz. The repo went back to private, since Cloudflare does not force it public the way GitHub Pages did. GitHub Pages is now offline. No app code changed. | The address in the browser is coach7srefs.nz, not a staticdomains.app or github.io address. |
| 25 Sept 2026 | 24. An email fallback for bugs and ideas | "Bugs and ideas" in Setup now has a second button, "Email instead", beside "Open on GitHub". It sends the same note to Support@simplesolutions.co.nz, for a coach without a GitHub account. | An "Email instead" button beside "Open on GitHub" in Setup. |
| 25 Sept 2026 | 23. Bugs and ideas go to GitHub | A new "Bugs and ideas" box in Setup opens a prefilled GitHub issue. It is separate from "Feedback for the organiser" (renamed from plain "Feedback") just above it: bug reports and feature ideas are public on the app's repo, not the organiser's private SnapItForms account, so real names should stay out of them. | A "Bugs and ideas" section in Setup, below a renamed "Feedback for the organiser" box. |
| 25 Sept 2026 | 22. Moved to GitHub Pages, feedback moved to SnapItForms | The site now lives at jonobakernz.github.io/sevens-coaching-form/. The repo is now public, which GitHub Pages requires on the Free plan. Feedback now sends to SnapItForms, the same way results upload does. | The address in the browser is different. Setup and coaching are otherwise unchanged. |
| 25 Sept 2026 | 21. Coaching-results upload moved to SnapItForms (trial) | Upload results now posts to SnapItForms. It has no independent track record yet -- see Support reference. Feedback did not change in this release. | No visible change on the form itself. The upload status line now says "This is a trial upload service." |
| 23 Sept 2026 | 20. Quick notes from the printed coaching sheet | Compared the printed "7's Coaching Notes" sheet with the app and added the quick notes it was missing: two for foul play (recognising it early, applying the law), two for breakdowns (the jackler's rights, getting the ball available), and one for game management (proactive, not just reactive). | Two extra quick-note buttons on Foul play and Breakdowns, one extra on Game management. |
| 20 Sept 2026 | 19. Feedback sends straight to the organiser | Release 18's "Feedback" sent an email, but many phones have no mail app set up to actually send one. It now sends the same way results upload: straight into the organiser's account. If there is no signal, the note is copied to send another way. The organiser no longer sets up an address for this. | Tap "Send feedback": the button says "Sending...", then either sends or copies the note. It does not open a mail app. |
| 20 Sept 2026 | 18. Feedback | A "Feedback" box in Setup opened the phone's mail app, addressed to the organiser if one was set up. Replaced by release 19, since many phones have no mail app configured to actually send from. | Tap "Send feedback": the phone's mail app opens. |
| 20 Sept 2026 | 17. Accessibility fix | A full accessibility scan of all four tabs found one real issue: the rating badge on the Saved tab was not labelled correctly for a screen reader. Fixed. | No visible change. Check with a screen reader on the Saved tab. |
| 20 Sept 2026 | 16. Small fixes | A failed "Upload all waiting" names the referee whose form failed. Setup can show the referee and coach list without exporting. | "Referees and coaches" under "This device" in Setup. A named referee in a failed upload message. |
| 20 Sept 2026 | 15. Review table on phone | On a phone, the referee ranking is a list of cards instead of a sideways-scrolling table, with a "Sort by" box in place of tappable headings. The microphone and wave buttons are lighter. | A "Sort by" box above the ranking. Cards instead of a wide table. Thinner voice buttons. |
| 20 Sept 2026 | 14. Clearer scoring hints | A visible hint above the scores explains tapping a score again clears it. The distance-from-contest buttons show which two can combine and which one is separate. | "Tap a score to set it..." above the score rows. A short line and a gap before "Good position". |
| 20 Sept 2026 | 13. Delete several forms at once | "Select forms to delete" on the Saved tab ticks off several forms and removes them together. | A "Select forms to delete" button above the Saved list. |
| 20 Sept 2026 | 12. Coaching workflow fixes | Coach moved out of "Match details" onto the main screen. "Start next game" no longer waits for an upload. Each Saved form has its own delete button. | Coach sits beside Referee, Field and Time. A bin icon on each row in Saved. |
| 20 Sept 2026 | 11. Dictation | Speak into any comment box and the words are typed in. A switch in Setup turns it off. | A microphone button beside the wave button. A Voice section in Setup. |
| 19 Sept 2026 | 10. Voice notes | Record, play, share and delete voice notes in every comment box. Clips stay on the phone. | A wave button in each comment box. |
| 19 Sept 2026 | 8 and 9. Demo tournament | A demo tournament with 45 made-up games. The review table fits a laptop screen. The Saved tab count is a plain number with a yellow "waiting" badge. | "Demo and training" in Setup. |
| 19 Sept 2026 | 7. Large improvement release | Score meanings, Communication, feedback and private notes, role and level, quick notes, Setup with QR code, referee list, provisional ranks, coach marking, coverage list, tournament code, compact layout, better contrast, "Start next game", sun mode. | A Setup tab and a "Match details" fold. |
| 19 Sept 2026 | 6. Tabs at the top | The tabs moved to the top so a hosting badge no longer covered them. | Tabs at the top of the screen. |
| 19 Sept 2026 | 5. New Zealand rugby look | Black jersey theme, Barlow fonts, te reo Māori labels, New Zealand dates and times, new app icon. | A black header with a large white 7. |
| 19 Sept 2026 | 4. Email | "Email this form" opens the phone's mail app with the summary. The app remembers the addresses. | An "Email a copy to" box. |
| 19 Sept 2026 | 3. Upload | "Upload results", Tournament and Game fields, upload status on each form, "Load results file". | An "Upload results" button. |
| 19 Sept 2026 | 2. Referee review | A Review tab that ranks referees by average rating, with tournament and date filters. | A Review tab. |
| 19 Sept 2026 | 1. First release | The Excel sheet as an installable app that works offline. It has six areas plus a rating, comments, distance from contest, a saved list, CSV and backup export, share, copy and print. | A green theme. |

The release number matched the cache name in `sw.js` (`sevens-form-v11`) through release 11. The cache name has
not changed release to release since; the app still refreshes its files in the background each time it is opened
(see `sw.js`).

## Update a phone and check its release

A phone gets a new release the second time the app opens after the release goes live. Updating never deletes saved forms.

1. Open the app with signal. The phone loads the new files in the background.
2. Close the app fully.
3. Open the app again. The new release shows.
4. If the app still looks old, close it and open it once more.

The app does not show a release number yet. Use the features on the screen to tell which release a phone has.

| If the phone shows | The release is at least |
| --- | --- |
| A Review tab | 2 |
| An "Upload results" button | 3 |
| An "Email a copy to" box | 4 |
| A black header with a large white 7 | 5 |
| Tabs at the top of the screen | 6 |
| A Setup tab and a "Match details" fold | 7 |
| "Demo and training" in Setup | 8 |
| A wave button in each comment box | 10 |
| A microphone button beside the wave button | 11 |
| A bin icon on each row in Saved | 12 |
| A "Select forms to delete" button above the Saved list | 13 |
| "Tap a score to set it..." shown above the score rows | 14 |
| A "Sort by" box above the referee ranking on a phone | 15 |
| "Referees and coaches" under "This device" in Setup | 16 |
| A "Feedback" section in Setup | 18 |
| A "Bugs and ideas" section in Setup | 23 |
| A navy header instead of a near-black one | 30 |

Clearing browser data, or removing the app, deletes saved forms and voice notes. Ask the coach to save a backup file first. Backup files do not hold voice notes.

## Troubleshooting

Most problems come from signal, permissions, or the way iPhone stores data. A form is safe on the phone until the coach deletes it or clears browser data.

| Symptom | Likely cause | What to do |
| --- | --- | --- |
| "Upload did not work" or "No connection" | No signal, or the Worker did not answer. | The form is safe. Move to signal and tap Upload again. Or use "Upload all waiting" on the Saved tab. |
| "Add your name first" | The coach name is empty. | Open "Match details", type the name, and upload again. |
| A yellow number on the Saved tab | Forms are waiting to upload. | Open Saved and tap "Upload all waiting". |
| Saved forms are missing on an iPhone | Safari and the Home Screen icon keep separate storage. | Always open the app from its icon. Restore old forms from a backup file. |
| The phone shows an old release | The update needs two opens. | Close and open the app twice, with signal. |
| Forms and voice notes vanished | Browser data was cleared, or the app was removed. | Restore forms from the latest backup file. Voice notes cannot be restored. |
| "The microphone is blocked" | The coach refused the permission. | Allow the microphone for the site in the phone or browser settings. |
| No dictation button | The browser has no dictation, or dictation is off. | Check Setup, then Voice. Use the microphone on the keyboard. The wave button still works. |
| Dictation says it needs a network | Dictation uses an online speech service. | Get signal, or record a voice note. |
| Dictation gets words or names wrong | The speech service does not know names or te reo Māori. | Check the text and type the names. |
| A voice note will not share | The phone cannot share audio files from a web app. | Share the summary text instead. Note the phone model and browser for support. |
| A voice note is missing on another phone or in a backup | Clips stay on the phone that recorded them. | This is by design. Voice notes are not in backups, uploads or emails. |
| The QR scan does not work | The camera is blocked, the light is low, or the code is very dense. | Allow the camera and hold steady. Or paste the setup link. Long referee lists make dense codes, so share the link. |
| On an iPhone the camera app opens Safari | Safari has separate storage from the Home Screen app. | Scan inside the app: Setup, then "Scan a setup QR code". Or paste the link there. |
| "Load results file" skips rows | The tournament code is wrong or missing. | Check the code in Setup. The message shows how many rows were skipped. |
| A referee is missing from the ranking | Too few games, or a filter hides them. | Lower "Minimum games". Set Role to the right role. Clear the tournament and date filters. |
| The same referee shows twice | Two spellings of one name. | Under "Names", tap "Merge". |
| The page shows "404" just after a release | GitHub Pages needs a minute or two to publish. | Wait and reload. |
| The date box shows the month first | The date box follows the phone's language setting. | Set the phone's region to New Zealand. |
| Demo forms appear on a real phone | Someone loaded the demo. | Setup, then "Demo and training", then "Remove the demo data". Real forms stay. |

## Data and privacy

Forms stay on the phone until the coach uploads, shares, emails or exports them. Dictation is the one feature that sends audio away automatically. Results name real people, so keep the database's `ADMIN_KEY` private and follow your privacy rules.

| Data | Where it goes | When |
| --- | --- | --- |
| Scores and comments | The phone's browser storage. | As the coach types. |
| An uploaded form, including private notes, coach name and tournament code | This site's own D1 database, one row per form. | When the coach taps Upload. |
| Voice notes | The phone only. Not in uploads, backups or emails. | When the coach records. Deleting a form deletes its clips. |
| Dictation audio | The browser's speech service: Google on Android Chrome, Apple on iPhone. | While the coach dictates. A warning shows on first use. A switch in Setup turns it off. |
| A shared or emailed summary | The person the coach picks. Private notes are left out. | When the coach taps Share or Email. |
| Backup and CSV files | Wherever the coach saves them. They include private notes. | When the coach exports. |
| A setup link or QR code | Anyone who has it. It holds the tournament code and the referee and coach names. | When the organiser shares it. |
| Feedback text, the tournament name, the coach's name and the phone's browser details | This site's own D1 database, in its own table, separate from results. | When the coach taps "Send feedback" in Setup. |
| A bug report or feature idea, plus the phone's browser details | A public GitHub issue on the app's repo -- not the results database. Anyone can read it. | When the coach taps "Open on GitHub" in Setup. |
| The same bug report or feature idea, sent privately instead | Support@simplesolutions.co.nz. | When the coach taps "Email instead" in Setup. |
| Demo data | The phone only. It is never uploaded. | When someone loads the demo. |

## Known limits

The app has not been tested on real phones yet. Everything below is either a design limit or a check still to do.

**Not yet tested**

- Voice notes, dictation and QR scanning were tested in simulated browsers with a fake microphone, a fake camera and a made-up speech service. Real phones may differ, especially an iPhone Home Screen app.
- The Worker and D1 database have not been used for a real tournament yet. Run a practice event before relying on them for one.
- D1's limits on Cloudflare's free tier are generous for this app's scale, but have not been hit in practice yet.
- Cloudflare itself has not been used for a real tournament yet. Confirmed only that it serves the site correctly and that a real upload and a real feedback submission both reached the Worker and D1 successfully -- checked directly, not assumed.

**Design limits**

- The app shows no release number.
- Coaching-results upload and feedback moved off SnapItForms (a vendor with no independent track record) onto this site's own Worker and D1 database in release 27. That is now first-party infrastructure, not a third-party trial, but it is still new and unproven at real-tournament scale.
- The repo is private again, back to how the project started; no coaching data has ever lived in it either way.
- No licence is set for the code.
- The organiser cannot read results live in the app. Export the entries from the Worker (see the Support reference), then use "Load results file".
- Voice notes are not uploaded, not in backups and not in emails.
- Dictation needs signal and sends audio to the browser's speech service.
- The tournament code is a filter, not a password.
- The coverage list is a list, not a grid of referees by game.
- Whichever backend is used, changing the upload field names breaks anyone's saved export or in-progress CSV.
- Opening a GitHub issue needs internet and a GitHub account. A coach without one can tap "Email instead" next to it, use "Feedback for the organiser" instead, or ask the organiser to pass the note on.

**Content still to check**

- The score meanings and quick-note phrases are drafts. Agree them with the coaches.
- A fluent te reo Māori speaker should check the labels.

## Support reference

| Item | Detail |
| --- | --- |
| Live address (from release 25) | https://coach7srefs.nz. This is the one to give coaches. |
| Old address, retired (GitHub Pages) | https://jonobakernz.github.io/sevens-coaching-form/. Now returns 404 -- Pages does not work on a private repo on the Free plan, and the repo went private again in release 25. |
| Old address, retired (static.app) | https://easy-goingcrow.staticdomains.app/. The deploy workflow is gone, so this is now frozen at release 21's code forever and will never update. Its own security header also blocked uploads and feedback, so it never worked properly regardless. Point any coach still using either old address to the live one above. |
| A typo domain exists, not yet redirected | coach7refs.nz (missing the second "s") was registered to catch mistyped visits, but the redirect to the correct domain has not been set up yet. Currently just an unused, separately-registered domain. |
| The repo is private | Reversed from releases 22 to 24, when it had to be public for GitHub Pages. Cloudflare has no such restriction. No coaching data has ever lived in the repo -- only in the results database. See "Repo privacy" in the README. |
| Coaching results and feedback (from release 27) | Both go to this site's own Cloudflare D1 database, in separate tables, written through the Worker (`worker/index.js`). Export with `GET https://coach7srefs.nz/api/results?key=ADMIN_KEY` (add `&format=json` for JSON instead of CSV) and `GET .../api/feedback?key=ADMIN_KEY`. `ADMIN_KEY` is a Worker secret -- ask whoever last ran `wrangler secret put ADMIN_KEY` for it, or set a new one (this invalidates the old one, which is fine, nothing else depends on it). |
| Coaching results and feedback (releases 22 to 26) | Went to SnapItForms, told apart by the `kind` field (results have none set; feedback has `kind: feedback`). Sign in to that account to retrieve old entries -- it is no longer written to as of release 27. |
| Coaching results (25 Sept 2026, release 21) | Also went to SnapItForms, but a hosting problem fixed in release 22 may have stopped some of these reaching the dashboard. Check with coaches active that day if results are missing. |
| Coaching results (releases 3 to 20) | Stored with the site's original hosting provider (static.app). Sign in to that account to retrieve old entries. |
| SnapItForms (used releases 21 to 26, removed in release 27) | Had no independent track record as of Sept 2026 -- no Capterra/G2 listing, no Reddit or Hacker News mention, no GitHub presence. Replaced by this site's own Worker and D1 database rather than waiting to find out if it held up. Old entries are still retrievable from the SnapItForms dashboard until that account is closed. |
| Deploy (Cloudflare) | Automatic after every push to `main`, via Cloudflare's own GitHub integration (a Worker with static assets, not classic "Pages" -- the dashboard groups both under "Workers & Pages"). No workflow or secret needed in this repo for it. Usually live within a minute or two. |
| Deploy (static.app, removed in release 26) | The workflow that used to deploy there (`.github/workflows/deploy-static-app.yml`) has been deleted, along with the `STATICAPP_API_KEY` secret and `STATICAPP_PID` variable. Nothing will ever update that address again. |
| Offline cache | The cache name in `sw.js` (`CACHE`) has stayed at `sevens-form-v11` since release 11. The app still refreshes its files in the background on each open regardless -- see `sw.js`. Bump `CACHE` by hand if you ever need every phone to drop its old cache in one go. |
| Upload fields | Do not add or rename fields in `UP_FIELDS` (`index.html`) without a plan, whichever backend is in use. `node tools/check.js` catches an accidental change. |
| Licence | Still not set (see the README). Less urgent now the repo is private again, but still an open decision if it is ever shared or made public. |
| Wording | Score meanings, quick notes and the referee, coach and level lists are set in the app script and the Setup tab. The README explains where. |

**Housekeeping**

- Rotate or close the SnapItForms access key and account -- it is no longer written to, but old entries (releases 21 to 26) stay there until then. No longer blocked: release 27 is confirmed working end to end (see below).
- Delete the test entries created verifying releases 25 and 26 from the SnapItForms dashboard before closing it, if you want a record of that period.
- Decide on a licence for the code, or explicitly decide not to and note that choice somewhere -- less urgent now the repo is private, but still open.

Already done, kept here as a record: the `coach7refs.nz` typo redirect is set up (a Cloudflare Redirect Rule, not
registrar forwarding, since a DNS-only redirect cannot issue an HTTP redirect by itself -- the typo domain has a
proxied placeholder DNS record purely so Cloudflare's edge sees the traffic to redirect it); the static.app deploy
workflow and its secret and variable are removed (release 26); release 27's D1 database and both Worker secrets
(`UPLOAD_KEY`, `ADMIN_KEY`) are set up and confirmed working end to end (27 Sept 2026) -- a real upload was verified
landing in D1, then the test row was removed. Worth knowing if this ever needs redoing: a Worker's **Build
configuration > Variables and secrets** in the Cloudflare dashboard does *not* bind a runtime secret, even though it
looks like it should -- `env.UPLOAD_KEY` stayed unbound (empty) after setting a value there. `wrangler secret put
UPLOAD_KEY` / `ADMIN_KEY` from the CLI is what actually worked, and is the reliable way to set either key.

-- Auckland 7s Coaching: results and feedback storage.
-- Apply with: wrangler d1 execute auckland_7s_results --file=migrations/0001_init.sql
-- (add --remote to apply to the live database instead of the local dev one)

-- One row per form_id: a re-upload of an edited form replaces the row rather than adding another.
-- The full submission is kept as JSON in `payload` (same shape as UP_FIELDS in index.html), so this
-- schema never needs to change when SECTIONS or UP_FIELDS do -- only the export code reads keys back out.
CREATE TABLE IF NOT EXISTS results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  form_id TEXT NOT NULL UNIQUE,
  version TEXT NOT NULL DEFAULT '',
  tournament TEXT NOT NULL DEFAULT '',
  referee TEXT NOT NULL DEFAULT '',
  coach TEXT NOT NULL DEFAULT '',
  received_at TEXT NOT NULL,
  payload TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_results_tournament ON results (tournament);

CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  received_at TEXT NOT NULL,
  message TEXT NOT NULL,
  tournament TEXT NOT NULL DEFAULT '',
  coach TEXT NOT NULL DEFAULT '',
  device TEXT NOT NULL DEFAULT ''
);

/*
 * Sevens Coaching Form: Worker backend.
 * Serves the static app (index.html, sw.js, icons, fonts, lib -- everything Cloudflare's asset
 * binding sees) and two small JSON APIs backed by D1, replacing the SnapItForms trial:
 *   POST /api/results   -- a coach's upload. Upserts one row per form_id (see migrations/0001_init.sql).
 *   GET  /api/results   -- organiser export (CSV by default, ?format=json), needs ADMIN_KEY.
 *   POST /api/feedback  -- in-app feedback from Setup.
 *   GET  /api/feedback  -- organiser export (JSON), needs ADMIN_KEY.
 * UPLOAD_KEY (checked on the two POST routes) is the same kind of key SNAPIT_ACCESS_KEY used to be:
 * visible in index.html by necessity, not a real secret, just enough to stop drive-by junk. ADMIN_KEY
 * is a real secret -- only ever set with `wrangler secret put ADMIN_KEY`, never written to a file.
 */

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

function csvCell(v) {
  v = String(v ?? '');
  return /[",\r\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
}

function toCSV(rows) {
  const cols = [];
  for (const r of rows) for (const k of Object.keys(r)) if (!cols.includes(k)) cols.push(k);
  const lines = [cols.map(csvCell).join(','), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(','))];
  return '﻿' + lines.join('\r\n');
}

function hasUploadKey(request, env) {
  return !!env.UPLOAD_KEY && request.headers.get('X-Upload-Key') === env.UPLOAD_KEY;
}

// TEMP DEBUG (remove once the production 401 is diagnosed): reveals only lengths, never values.
function keyDebug(request, env) {
  return { bound_key_length: (env.UPLOAD_KEY || '').length, header_length: (request.headers.get('X-Upload-Key') || '').length };
}

function hasAdminKey(request, env, url) {
  const key = url.searchParams.get('key') || request.headers.get('X-Admin-Key') || '';
  return !!env.ADMIN_KEY && key === env.ADMIN_KEY;
}

async function readJSON(request) {
  try { return await request.json(); } catch { return null; }
}

async function saveResult(request, env) {
  if (!hasUploadKey(request, env)) return json({ success: false, error: 'bad_key', debug: keyDebug(request, env) }, 401);
  const p = await readJSON(request);
  const formId = String(p?.form_id || '').trim();
  const referee = String(p?.referee || '').trim();
  if (!p || !formId || !referee) return json({ success: false, error: 'missing_fields' }, 400);
  await env.DB.prepare(
    `INSERT INTO results (form_id, version, tournament, referee, coach, received_at, payload)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
     ON CONFLICT(form_id) DO UPDATE SET
       version = excluded.version, tournament = excluded.tournament, referee = excluded.referee,
       coach = excluded.coach, received_at = excluded.received_at, payload = excluded.payload`
  ).bind(formId, String(p.version || ''), String(p.tournament || ''), referee, String(p.coach || ''),
    new Date().toISOString(), JSON.stringify(p)).run();
  return json({ success: true });
}

async function exportResults(request, env, url) {
  if (!hasAdminKey(request, env, url)) return json({ success: false, error: 'unauthorised' }, 401);
  const { results } = await env.DB.prepare('SELECT payload FROM results ORDER BY id').all();
  const rows = results.map((r) => JSON.parse(r.payload));
  if (url.searchParams.get('format') === 'json') return json(rows);
  return new Response(toCSV(rows), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="sevens-results.csv"' }
  });
}

async function saveFeedback(request, env) {
  if (!hasUploadKey(request, env)) return json({ success: false, error: 'bad_key', debug: keyDebug(request, env) }, 401);
  const b = await readJSON(request);
  const message = String(b?.message || '').trim();
  if (!message) return json({ success: false, error: 'missing_message' }, 400);
  await env.DB.prepare(
    'INSERT INTO feedback (received_at, message, tournament, coach, device) VALUES (?1, ?2, ?3, ?4, ?5)'
  ).bind(new Date().toISOString(), message, String(b?.tournament || ''), String(b?.coach || ''), String(b?.device || '')).run();
  return json({ success: true });
}

async function exportFeedback(request, env, url) {
  if (!hasAdminKey(request, env, url)) return json({ success: false, error: 'unauthorised' }, 401);
  const { results } = await env.DB.prepare(
    'SELECT received_at, message, tournament, coach, device FROM feedback ORDER BY id DESC'
  ).all();
  return json(results);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/results') {
      if (request.method === 'POST') return saveResult(request, env);
      if (request.method === 'GET') return exportResults(request, env, url);
    }
    if (url.pathname === '/api/feedback') {
      if (request.method === 'POST') return saveFeedback(request, env);
      if (request.method === 'GET') return exportFeedback(request, env, url);
    }
    return env.ASSETS.fetch(request);
  }
};

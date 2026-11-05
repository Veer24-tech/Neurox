import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import helmet from 'helmet';

const app = express();
const port = Number(process.env.PORT || 4173);
const ttlMs = 60_000;
const handoffs = new Map();
const allowedFeelings = new Set(['overwhelmed', 'anxious', 'exhausted', 'lonely', 'steady', 'unsure']);
const allowedIntensity = new Set(['a-little', 'a-fair-bit', 'a-lot']);
const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(here, '../dist');

app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  next();
});
app.use(express.json({ limit: '2kb', strict: true }));

function pruneExpired() {
  const now = Date.now();
  for (const [token, handoff] of handoffs) if (handoff.expiresAt <= now) handoffs.delete(token);
}
const pruneTimer = setInterval(pruneExpired, 15_000);
pruneTimer.unref();

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.post('/api/handoffs', (req, res) => {
  pruneExpired();
  const { feeling, intensity } = req.body || {};
  if (!allowedFeelings.has(feeling) || !allowedIntensity.has(intensity)) return res.status(400).json({ error: 'Choose a valid check-in result before creating a handoff.' });
  if (handoffs.size >= 1000) return res.status(429).json({ error: 'Handoffs are busy right now. Please try again shortly.' });
  const token = crypto.randomBytes(24).toString('base64url');
  const expiresAt = Date.now() + ttlMs;
  handoffs.set(token, { feeling, intensity, expiresAt });
  return res.status(201).json({ token, expiresAt });
});
app.get('/api/handoffs/:token', (req, res) => {
  pruneExpired();
  const handoff = handoffs.get(req.params.token);
  if (!handoff || handoff.expiresAt <= Date.now()) {
    handoffs.delete(req.params.token);
    return res.status(404).json({ error: 'This QR code has expired or has already been used.' });
  }
  handoffs.delete(req.params.token);
  return res.json({ feeling: handoff.feeling, intensity: handoff.intensity });
});
app.delete('/api/handoffs/:token', (req, res) => {
  handoffs.delete(req.params.token);
  return res.status(204).end();
});
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));
app.use((error, _req, res, next) => {
  if (res.headersSent) return next(error);
  return res.status(400).json({ error: 'Invalid request.' });
});

if (fs.existsSync(dist)) {
  app.use(express.static(dist, { index: false, etag: false, lastModified: false }));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
} else {
  app.get('/', (_req, res) => res.status(503).send('Build the frontend with npm run build before starting the production server.'));
}

app.listen(port, '0.0.0.0', () => console.log(`Wellbeing kiosk listening on port ${port}`));

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Helper to read DB
const readDB = () => {
  if (!fs.existsSync(DB_PATH)) {
    const initialData = {
      settings: {},
      limits: [],
      sessions: [],
      usage: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
};

// Helper to write DB
const writeDB = (data: any) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Routes
app.get('/api/settings', (req, res) => {
  const db = readDB();
  res.json(db.settings);
});

app.post('/api/settings', (req, res) => {
  const db = readDB();
  db.settings = { ...db.settings, ...req.body };
  writeDB(db);
  res.json(db.settings);
});

app.get('/api/limits', (req, res) => {
  const db = readDB();
  res.json(db.limits);
});

app.post('/api/limits', (req, res) => {
  const db = readDB();
  const newLimit = { ...req.body, id: crypto.randomUUID() };
  db.limits.push(newLimit);
  writeDB(db);
  res.json(newLimit);
});

app.put('/api/limits/:id', (req, res) => {
  const db = readDB();
  const index = db.limits.findIndex((l: any) => l.id === req.params.id);
  if (index !== -1) {
    db.limits[index] = { ...db.limits[index], ...req.body };
    writeDB(db);
    res.json(db.limits[index]);
  } else {
    res.status(404).json({ error: 'Limit not found' });
  }
});

app.delete('/api/limits/:id', (req, res) => {
  const db = readDB();
  db.limits = db.limits.filter((l: any) => l.id !== req.params.id);
  writeDB(db);
  res.status(204).send();
});

app.get('/api/sessions', (req, res) => {
  const db = readDB();
  res.json(db.sessions);
});

app.post('/api/sessions', (req, res) => {
  const db = readDB();
  const newSession = { ...req.body, id: crypto.randomUUID(), timestamp: new Date().toISOString() };
  db.sessions.push(newSession);
  writeDB(db);
  res.json(newSession);
});

app.post('/api/usage', (req, res) => {
  const db = readDB();
  const newUsage = { ...req.body, timestamp: new Date().toISOString() };
  db.usage.push(newUsage);
  writeDB(db);
  res.json(newUsage);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

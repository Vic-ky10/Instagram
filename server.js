import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read db.json
const getDbData = () => {
  const dbPath = path.join(__dirname, 'db', 'db.json');
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};

// API Routes
app.get('/api/posts', (req, res) => {
  try {
    const dbData = getDbData();
    res.json(dbData.posts || []);
  } catch (error) {
    console.error('Error reading posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/api/stories', (req, res) => {
  try {
    const dbData = getDbData();
    const { id } = req.query;
    
    if (id) {
      const story = dbData.stories?.find(s => s.id === id);
      if (story) {
        return res.json(story);
      }
      return res.status(404).json({ error: 'Story not found' });
    }
    
    res.json(dbData.stories || []);
  } catch (error) {
    console.error('Error reading stories:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

app.get('/api/profile', (req, res) => {
  try {
    const dbData = getDbData();
    res.json(dbData.Profile || {});
  } catch (error) {
    console.error('Error reading profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.put('/api/profile', (req, res) => {
  try {
    const dbData = getDbData();
    dbData.Profile = { ...dbData.Profile, ...req.body };
    res.json({ message: 'Profile updated successfully', profile: dbData.Profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.get('/api/suggestion', (req, res) => {
  try {
    const dbData = getDbData();
    res.json(dbData.Suggestion || []);
  } catch (error) {
    console.error('Error reading suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Local API server running at http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api/*`);
});


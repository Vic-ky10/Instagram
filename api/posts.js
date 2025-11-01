import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Resolve path relative to project root
    const dbPath = path.join(process.cwd(), 'db', 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    res.status(200).json(dbData.posts || []);
  } catch (error) {
    console.error('Error reading posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}


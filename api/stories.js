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
    
    // Check if requesting a specific story by ID
    const { id } = req.query;
    
    if (id) {
      const story = dbData.stories?.find(s => s.id === id);
      if (story) {
        return res.status(200).json(story);
      }
      return res.status(404).json({ error: 'Story not found' });
    }
    
    res.status(200).json(dbData.stories || []);
  } catch (error) {
    console.error('Error reading stories:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
}


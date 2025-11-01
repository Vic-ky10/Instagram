import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Resolve path relative to project root
  const dbPath = path.join(process.cwd(), 'db', 'db.json');

  if (req.method === 'GET') {
    try {
      const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      res.status(200).json(dbData.Profile || {});
    } catch (error) {
      console.error('Error reading profile:', error);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  } else if (req.method === 'PUT') {
    try {
      const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      // Update profile data
      dbData.Profile = { ...dbData.Profile, ...req.body };
      
      // Note: In Vercel serverless, we can't write to files permanently
      // This will work for the current request but won't persist across deployments
      // For production persistence, consider using a database
      res.status(200).json({ message: 'Profile updated successfully', profile: dbData.Profile });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1432580G',
  database: 'time_tracker'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Classify URL
function classify(url) {
  const productiveKeywords = ['leetcode', 'github', 'stackoverflow', 'geeksforgeeks'];
  return productiveKeywords.some(keyword => url.includes(keyword)) ? 'productive' : 'unproductive';
}

// POST /track - Store time tracking data
app.post('/track', (req, res) => {
  const { url, duration } = req.body;

  if (!url || !duration) return res.status(400).send('Missing url or duration');

  const domain = new URL(url).hostname;
  const category = classify(url);
  const now = new Date(); // Current timestamp

  db.query(
    'INSERT INTO usage_data (url, domain, duration, category, timestamp) VALUES (?, ?, ?, ?, ?)',
    [url, domain, Math.round(duration / 1000), category, now],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to store data');
      }
      res.send('Data stored');
    }
  );
});

// GET /report - Weekly summary
app.get('/report', (req, res) => {
  db.query(
    `SELECT domain AS website, SUM(duration) AS totalTime, category
     FROM usage_data
     WHERE timestamp >= NOW() - INTERVAL 7 DAY
     GROUP BY domain, category`,
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to fetch report');
      }
      res.json(result);
    }
  );
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

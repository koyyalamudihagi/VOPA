// proxy-server.js

import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const API_URL = 'https://tenders.guru/api/es/tenders';

// Get tender list
app.get('/api/tenders', async (req, res) => {
  try {
    console.log('➡️ Request received for /api/tenders');

   // No need to import fetch, just use it
   
   const response = await fetch(API_URL);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch tenders from external API' });
    }

    const data = await response.json();

    // Log the data shape
    console.log('Fetched tenders data:', JSON.stringify(data, null, 2));

    // If API returns { data: [...] }, send only data array; else send full response
    res.json(data.data || data);
  } catch (err) {
    console.error('🔥 Error from tenders.guru API:', err.message);
    res.status(500).json({ error: 'Failed to fetch tenders' });
  }
});

// Get tender details by id
app.get('/api/tenders/:id', async (req, res) => {
  try {
    const tenderId = req.params.id;
    console.log(`➡️ Request received for /api/tenders/${tenderId}`);

    const response = await fetch(`${API_URL}/${tenderId}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch tender details from external API' });
    }

    const data = await response.json();
    res.json(data); // assuming tender detail is returned directly
  } catch (err) {
    console.error('🔥 Error fetching tender details:', err.message);
    res.status(500).json({ error: 'Failed to fetch tender details' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});

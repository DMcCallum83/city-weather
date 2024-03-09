import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { query } = req.query;
    const searchUrl = process.env.BASE_SEARCH_URL;
    const apiKey = process.env.API_KEY;
    const fetchUrl = `${searchUrl}key=${apiKey}&query=${encodeURIComponent(query)}`
  
    try {
      // Make an API request using fetch or any other library
      const apiResponse = await fetch(fetchUrl);
      const data = await apiResponse.json();
  
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
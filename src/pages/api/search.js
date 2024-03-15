import fetch from 'node-fetch';
import { SearchResultSchema } from '../../schemas/searchSchema';
import { z } from 'zod';

export default async function handler(req, res) {
  const { query } = req.query;
  const searchUrl = process.env.BASE_SEARCH_URL;
  const apiKey = process.env.API_KEY;
  const fetchUrl = `${searchUrl}key=${apiKey}&query=${encodeURIComponent(query)}`;

  try {
    const apiResponse = await fetch(fetchUrl);
    const json = await apiResponse.json();
    const results = z.array(SearchResultSchema).parse(json);

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

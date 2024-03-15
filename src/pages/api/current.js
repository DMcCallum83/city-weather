import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { query } = req.query;
  const currentUrl = process.env.BASE_CITY_URL;
  const apiKey = process.env.API_KEY;
  const fetchUrl = `${currentUrl}key=${apiKey}&query=id:${encodeURIComponent(query)}`;

  try {
    const apiResponse = await fetch(fetchUrl);
    const data = await apiResponse.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

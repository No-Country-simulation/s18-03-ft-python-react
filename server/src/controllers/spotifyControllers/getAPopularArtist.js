import axios from 'axios';
import { getAppToken } from '../authControllers/getAppToken.js';

const baseUrl = process.env.SPOTIFY_BASE_URL

export const getPopularArtist = async (req, res) => {
    const limit = 40;
    try {
      // Ensure we have a valid app token
      const accessToken = await getAppToken();
  
      // Now that we have a valid app token, make the request to Spotify
      const response = await axios.get(`${baseUrl}search?q=artist&type=artist&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      // Respond with the artist data
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching popular artist:', error);
      res.status(500).json({ error: 'Failed to fetch popular artist' });
    }
  };

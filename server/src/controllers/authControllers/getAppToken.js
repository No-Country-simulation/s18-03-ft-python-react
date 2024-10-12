import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const getAppToken = async (req, res) => {
  try {
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const data = new URLSearchParams({ grant_type: 'client_credentials' });

    const response = await axios.post(tokenUrl, data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authString}`,
      },
    });

    const { access_token, expires_in } = response.data;

    // Send token back to the client (use with caution)
    res.status(200).json({
      access_token,
      expires_in,
    });
  } catch (error) {
    console.error(
      'Error getting app token:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Failed to get app token' });
  }
};


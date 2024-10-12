import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let appTokenCache = {
  accessToken: null,
  expiresAt: null, // Timestamp when token expires
};

export const getAppToken = async () => {
  try {
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    // Check if app token is still valid
    if (appTokenCache.accessToken && appTokenCache.expiresAt > Date.now()) {
      return appTokenCache.accessToken
    }

    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const data = new URLSearchParams({ grant_type: 'client_credentials' });

    const response = await axios.post(tokenUrl, data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authString}`,
      },
    });

    const { access_token, expires_in } = response.data;

    // Store app token in memory
    appTokenCache.accessToken = access_token;
    appTokenCache.expiresAt = Date.now() + expires_in * 1000;

    return access_token; // Return the new token
  } catch (error) {
    console.error('Error getting app token:', error.response ? error.response.data : error.message);
    throw new Error('Failed to get app token');
  }
};



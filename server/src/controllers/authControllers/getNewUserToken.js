import axios from 'axios';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const getNewUsertoken = async (req, res) => {
  const { refresh_token } = req.session;

  if (!refresh_token) {
    return res.status(400).send({ error: 'Refresh token is missing from session.' });
  }

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
    },
    data: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }).toString(),
  };

  try {
    const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });

    if (response.status === 200) {
      const { access_token, refresh_token: new_refresh_token } = response.data;

      // Update session with new tokens
      req.session.access_token = access_token;
      req.session.refresh_token = new_refresh_token || refresh_token;

      return res.send({
        access_token: access_token,
        refresh_token: new_refresh_token || refresh_token,
      });
    } else {
      res.status(response.status).send({ error: 'Failed to refresh access token' });
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

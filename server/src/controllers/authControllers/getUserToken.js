import dotenv from "dotenv";
import axios from "axios";
import querystring from 'querystring'

dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI; 
const redirectToCheckInfoPage = process.env.SPOTIFY_REDIRECT_URI_WITH_TOKEN

export const getUserToken = async (req, res) => {
  console.log('getUserToken fn');
  const code = req.query.code || null;
  const state = req.query.state || null;
  const stateKey = 'spotify_auth_state';
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" + querystring.stringify({ error: "state_mismatch" })
    );
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: new URLSearchParams({
        code: code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
    };

    try {
      const response = await axios(authOptions);
      const { access_token, refresh_token, expires_in } = response.data;
      console.log('Access Token:', access_token);

      // Store tokens in session
      req.session.access_token = access_token;
      req.session.refresh_token = refresh_token;
      req.session.expires_in = expires_in;
      req.session.token_timestamp = Date.now();

      console.log('Session before saving:', req.session); // Log the session object

      // Manually save the session after modifying it
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).send("Error saving session");
        }
        console.log('Session saved successfully');
        res.redirect(redirectToCheckInfoPage);
      });
    } catch (error) {
      console.log('Error exchanging code for tokens:', error);
      res.status(500).send("Error exchanging code for tokens");
    }
  }
};
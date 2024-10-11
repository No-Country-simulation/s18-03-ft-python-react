import dotenv from "dotenv";
import axios from "axios";
import querystring from 'querystring'

dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI; 
const spotifyUriWithToken = process.env.SPOTIFY_REDIRECT_URI_WITH_TOKEN

export const getUserToken = async (req, res) => {
  console.log('getUserTooken fn')
    const code = req.query.code || null;
    const state = req.query.state || null;
    console.log(state)
    const stateKey = 'spotify_auth_state'
    const storedState = req.cookies ? req.cookies[stateKey] : null
    console.log('stored state',storedState)

    if (state === null || state !== storedState) {
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "state_mismatch",
          })
      );
    } else {
      res.clearCookie(stateKey)
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
                "Basic " +
                Buffer.from(clientId + ":" + clientSecret).toString("base64"),
            },
          };

      try {
        const response = await axios(authOptions)
        const { access_token, refresh_token, expires_in } = response.data;
        console.log('accesToken', access_token)

        req.session.user = {
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresAt: Date.now() + expires_in * 1000,
        }

        res.redirect(spotifyUriWithToken)
      } catch (error) {
        console.log('Error exchanging code for tokens:', error)
      }
    }
};
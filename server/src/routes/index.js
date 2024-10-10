import express from 'express'
// import supabase from '../db'

import { getAppToken } from '../controllers/authControllers/getAppToken.js'
import { getUserToken } from '../controllers/authControllers/getUserToken.js'

const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI; 
const scopes = 'user-read-private user-read-email'; // Adjust scopes as needed

const routes = express.Router()

routes.get('/login', (req, res) => {
    const state = crypto.randomBytes(16).toString('hex'); // Generate a random state
    const authorizeUrl = 'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scopes,
        redirect_uri: redirectUri,
        state: state,
      });
  
    // Optionally, save the state in the session or cookies for verification later
    res.cookie('spotify_auth_state', state, { httpOnly: true });
  
    res.redirect(authorizeUrl);
  });

routes.get('/app-token', getAppToken)

export default routes

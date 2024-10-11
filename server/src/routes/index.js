import express from 'express'
// import supabase from '../db'
import crypto from 'crypto';
import querystring from 'querystring';

import { getAppToken } from '../controllers/authControllers/getAppToken.js'
import { getUserToken } from '../controllers/authControllers/getUserToken.js'
import { getUserInfo } from '../controllers/userControllers/getUserInfo.js';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI; 
const scopes = 'user-read-private user-read-email'; // Adjust scopes as needed
const stateKey = 'spotify_auth_state'

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
    res.cookie(stateKey, state)
    console.log(stateKey, state)
    res.redirect(authorizeUrl);
  });

routes.get('/callback', getUserToken)

routes.get('/userInfo', getUserInfo)

routes.get('/app-token', getAppToken)

export default routes

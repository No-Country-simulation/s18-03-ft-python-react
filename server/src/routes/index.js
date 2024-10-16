import express from 'express'
// import supabase from '../db'
import crypto from 'crypto';
import querystring from 'querystring';

import { getUserToken } from '../controllers/authControllers/getUserToken.js'
import { getPopularArtist } from '../controllers/spotifyControllers/getAPopularArtist.js';
import { getPopularArtistSong } from '../controllers/spotifyControllers/getPopularArtistSong.js';
import { getGenreOfTheDay } from '../controllers/spotifyControllers/getGenreOfTheDay.js';
import { topGlobalSongs } from '../controllers/spotifyControllers/getTopGlobalSongs.js';
import { getSongOfTheDay } from '../controllers/spotifyControllers/getSongOfTheDay.js';

import { getUserInfo } from '../controllers/userControllers/getUserInfo.js';
import { getNewUsertoken } from '../controllers/authControllers/getNewUserToken.js';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI; 
const scopes = 'user-read-private user-read-email user-top-read user-read-playback-state'; // Adjust scopes as needed
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

// spotify req
routes.get('/any-popular-artist', getPopularArtist)
routes.post('/popular-artist/songs', getPopularArtistSong)

//genre of the day related
routes.get('/genre-of-the-day', getGenreOfTheDay)

//global top songs
routes.get('/top-global-songs', topGlobalSongs)

//song of the day
routes.get('/song-of-the-day', getSongOfTheDay)

// users profile info
routes.get('/get-profile', getUserInfo)
routes.get('/get-user-refresh-token', getNewUsertoken)

export default routes

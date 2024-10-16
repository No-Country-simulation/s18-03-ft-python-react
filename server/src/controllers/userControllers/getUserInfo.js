import axios from 'axios'


export const getUserInfo = async (req, res) => {
    const { access_token, refresh_token, expires_in, token_timestamp } = req.session;

    const fullResponse = {}
  
    // Log session data for debugging
    console.log('Session data:', req.session);
  
    if (!access_token) {
      return res.status(401).json({ message: 'No access token found in session' });
    }
  
    try {
      const response = await axios.get('https://api.spotify.com/v1/me',{
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      fullResponse.userData = response.data
  
      const userSongs = await getTopUserSongsOrTracks(access_token, 'tracks')
      fullResponse.userTopSongs = userSongs

      const userTopArtist = await getTopUserSongsOrTracks(access_token, 'artists')
      fullResponse.userTopArtist = userTopArtist

      res.status(200).json(fullResponse)
      
    } catch (error) {
      console.log(error)
      res.status(500).json({error: "error when getting users info", errorDetails: error})
    }
};

const getTopUserSongsOrTracks = async (access_token, lastParam)=> {

  try {

    const response = await axios.get(`https://api.spotify.com/v1/me/top/${lastParam}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    return response.data

    
  } catch (error) {
    console.error('Error fetching top songs:', error);
    return {
      error: 'error when getting user top items',
      errorDetails: error
    }
  }

}


import axios from 'axios'


export const getUserInfo = async (req, res) => {
    const { access_token, refresh_token, expires_in, token_timestamp } = req.session;
  
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
  
      res.status(200).json(response.data)
      
    } catch (error) {
      console.log(error)
      res.status(500).json({error: "error when getting users info", errorDetails: error})
    }
};


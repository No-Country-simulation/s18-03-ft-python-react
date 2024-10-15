
export const getUserInfo = async (req, res) => {
    const { access_token, refresh_token, expires_in, token_timestamp } = req.session;
  
    // Log session data for debugging
    console.log('Session data:', req.session);
  
    if (!access_token) {
      return res.status(401).json({ message: 'No access token found in session' });
    }
  
    res.status(200).json({
      access_token,
      refresh_token,
      expires_in,
      token_timestamp,
    });
  };
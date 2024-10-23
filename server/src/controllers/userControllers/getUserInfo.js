import axios from "axios";
import { registerUserDb, verifyUserExist } from "./registerUserOrExisting.js";




export const getUserInfo = async (req, res) => {
  const { access_token, refresh_token, expires_in, token_timestamp } =
    req.session;

  // Log session data for debugging
  console.log("Session data:", req.session);

  if (!access_token) {
    return res
      .status(401)
      .json({ message: "No access token found in session" });
  }

  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userInfo = {
      country: response?.data.country,
      display_name: response?.data.display_name,
      email: response?.data.email,
      spotify_id: response?.data.id,
      followers: response?.data.followers.total,
      uri: response?.data.uri,
      profile_photo: response?.data.images?.[0]?.url || null,
      refresh_token: refresh_token,
    };

    const userExist = await verifyUserExist(userInfo.spotify_id);

    if (userExist.success === true) {
      res.status(200).json(userExist)
    } else {
      const userTopSongs = await getTopUserSongsOrTracks(
        access_token,
        "tracks"
      );

      const userTopArtist = await getTopUserSongsOrTracks(
        access_token,
        "artists"
      );

      const newUser = await registerUserDb( userInfo, userTopSongs, userTopArtist );

      if(newUser.success === true){
        console.log(newUser)
        res.status(200).json(newUser)
      } else {
        console.log(newUser.error)
        res.status(400).json(newUser.error)
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "error when getting users info", errorDetails: error });
  }
};

const getTopUserSongsOrTracks = async (access_token, type, limit = 10) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/me/top/${type}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        limit, // Add the limit parameter to the request
      },
    });

    const items = response.data.items;

    if (items && items.length > 0) {
      if (type === 'tracks') {
        return items.map((topItem) => ({
          song_name: topItem.name,
          song_id: topItem.id,
          song_uri: topItem.uri,
          song_image: topItem.album?.images[0]?.url,
          artist_id: topItem.artists[0]?.id,
          artist_name: topItem.artists[0]?.name,
        }));
      } else if (type === 'artists') {
        return items.map((topItem) => ({
          artist_name: topItem.name,
          artist_id: topItem.id,
          artist_uri: topItem.uri,
          artist_photo: topItem.images[0]?.url,
        }));
      }
    }
    return []; 
  } catch (error) {
    console.error('Error fetching top songs or artists:', error.message);
    return []; 
  }
};

import axios from 'axios';
import { getAppToken } from '../authControllers/getAppToken.js';

const baseUrl = process.env.SPOTIFY_BASE_URL;

export const getSongOfTheDay = async (req, res) => {
  try {
    const appToken = await getAppToken();

    const playlistResponse = await axios.get(`${baseUrl}search?query=top+global&type=playlist&offset=0&limit=1`, {
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
    });

    const playlistId = playlistResponse.data.playlists.items[0]?.id;

    if (!playlistId) {
      return res.status(404).json({ error: 'Top Global playlist not found' });
    }

    const tracksResponse = await axios.get(`${baseUrl}playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
    });

    const tracks = tracksResponse.data.items;
    if (tracks.length === 0) {
      return res.status(404).json({ error: 'No songs found in the playlist' });
    }

    const randomIndex = Math.floor(Math.random() * tracks.length);
    const randomSong = tracks[randomIndex].track;

    const selectedSong = {
      songName: randomSong.name,
      artists: randomSong.artists.map(artist => artist.name),
      albumName: randomSong.album.name,
      albumImageUrl: randomSong.album.images[0]?.url,
      spotifyUrl: randomSong.external_urls.spotify,
    };

    return res.status(200).json({ songOfTheDay: selectedSong });

  } catch (error) {
    return res.status(500).json({
      error: 'Error fetching song of the day',
      errorDetails: error,
    });
  }
};

import axios from 'axios';
import { getAppToken } from '../authControllers/getAppToken.js';

const baseUrl = process.env.SPOTIFY_BASE_URL;

export const topGlobalSongs = async (req, res) => {
  try {
    const appToken = await getAppToken();

    const searchResponse = await axios.get(`${baseUrl}search?query=top+global&type=playlist&locale=es-ES%2Ces%3Bq%3D0.9&offset=0&limit=1`, {
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
    });

    const playlistId = searchResponse.data.playlists.items[0]?.id;

    if (!playlistId) {
      return res.status(404).json({ error: 'Top Global playlist not found' });
    }

    const playlistResponse = await axios.get(`${baseUrl}playlists/${playlistId}/tracks?limit=10`, {
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
    });

    const filteredTracks = playlistResponse.data.items.map((item) => {
      const track = item.track;

      return {
        songName: track.name,
        artists: track.artists.map(artist => artist.name),
        albumName: track.album.name,
        albumImageUrl: track.album.images[0]?.url, 
        releaseDate: track.album.release_date,
        durationMs: track.duration_ms,
        spotifyUrl: track.external_urls.spotify,  
      };
    });

    return res.status(200).json({
      playlistName: searchResponse.data.playlists.items[0].name,
      description: searchResponse.data.playlists.items[0].description,
      tracks: filteredTracks, 
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Error fetching top global songs',
      errorDetails: error.message,
    });
  }
};

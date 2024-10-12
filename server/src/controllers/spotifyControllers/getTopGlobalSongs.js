import axios from 'axios';
import { getAppToken } from '../authControllers/getAppToken.js';

const baseUrl = process.env.SPOTIFY_BASE_URL;

export const topGlobalSongs = async (req, res) => {
  try {
    // Get app token
    const appToken = await getAppToken();

    // Step 1: Search for the "Top Global" playlist
    const searchResponse = await axios.get(`${baseUrl}search?query=top+global&type=playlist&locale=es-ES%2Ces%3Bq%3D0.9&offset=0&limit=1`, {
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
    });

    // Get playlist ID from search response
    const playlistId = searchResponse.data.playlists.items[0]?.id;

    if (!playlistId) {
      return res.status(404).json({ error: 'Top Global playlist not found' });
    }

    // Step 2: Fetch only 10 tracks from the playlist using limit parameter
    const playlistResponse = await axios.get(`${baseUrl}playlists/${playlistId}/tracks?limit=10`, {
      headers: {
        Authorization: `Bearer ${appToken}`,
      },
    });

    // Step 3: Filter the tracks data to send only relevant information
    const filteredTracks = playlistResponse.data.items.map((item) => {
      const track = item.track;

      return {
        songName: track.name,
        artists: track.artists.map(artist => artist.name),
        albumName: track.album.name,
        albumImageUrl: track.album.images[0]?.url,  // Get the first available image
        releaseDate: track.album.release_date,
        durationMs: track.duration_ms,
        spotifyUrl: track.external_urls.spotify,  // Link to the track on Spotify
      };
    });

    // Return the filtered data as a response
    return res.status(200).json({
      playlistName: searchResponse.data.playlists.items[0].name,
      description: searchResponse.data.playlists.items[0].description,
      tracks: filteredTracks, // Only 10 tracks
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Error fetching top global songs',
      errorDetails: error.message,
    });
  }
};

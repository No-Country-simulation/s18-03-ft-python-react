import { getAppToken } from "../authControllers/getAppToken.js";
import axios from 'axios'

const baseUrl = process.env.SPOTIFY_BASE_URL

const startTime = Date.now(); // This is the current timestamp in milliseconds

// Define 24 hours in milliseconds
const twentyFourHours = 24 * 60 * 60 * 1000;

export const getGenreOfTheDay = async (req,res)=> {

    const currentTime = Date.now() // getting the current time
    const timeDifference = currentTime - startTime
    const fullResponse = {
        genreName: '',
        songInfo: {},
        playlistInfo: {}
    }
    
    try {
        const appToken = await getAppToken()
        const response = await  axios(`${baseUrl}recommendations/available-genre-seeds`, {
            headers: {
                Authorization: `Bearer ${appToken}`
            }
        })

            const genresLength = response.data.genres.length
            const randomGenre = Math.floor(Math.random()* genresLength)

            const genre = response.data.genres[randomGenre]

            fullResponse.genreName = genre
            fullResponse.songInfo = await genreSong(appToken, genre)

        res.status(200).json(fullResponse)
    } catch (error) {
        res.status(500).json({error: "error when gettinng genre of the day", errorDetails: error})
    }
}

const genreSong = async(appToken, genre)=> {
    const limit = 5
    try {

        const response = await axios.get(`${baseUrl}search?q=${genre}&type=track&limit=${limit}`, {
            headers: {
                 Authorization: `Bearer ${appToken}`
            }
        })

        const songs = response.data.tracks.items.map(song => ({
            id: song.id,
            albumImageUrl: song.album.images[0]?.url,
            albumName: song.album.name,
            songName: song.name,
            artists: song.artists.map(artist => artist.name).join(" / ")
        }));

        return songs;
        
    } catch (error) {
        return {error: 'error when getting genreSong', errorDetails: error}
    }

}

const getGenrePlaylist = (appToken, genre)=> {
    try {
        
    } catch (error) {
        return {error: 'error when getting genre playlist', errorDetails: error}
    }
}
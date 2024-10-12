import { getAppToken } from "../authControllers/getAppToken.js";
import genresJsonInfo from '../../genres.json' assert {type: 'json'}

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
        genreInfo: {}
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
            console.log('random genre', randomGenre)

            const genre = response.data.genres[randomGenre]

            const info = binarySearch(genresJsonInfo, randomGenre)
            console.log(info)

            fullResponse.genreName = genre
            fullResponse.genreInfo = info
            fullResponse.songInfo = await genreSong(appToken, genre)

        res.status(200).json({response: fullResponse, allGenres: response.data.genres})
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

function binarySearch(arr,target){
    let low = 0
    let high = arr.length -1

    while(low <= high){
        let mid = Math.floor((low + high)/2)

        if(arr[mid].id === target){
            return arr[mid]
        } else  if (arr[mid].id < target){
            low = mid + 1
        } else {
            high = mid -1
        }
    }

    return {
        "id": -500,
        "name": "Unfound",
        "genreInfo": "if you see unfound, please contact with the developer team"
      }
}
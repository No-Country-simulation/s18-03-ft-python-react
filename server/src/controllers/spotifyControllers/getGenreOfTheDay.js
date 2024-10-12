import { getAppToken } from "../authControllers/getAppToken.js";
import axios from 'axios'

const baseUrl = process.env.SPOTIFY_BASE_URL

const startTime = Date.now(); // This is the current timestamp in milliseconds

// Define 24 hours in milliseconds
const twentyFourHours = 24 * 60 * 60 * 1000;

export const getGenreOfTheDay = async (req,res)=> {

    const currentTime = Date.now() // getting the current time
    const timeDifference = currentTime - startTime
    
    try {
        const appToken = await getAppToken()
        const response = await  axios(`${baseUrl}recommendations/available-genre-seeds`, {
            headers: {
                Authorization: `Bearer ${appToken}`
            }
        })

            const genresLength = response.data.genres.length
            const randomGenre = Math.floor(Math.random()* genresLength)

            console.log(randomGenre)


        res.status(200).json(response.data.genres[randomGenre])
    } catch (error) {
        res.status(500).json({error: "error when gettinng genre of the day", errorDetails: error})
    }
}
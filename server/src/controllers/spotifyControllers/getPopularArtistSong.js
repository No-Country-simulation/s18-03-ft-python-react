import axios from 'axios'
import { getAppToken } from '../authControllers/getAppToken.js'

const baseUrl = process.env.SPOTIFY_BASE_URL


export const getPopularArtistSong = async(req,res)=> {
    const {artistId} = req.body

    try {
        const accessToken = await getAppToken()

        const response = await axios.get(`${baseUrl}artists/${artistId}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
              },
        })

        res.status(200).json(response.data)

        
    } catch (error) {
        res.status(500).json({error: 'error when fetching popular artist songs', errorDetails: error})
    }
}
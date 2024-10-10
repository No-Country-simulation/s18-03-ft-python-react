import dotenv from 'dotenv';
import axios from 'axios';


dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const getUserToken = async (req,res)=> {
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString()
    
    try {
        
    } catch (error) {
        console.log("error getting user's token")
        res.status(500).json({
            error: "Error getting users token",
            errorDetails: error
        })
    }
}
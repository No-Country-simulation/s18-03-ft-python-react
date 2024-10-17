import supabase from "../../db"

export const registerUserDb = async (userInfo, userTopSongs, userTopArtist)=> {
    try {
        const {country, display_name, email, id, followers, uri, profile_photo, refresh_token } = userInfo
        
    } catch (error) {
        console.log('error while storing user at databse', error)
        return {
            success: false,
            error: error
        }
    }
}
import { supabase } from "./supabaseClient"



export const getRecentUsers = async(numberToGet: number) => {
    try {
        const {data, error} = await supabase
        .from('user')
        .select('*').order('created_at', {ascending: false}).limit(numberToGet)

        if(error){
            return {
                error: `error when getting ${numberToGet} users`,
                errorDetails: error,
            }
        }

        return data
    } catch (error) {
        return {
            error: 'error when getting users from database',
            errorDetails: error
        }
    }
}
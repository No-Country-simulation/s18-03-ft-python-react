import supabase from "../../db"

export const registerUserDb = async (userInfo, userTopSongs, userTopArtist) => {
    try {
        const {
            country,
            display_name,
            email,
            spotify_id,
            followers,
            uri,
            profile_photo,
            refresh_token 
        } = userInfo;

        const {
            artist_name: topArtistName, 
            artist_id: topArtistId,     
            song_uri: topArtistUri,
            artist_photo 
        } = userTopArtist;

        const {
            song_name: topSongName,    
            song_id: topSongId,        
            song_image,
            artist_id: songArtistId,   
            artist_name: songArtistName 
        } = userTopSongs;

        // first, we need to make sure the user does not exist, if it does, return the user

        const { data: existingUserWithDetails, error: selectError} = await supabase
        .from('user').select(`*, user_top_artist (*), user_top_songs (*)`).eq('spotify_id', spotify_id)

        if(selectError){
            return {
                error: 'error when getting user from the database'
            }
        }

        if(existingUserWithDetails.length > 0){
            console.log('user found and data retreived')
            return {
                success: true,
                user: existingUserWithDetails
            }
        }

        const {data: newUser,  error: newUserError } = await supabase
        .from('user')
        .insert([
            {
                country,
                display_name,
                email,
                spotify_id,
                followers,
                uri,
                profile_photo,
                refresh_token,
            }
        ])
        .select()


        if(newUserError){
            return {
                sucess: false,
                error: 'error when inserting new user'
            }
        }

        // creating the top artist table
        const userId = newUser[0].spotify_id

        const {error: topArtistError} = await supabase
        .from('user_top_artist')
        .insert([
            {
                user_id: userId,
                artist_name: topArtistName,
                artist_id: topArtistId,
                artist_photo,
                song_uri: topArtistUri,
            }
        ])

        if (topArtistError) {
            console.error('Error inserting top artist:', insertArtistError);
            return {
              success: false,
              error: 'Error inserting top artist',
            };
          }

          // 4 step: inserting user top songs

          const {error: topSongsError} = await supabase
          .from('user_top_songs').insert([
            {
                user_id: userId,
                artist_name: songArtistName,
                artist_id: songArtistId,
                song_name: topSongName,
                song_id: topSongId,
                song_image: song_image
            }
          ])

          if(topSongsError){
            console.log('Error inserting top songs', topSongsError)
            return {
                sucess: false,
                error: 'Error when inserting top songs'
            }
          }

          return {
            success: true,
            ...newUser[0],
            user_top_artist: {
                artist_name: topArtistName,
                artist_id: topArtistId,
                artist_photo,
                song_uri: topArtistUri,
            },
            user_top_songs: {
                artist_name: songArtistName,
                artist_id: songArtistId,
                song_name: topSongName,
                song_id: topSongId,
                song_image: song_image

            }

          }


    } catch (error) {
        console.log('error while storing user in the database', error);
        return {
            success: false,
            error: error
        };
    }
};

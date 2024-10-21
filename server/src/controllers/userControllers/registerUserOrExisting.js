import { supabase } from '../../db.js'

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
      song_name: topSongName,
      song_id: topSongId,
      song_image,
      artist_id: songArtistId,
      artist_name: songArtistName,
      song_uri: topSongUri
    } = userTopSongs;

    console.log('User Top Artist:', userTopArtist);
    const {
      artist_name: topArtistName,
      artist_id: topArtistId,
      artist_uri: topArtistUri,
      artist_photo
    } = userTopArtist;


    // Insert new user
    const { data: newUser, error: newUserError } = await supabase
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
      .select();

    if (newUserError) {
      console.error('Error when inserting new user:', newUserError);
      return {
        success: false,
        error: 'Error when inserting new user'
      };
    }

    // Insert top artist
    const userId = newUser[0].id;

    const { data: insertedTopArtist, error: topArtistError } = await supabase
      .from('user_top_artist')
      .insert([
        {
          user_id: userId,
          artist_name: topArtistName,
          artist_id: topArtistId,
          artist_photo,
        }
      ]);

    if (topArtistError) {
      console.error('Error inserting top artist:', topArtistError);
      return {
        success: false,
        error: 'Error inserting top artist',
      };
    }

    // Insert top songs
    const { data: insertedTopSongs, error: topSongsError } = await supabase
      .from('user_top_songs')
      .insert([
        {
          user_id: userId,
          artist_name: songArtistName,
          artist_id: songArtistId,
          song_name: topSongName,
          song_id: topSongId,
          song_image: song_image,
          song_uri: topSongUri
        }
      ]);

    if (topSongsError) {
      console.error('Error inserting top songs:', topSongsError);
      return {
        success: false,
        error: 'Error when inserting top songs'
      };
    }


    console.log('user created succesfully and returned')
    return {
      success: true,
      user: {
        ...newUser[0]
      },
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
    };

  } catch (error) {
    console.error('Error while storing user in the database:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while registering the user.'
    };
  }
};


export const verifyUserExist = async (spotify_id) => {
  const { data: existingUserWithDetails, error: selectError } = await supabase
    .from('user')
    .select(`*, user_top_artist (*), user_top_songs (*)`)
    .eq('spotify_id', spotify_id);

  if (selectError) {
    console.error('Error when getting user from the database:', selectError);
    return {
      success: false,
      message: 'Error when getting user from the database',
    };
  }

  if (existingUserWithDetails && existingUserWithDetails.length > 0) {
    console.log('User found and data retrieved');

    const user = existingUserWithDetails[0];
    const { user_top_artist, user_top_songs, ...userData } = user;

    const topArtistData = user_top_artist[0];
    const topSongData = user_top_songs[0];

    return {
      success: true,
      user: userData,
      user_top_artist: topArtistData,
      user_top_songs: topSongData,
    };
  } else {
    console.log('User not found in the database, returning success: false');
    return {
      success: false,
      message: 'User not found',
    };
  }
};

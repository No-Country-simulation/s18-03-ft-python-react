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

    const topArtistData = userTopArtist.map(artist => ({
      user_id: userId,
      artist_name: artist.artist_name,
      artist_id: artist.artist_id,
      artist_photo: artist.artist_photo,
      artist_uri: artist.artist_uri
    }));

    const { error: topArtistError } = await supabase
      .from('user_top_artist')
      .insert(topArtistData);

    if (topArtistError) {
      console.error('Error inserting top artist:', topArtistError);
      return {
        success: false,
        error: 'Error inserting top artist',
      };
    }

    // Insert top songs
    const topSongData = userTopSongs.map(song => ({
      user_id: userId,
      artist_name: song.artist_name,
      artist_id: song.artist_id,
      song_name: song.song_name,
      song_id: song.song_id,
      song_image: song.song_image,
      song_uri: song.song_uri,
    }));

    const { error: topSongsError } = await supabase
      .from('user_top_songs')
      .insert(topSongData);


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
        // ...newUser[0]
       ...userInfo
      },
      user_top_artist: userTopArtist,
      user_top_songs: userTopSongs
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

    return {
      success: true,
      user: userData,
      user_top_artist: user_top_artist, 
      user_top_songs: user_top_songs 
    };
  } else {
    console.log('User not found in the database, returning success: false');
    return {
      success: false,
      message: 'User not found',
    };
  }
};

import { Userinfo, UserTopArtistList, UserTopSongs } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
export interface User {
  user : Userinfo;
  user_top_artist: UserTopArtistList;
  user_top_songs: UserTopSongs;

}

// Define the UserState interface
interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    getUser: (state) => {
      const userDataString = localStorage.getItem("user");
      
      if (userDataString) {
        state.user = JSON.parse(userDataString);
      }
    },
  },
});

export const { setUser, getUser } = userSlice.actions;
export default userSlice.reducer;

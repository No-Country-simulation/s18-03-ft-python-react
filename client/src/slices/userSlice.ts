import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

// Define the UserState interface
interface UserState {
  user: User | null;
  appToken: {token: string, expiration: number} | null
}

const initialState: UserState = {
  user: null,
  appToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setToken: (state, action: PayloadAction<{token: string, expiration: number}>) => {
      state.appToken = action.payload;
    },
  },
});

export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;

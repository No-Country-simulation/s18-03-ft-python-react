import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: any | null,
    appToken: any | null
  }

const initialState: UserState = {
    user: null,
    appToken: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action)=> {
            state.user = action.payload
        },

        setToken: (state,action: {payload: any})=> {
            state.appToken = action.payload
        }
    }
})

export const {setUser, setToken} = userSlice.actions
export default userSlice.reducer

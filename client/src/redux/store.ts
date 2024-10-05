import { configureStore } from "@reduxjs/toolkit";

// hooks
import { spotifyApi } from "@/services/spotifyApi";
import { authApi } from "@/services/authApi";

// slices
import userSlice from '../slices/userSlice'

const store = configureStore({
    reducer: {
        // here we'll use the ones who manage global state
        userReducer: userSlice,

        //hooks
        [spotifyApi.reducerPath]: spotifyApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },

    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(
        spotifyApi.middleware,
        authApi.middleware,
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

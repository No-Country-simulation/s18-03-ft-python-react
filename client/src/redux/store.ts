import { configureStore } from "@reduxjs/toolkit";

// hooks
import { spotifyApi } from "@/services/spotifyApi";

const store = configureStore({
    reducer: {
        // here we'll use the ones who manage global state

        //hooks
        [spotifyApi.reducerPath]: spotifyApi.reducer
    },

    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(
        spotifyApi.middleware,
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: backendUrl,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getUserProfileInfo: builder.query({
            query: ()=> ({
                url: 'get-profile',
                method: "GET",
            })
        }),
    }),
})

export const { useGetUserProfileInfoQuery } = profileApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// URL y User es la estructura que debe de devolver
interface URL {
  url: string;
}
interface User {
  user_id: string;
  images: URL[];
  display_name: string;
}

// Login, Picture, Result y Welcome son las estructuras que se obtienen de la API de randomuser.me
interface Login {
  uuid:     string;
  username: string;
}
interface Picture {
  large:     string;
}
interface Result {
  login:      Login;
  picture:    Picture;
}
interface Welcome {
  results: Result[];
}

// Esta funcion transforma la estructura de datos de randomuser.me a la estructura que se espera
function transformDataDemo({results}:Welcome) {
  return results.map((r:Result)=>{
    const newData:User = {
      user_id: r.login.uuid,
      images: [{url: r.picture.large}],
      display_name: r.login.username,
    }
    return newData
  })
}

export const recentlyApi = createApi({
  reducerPath: "serrecentlyApiverApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://randomuser.me/api/', // https://randomuser.me/api/?results=10
  }),
  endpoints: (builder) => ({
    getRecentlyJoined: builder.query({
      // esta api es temporar, se uso para recuperar datos aleatorios de muestra, el token no es necesario
      query: ({limit, appToken})=> ({
        url: `?results=${limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${appToken}`,
        },
      }),
      transformResponse: (response:Welcome) => transformDataDemo(response),
    }),
  }),
});

export const {
  useGetRecentlyJoinedQuery,
} = recentlyApi;

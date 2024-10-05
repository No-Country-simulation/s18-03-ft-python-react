import React from 'react'
import { useGetTopArtistsQuery } from '@/services/spotifyApi'

export default function MostListened() {
    // const {data, error, isLoading} = useGetTopArtistsQuery({timeRange: 'short_term', limit: 1})

    // console.log(data)
    // console.log(error)
  return (
    <>
        <p>most listened</p>
    </>
  )
}

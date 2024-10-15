import { useGetUserProfileInfoQuery } from '@/services/profileApi'

export default function VerifyInfo() {
  const { data, isLoading, error } = useGetUserProfileInfoQuery({}) 

  console.log(data)
  console.log("HEEEY")

  if(isLoading){
    return <>loading...</>
  }

  if(error){
    return <>error</>
  }

    return (
      <div className='bg-spotify-black'>
        <h3>hey</h3>
      </div>
    )
  }


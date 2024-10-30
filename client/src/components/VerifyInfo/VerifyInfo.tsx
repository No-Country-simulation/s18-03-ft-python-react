import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useGetUserProfileInfoQuery } from '@/services/profileApi'
import { setUser } from '@/slices/userSlice';
import { useRouter } from 'next/navigation';

export default function VerifyInfo() {
  const { data, isLoading, error } = useGetUserProfileInfoQuery({}) 

  const authUser = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();

  const router = useRouter()

  console.log("data", data)



  useEffect(() => {
    if (data && !error) {
      dispatch(setUser(data));
     router.push(`/profile/${data?.user?.spotify_id}`);
    }
  }, [data, error, dispatch, router]);


  console.log("user", authUser)

  
  console.log("HEEEY")

  if(isLoading){
    return <>loading...</>
  }

  if(error){
    return <>error</>
  }

  console.log(error)

    return (
      <div className='bg-spotify-black'>
        <h3>hey</h3>
      </div>
    )
  }


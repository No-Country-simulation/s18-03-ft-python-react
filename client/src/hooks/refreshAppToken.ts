import {useEffect} from 'react'


//redux
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetAccessTokenMutation } from '@/services/authApi';
import { setToken } from '@/slices/userSlice';

const apiSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

export default function useRefreshAppToken() {
    const [getAccessToken] = useGetAccessTokenMutation()
    const dispatch = useAppDispatch()
    const appToken = useAppSelector(state=> state.userReducer.appToken)

    const onRefreshToken = async ()=> {
        try {
            const response = await getAccessToken(`grant_type=client_credentials&client_id=${clientId}&client_secret=${apiSecret}`).unwrap()
            const token = response.access_token;
            const expirationTime = Date.now() + response.expires_in * 1000

            dispatch(setToken({token, expiration: expirationTime}))
            
        } catch (error) {
            console.log('error when refreshing token', error)
        }
    }

    // useEffect to refresh the token when component mounts
  useEffect(() => {
    // If there's no token or it has expired, fetch a new one
    if (!appToken || appToken.expiration < Date.now()) {
      onRefreshToken();
    }
  }, [appToken]);

  return {appToken, onRefreshToken}
  
}

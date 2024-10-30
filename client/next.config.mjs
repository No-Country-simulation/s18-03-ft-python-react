/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.scdn.co', // Correct hostname without protocol and path
          port: '',  
          pathname: '/image/**', // Match all images under the /image path
        },
        {
          protocol: 'https',
          hostname: 'image-cdn-fa.spotifycdn.com', 
          port: '',  
          pathname: '/image/**',
        },
        {
          protocol: 'https',
          hostname: 'image-cdn-ak.spotifycdn.com', 
          port: '',  
          pathname: '/image/**',

        },
        //este hostname es temporal, se usa para recuperar datos aleatorios de muestra
        {
          protocol: 'https',
          hostname: 'randomuser.me', 
          port: '',  
          pathname: '/api/portraits/**',

        },
        {
          protocol: 'https',
          hostname: 'cdn-icons-png.flaticon.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'via.placeholder.com',
          port: '',
          pathname: '/**',
        }
      ],
    },
  };
  
  export default nextConfig;
  

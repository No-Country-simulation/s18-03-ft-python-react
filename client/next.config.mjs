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
          hostname: 'image-cdn-ak.spotifycdn.com',
          port: '',  
          pathname: '/image/**',
        }
      ],
    },
  };
  
  export default nextConfig;
  

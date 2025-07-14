/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['res.cloudinary.com'], 
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true, 
      },
      {
        source: '/about',
        destination: '/mission',
        permanent: true, 
      },
    ];
  },
};

export default nextConfig;
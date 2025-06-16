/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lakpura.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.lakpura.com',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'upulniexpress.lk',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

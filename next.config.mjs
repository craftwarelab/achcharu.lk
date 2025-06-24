/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "postimages.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "postimg.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upulniexpress.lk",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

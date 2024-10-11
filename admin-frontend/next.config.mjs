// next.config.mjs
export const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.10.183',
        port: '9000', // Include the port if needed
        pathname: '/**', // This allows all paths under the hostname
      },
    ],
  },
};

export default nextConfig;

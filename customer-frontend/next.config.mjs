// next.config.mjs
export const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_MINIO_ENDPOINT || 'localhost',
        port: process.env.NEXT_PUBLIC_MINIO_PORT || '9000',
        pathname: '/**', // This allows all paths under the hostname
      },
    ],
  },

  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
};

export default nextConfig;

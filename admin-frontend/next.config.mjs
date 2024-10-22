// next.config.mjs
export const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
        port: process.env.NEXT_PUBLIC_MINIO_PORT,
        pathname: '/**', // This allows all paths under the hostname
      },
    ],
  },
};

export default nextConfig;

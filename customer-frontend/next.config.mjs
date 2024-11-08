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
};

export default nextConfig;

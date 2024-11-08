export const constructImageUrl = (imagePath: string) => {
  const endpoint = process.env.NEXT_PUBLIC_MINIO_ENDPOINT;
  const port = process.env.NEXT_PUBLIC_MINIO_PORT;
  return imagePath.startsWith('http') ? imagePath : `http://${endpoint}:${port}${imagePath}`;
};
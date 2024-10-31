export const getFileSizeInMB = (fileSize: number) =>
  (fileSize / (1024 * 1024)).toFixed(2); // Convert bytes to MB

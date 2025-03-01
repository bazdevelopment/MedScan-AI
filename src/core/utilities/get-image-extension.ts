export const getImageExtension = (filename: string) =>
  filename?.split('.')?.pop()?.toUpperCase();

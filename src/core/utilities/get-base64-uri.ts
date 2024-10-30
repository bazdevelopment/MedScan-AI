export const getBase64ImageUri = (
  base64String: string,
  mimeType: string = 'image/jpeg',
): string => {
  return `data:${mimeType};base64,${base64String}`;
};

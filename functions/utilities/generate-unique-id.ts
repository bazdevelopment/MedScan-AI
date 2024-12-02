// Utility function used to generate unique ids
export const generateUniqueId = (): string => {
  const timestamp = new Date().getTime().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 5);
  return `${timestamp}-${randomStr}`;
};

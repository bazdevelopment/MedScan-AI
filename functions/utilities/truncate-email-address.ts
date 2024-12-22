export const truncateEmailAddress = (email: string): string => {
  /**
   * Extracts the part of the email before the '@' symbol.
   *
   * @param {string} email - The email address to slice.
   * @returns {string} - The username part of the email.
   */
  if (!email.includes('@')) {
    throw new Error('Invalid email address');
  }

  return email.split('@')[0];
};

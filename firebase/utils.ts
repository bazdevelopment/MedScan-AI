import storage from '@react-native-firebase/storage';

export const uploadFilesToFirebase = async (
  localFilePaths: string[],
  storagePaths: string[],
  metadataArray: { [key: string]: any }[] = [],
): Promise<string[]> => {
  try {
    // Ensure the arrays are of the same length
    if (localFilePaths.length !== storagePaths.length) {
      throw new Error(
        'The number of local file paths, storage paths, and metadata objects must match.',
      );
    }

    // Create an array of promises for uploading files
    const uploadPromises = localFilePaths.map(async (localFilePath, index) => {
      const storagePath = storagePaths[index];
      const metadata = metadataArray[index] || {};

      // Create a reference to the storage path
      const reference = storage().ref(storagePath);

      // Upload the file to Firebase Storage
      await reference.putFile(localFilePath, metadata);

      // Get the public URL of the uploaded file
      const publicUrl = await reference.getDownloadURL();

      return publicUrl;
    });

    // Wait for all uploads to complete (even if some fail)
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Error uploading files to Firebase Storage:', error);
    throw new Error('Failed to upload files to Firebase Storage');
  }
};

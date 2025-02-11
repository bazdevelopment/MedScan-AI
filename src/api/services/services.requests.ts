import { firebaseCloudFunctionsInstance } from 'firebase/config';

export const addNewCollectionFields = async (payload: {
  collectionName: string;
  fields: { [key: string]: any };
}) => {
  try {
    const onAddFieldsToCollection =
      firebaseCloudFunctionsInstance.httpsCallable('addFieldsToCollection');

    const { data } = await onAddFieldsToCollection(payload);

    return data;
  } catch (error) {
    throw error;
  }
};

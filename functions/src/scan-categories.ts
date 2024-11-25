import { Storage } from 'firebase-admin/lib/storage/storage';
import * as functions from 'firebase-functions/v1';

import { SCAN_CATEGORIES } from '../utilities/__mocks__/scan-categories';
import { admin } from './common';

export const getScanCategoriesHandler = async (_: unknown, context: any) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Authentication required',
      );
    }

    const db = admin.firestore();
    const storage = admin.storage();
    const categoriesSnapshot = await db.collection('scan_categories').get();

    if (categoriesSnapshot.empty) {
      throw new functions.https.HttpsError('not-found', 'No categories found!');
    }

    const categories = [];

    // Iterate through each category
    for (const categoryDoc of categoriesSnapshot.docs) {
      const categoryData = categoryDoc.data();
      const categoryId = categoryData.id;

      const examplesSnapshot = await categoryDoc.ref
        .collection('category_examples')
        .get();

      const examples = [];
      for (const exampleDoc of examplesSnapshot.docs) {
        const exampleData = exampleDoc.data();

        // Get the image URL from Firebase Storage
        const imageUrl = await getImageUrl(exampleData.image, storage);

        examples.push({
          name: exampleData.name,
          image: imageUrl,
          explanation: exampleData.explanation,
        });
      }

      categories.push({
        id: categoryId,
        name: categoryData.name,
        fullName: categoryData.fullName,
        examples: examples,
      });
    }
    return { success: true, categories };
  } catch (error: any) {
    console.error('Error getting scan categories:', error);
    throw new functions.https.HttpsError(error.code, error.message, {
      message: error.message || 'Error retrieving scan categories..',
    });
  }
};

// Helper function to get the download URL for an image in Firebase Storage
async function getImageUrl(imagePath: string, storage: Storage) {
  try {
    const bucket = storage.bucket();
    const file = bucket.file(imagePath);

    // Get the signed URL to make the image publicly accessible
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491', // Set a long expiration date for the URL
    });
    return url;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return null; // Return null if the image URL cannot be fetched
  }
}

export const handleUploadScanCategories = async (_: any, res: any) => {
  try {
    const db = admin.firestore();
    // Loop through SCAN_CATEGORIES
    for (const category of SCAN_CATEGORIES) {
      // Add the main category document
      const categoryRef = db.collection('scan_categories').doc(category.name);
      await categoryRef.set({
        id: category.id,
        name: category.name,
        fullName: category.fullName,
      });

      // Add the examples as a subcollection
      const examplesRef = categoryRef.collection('category_examples');
      for (const example of category.examples) {
        await examplesRef.add(example);
      }
    }

    res.status(200).send('Scan categories uploaded successfully!');
  } catch (error) {
    console.error('Error uploading scan categories:', error);
    res.status(500).send('Failed to upload scan categories.');
  }
};

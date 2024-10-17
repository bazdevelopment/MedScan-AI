import analytics from '@react-native-firebase/analytics';
import firebaseApp from '@react-native-firebase/app';
import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// Initialize Firebase (no need for config if you're using default options from GoogleService-Info.plist and google-services.json)

// Get instances of the services
const firebaseAuth: FirebaseAuthTypes.Module = auth();
const firebaseFirestore = firestore();
const firebaseStorage = storage();
const firebaseCrashlytics = crashlytics();
const firebaseAnalytics = analytics();

export {
  firebaseAnalytics,
  firebaseApp,
  firebaseAuth,
  firebaseCrashlytics,
  firebaseFirestore,
  firebaseStorage,
};

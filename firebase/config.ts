import analytics from '@react-native-firebase/analytics';
import firebaseApp from '@react-native-firebase/app';
import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import firestore from '@react-native-firebase/firestore';
import {
  firebase,
  type FirebaseFunctionsTypes,
} from '@react-native-firebase/functions';
import storage from '@react-native-firebase/storage';

// Initialize Firebase (no need for config if you're using default options from GoogleService-Info.plist and google-services.json)

// Get instances of the services
const firebaseAuth: FirebaseAuthTypes.Module = auth();
const firebaseFirestore = firestore();
const firebaseStorage = storage();
const firebaseCrashlytics = crashlytics();
const firebaseAnalytics = analytics();

const getCloudFunctionInstance = (
  isEmulatorEnabled: boolean = false,
): FirebaseFunctionsTypes.Module => {
  const wrapper = firebase.app().functions('europe-west1');
  if (__DEV__ && isEmulatorEnabled) {
    /*
    Use the emulator if in development mode
    make sure that emulator/start runs and npm run build is in watch mode build:watch
    */
    wrapper.useEmulator('localhost', 5001);
  }
  return wrapper;
};

const firebaseCloudFunctionsInstance = getCloudFunctionInstance();

export {
  firebaseAnalytics,
  firebaseApp,
  firebaseAuth,
  firebaseCloudFunctionsInstance,
  firebaseCrashlytics,
  firebaseFirestore,
  firebaseStorage,
};

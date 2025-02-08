import { ITranslation } from './types';

export const en: ITranslation = {
  common: {
    welcome: 'Welcome',
    error: 'An error occurred',
    loading: 'Loading...',
    noUserFound: 'You are not authorized to make this request. Please log in.',
    userIdMissing:
      'It looks like the user id is missing. Please provide it to proceed.',
    scanLimitReached:
      'You’ve reached the maximum number of scans allowed. Please upgrade your plan to continue using the service.',
    mandatoryLanguage: 'The language code is required.',
  },
  auth: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    forgotPassword: 'Forgot Password?',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'Please provide your email address to proceed',
    invalidEmail:
      'The email address entered is invalid. Please verify it and try again.',
    accountCreated:
      'Your account has been successfully created! Please check your email for the verification code.',
    verificationCodeSent:
      "We've sent a verification code to your email. Please check your inbox.",
    internalError:
      'There was an error processing your authentication via email. Please try again',
  },

  sendEmailVerification: {
    emailMandatory: 'An email address is required to proceed.',
    emailUsed:
      'This email address is already in use. Please use a different one.',
    userNotFound:
      "We couldn't find the specified user. Please check your details and try again.",
    verificationCodeSent:
      'The verification code has been successfully sent to your email.',
    generalError: 'An error occurred while starting email verification.',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'Start date and end date are required.',
    startDatePriority: 'The start date cannot be after the end date.',
    generalError: 'Unable to retrieve analyses.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory: 'An authentication code is mandatory to continue.',
    emailAddressMandatory: 'Email address is mandatory to continue.',
    userNotFound:
      'The specified user could not be found. Please check your details and try again.',
    invalidAuthCode:
      'Oops! This is not a valid authentication code. Please check and try again!',
    authCodeExpired:
      "Oops! Your code has expired. Please reattempt login with your email address or click on 'Resend code'",
    authCodeVerified: 'The user has been successfully verified.',
    generalError: 'Oops! We encountered an error while verifying your code.',
  },

  analyzeImage: {
    scanLimitReached:
      'You’ve reached the maximum number of scans allowed. Please upgrade your plan to continue using the service.',
    imageMissing:
      'Image missing. Please select and upload an image to proceed.',
    uploadImageStorageError:
      'We encountered an error while uploading your image. Please check your connection and try again.',
    interpretationNotSaved:
      'Unable to save the analysis result. Please check your connection and try again.',
    analysisCompleted: 'Image analysis completed successfully!',
  },
  analyzeVideo: {
    noVideoFound:
      'Video file missing. Please select and upload a video to proceed.',
    uploadVideoStorageError:
      'We encountered an error while uploading your video. Please check your connection and try again.',
    interpretationNotSaved:
      'Unable to save the analysis result. Please check your connection and try again.',
    analysisCompleted: 'Video analysis completed successfully!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'One more scan has been used.',
    generalError: 'Unable to decrement the number of scans!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'One scan has been decremented.',
    decrementErrorScan:
      'There was an issue updating the number of scans. Please try again later.',
    generalError: 'Unable to decrement the number of scans!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Successfully subscribed!',
    updateSubscriptionError: 'Unable to update user subscription!',
  },
  updateUserLanguage: {
    updateSuccess: 'Successfully updated the language!',
    updateError:
      'An unexpected error occurred while updating the language. Please try again later.',
  },

  getUserInfo: {
    successGetInfo: 'Successfully fetched userInfo data',
    errorGetInfo:
      'An unexpected error occurred while fetching user inf. Please try again later.',
  },
  getUserInfoById: {
    noUserInfoData: 'The user document exists, but no data is available.',
    getUserFetchError: 'An error occurred while fetching the user information.',
  },

  updateScanInterpretation: {
    success: 'Scan interpretation record updated successfully!',
    generalError: 'An error occurred while updating the scan interpretation.',
    paramsRequired: "'documentId' and 'fieldsToUpdate' are both required.",
  },

  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' is required.",
    noDocIdFound: 'No document was found with the provided id.',
    success: 'Document retrieved successfully.',
    generalError:
      'An error occurred while fetching the interpretation for the provided document id.',
  },

  getRecentInterpretation: {
    limitRequired: 'The limit must be a number between 1 and 100.',
    noInterpretationFound: 'No interpretations found',
    success: 'Recent interpretations retrieved successfully!',
    generalError: 'An error occurred while retrieving recent interpretations.',
    generalErrorAdditional: 'Internal server error occurred.',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Providing a device token is mandatory.',
    generalError: 'Error storing device token.',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Notification title and body are mandatory.',
    generalError: 'An error occurred while processing notifications.',
    generalErrorAdditional: 'Failed to send global notification',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'Device ID is mandatory.',
    languageMandatory: 'Language is mandatory.',
    deviceIdentified: 'Your device has been identified successfully.',
    generalError: 'An error occurred while checking device trial.',
  },

  getUserNotification: {
    generalError: 'Failed to fetch user notifications.',
    generalErrorAdditional:
      'An error occurred while fetching user notifications.',
  },

  getScanCategories: {
    noCategoryFound: 'No categories found',
    generalError: 'An error occurred while retrieving scan categories.',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Scan categories uploaded successfully.',
    generalError: 'Failed to upload scan categories.',
  },

  sendUserNotification: {
    noTokenFound: 'No valid Expo tokens found. Unable to send notifications',
    generalError: 'Failed to send notification',
  },

  updateUser: {
    successUpdatedUser: 'User updated successfully.',
    updateUserError: 'Unable to update the user record. Please try again.',
  },
};

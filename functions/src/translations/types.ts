export interface ITranslation {
  common: {
    welcome: string;
    error: string;
    loading: string;
    noUserFound: string;
    userIdMissing: string;
    scanLimitReached: string;
    mandatoryLanguage: string;
  };
  auth: {
    signIn: string;
    signUp: string;
    forgotPassword: string;
  };
  loginUserViaEmail: {
    mandatoryEmail: string;
    invalidEmail: string;
    accountCreated: string;
    verificationCodeSent: string;
    internalError: string;
  };
  sendEmailVerification: {
    emailMandatory: string;
    emailUsed: string;
    userNotFound: string;
    verificationCodeSent: string;
    generalError: string;
  };

  verifyAuthenticationCode: {
    authCodeMandatory: string;
    emailAddressMandatory: string;
    userNotFound: string;
    invalidAuthCode: string;
    authCodeExpired: string;
    authCodeVerified: string;
    generalError: string;
  };

  analyzeImage: {
    scanLimitReached: string;
    imageMissing: string;
    uploadImageStorageError: string;
    interpretationNotSaved: string;
    analysisCompleted: string;
  };

  analyzeVideo: {
    noVideoFound: string;
    uploadVideoStorageError: string;
    interpretationNotSaved: string;
    analysisCompleted: string;
  };

  incrementUsersScans: {
    incrementSuccessScan: string;
    generalError: string;
  };

  decrementUserScans: {
    decrementSuccessScan: string;
    decrementErrorScan: string;
    generalError: string;
  };

  getUserInfo: {
    successGetInfo: string;
    errorGetInfo: string;
  };

  getUserInfoById: {
    noUserInfoData: string;
    getUserFetchError: string;
  };

  updateUserSubscription: {
    subscribeSuccess: string;
    updateSubscriptionError: string;
  };
  updateUser: {
    successUpdatedUser: string;
    updateUserError: string;
  };

  updateUserLanguage: {
    updateSuccess: string;
    updateError: string;
  };

  updateScanInterpretation: {
    success: string;
    generalError: string;
    paramsRequired: string;
  };

  getInterpretationByDate: {
    startEndDateRequired: string;
    startDatePriority: string;
    generalError: string;
  };

  getInterpretationByDocumentId: {
    paramsRequired: string;
    noDocIdFound: string;
    success: string;
    generalError: string;
  };

  getRecentInterpretation: {
    limitRequired: string;
    noInterpretationFound: string;
    success: string;
    generalError: string;
    generalErrorAdditional: string;
  };
  storeDeviceToken: {
    deviceTokenRequired: string;
    generalError: string;
  };

  sendGlobalPushNotifications: {
    requiredParams: string;
    generalError: string;
    generalErrorAdditional: string;
  };

  checkDeviceUniqueIdentifier: {
    deviceMandatory: string;
    languageMandatory: string;
    deviceIdentified: string;
    generalError: string;
  };

  getUserNotification: {
    generalError: string;
    generalErrorAdditional: string;
  };

  getScanCategories: {
    noCategoryFound: string;
    generalError: string;
  };

  uploadScanCategories: {
    successfullyUploaded: string;
    generalError: string;
  };

  sendUserNotification: {
    noTokenFound: string;
    generalError: string;
  };
  // Add more sections as needed
}

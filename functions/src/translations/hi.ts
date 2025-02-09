import { ITranslation } from './types';

export const hi: ITranslation = {
  common: {
    welcome: 'स्वागत है',
    error: 'एक त्रुटि हुई',
    loading: 'लोड हो रहा है...',
    noUserFound:
      'आप इस अनुरोध को करने के लिए अधिकृत नहीं हैं। कृपया लॉग इन करें',
    userIdMissing:
      'लगता है कि उपयोगकर्ता आईडी गायब है। कृपया आगे बढ़ने के लिए इसे प्रदान करें',
    scanLimitReached:
      'आप अधिकतम स्वीकृत स्कैन की संख्या तक पहुंच गए हैं। सेवा का उपयोग जारी रखने के लिए कृपया अपनी योजना को अपग्रेड करें',
    mandatoryLanguage: 'भाषा कोड आवश्यक है',
  },
  auth: {
    signIn: 'साइन इन करें',
    signUp: 'साइन अप करें',
  },
  loginUserViaEmail: {
    mandatoryEmail: 'कृपया आगे बढ़ने के लिए अपना ईमेल पता प्रदान करें',
    invalidEmail:
      'दर्ज किया गया ईमेल पता अमान्य है। कृपया इसे सत्यापित करें और पुनः प्रयास करें',
    accountCreated:
      'आपका खाता सफलतापूर्वक बनाया गया है! सत्यापन कोड के लिए कृपया अपना ईमेल जांचें',
    verificationCodeSent:
      'हमने आपके ईमेल पर एक सत्यापन कोड भेजा है। कृपया अपना इनबॉक्स जांचें',
    internalError:
      'ईमेल के माध्यम से आपके प्रमाणीकरण में एक त्रुटि हुई। कृपया पुनः प्रयास करें',
  },
  sendEmailVerification: {
    emailMandatory: 'आगे बढ़ने के लिए ईमेल पता आवश्यक है',
    emailUsed:
      'यह ईमेल पता पहले से उपयोग में है। कृपया कोई अन्य ईमेल पता उपयोग करें',
    userNotFound:
      'हमें निर्दिष्ट उपयोगकर्ता नहीं मिला। कृपया अपनी जानकारी जांचें और पुनः प्रयास करें',
    verificationCodeSent:
      'सत्यापन कोड सफलतापूर्वक आपके ईमेल पर भेज दिया गया है',
    generalError: 'ईमेल सत्यापन शुरू करने में एक त्रुटि हुई',
  },
  getInterpretationByDate: {
    startEndDateRequired: 'प्रारंभ तिथि और समाप्ति तिथि आवश्यक हैं।',
    startDatePriority: 'प्रारंभ तिथि समाप्ति तिथि के बाद नहीं हो सकती।',
    generalError: 'विश्लेषण प्राप्त करने में असमर्थ।',
  },
  verifyAuthenticationCode: {
    authCodeMandatory: 'आगे बढ़ने के लिए प्रमाणीकरण कोड अनिवार्य है',
    emailAddressMandatory: 'आगे बढ़ने के लिए ईमेल पता अनिवार्य है',
    userNotFound:
      'निर्दिष्ट उपयोगकर्ता नहीं मिला। कृपया अपनी जानकारी जांचें और पुनः प्रयास करें',
    invalidAuthCode:
      'उफ़! यह एक मान्य प्रमाणीकरण कोड नहीं है। कृपया जांचें और पुनः प्रयास करें!',
    authCodeExpired:
      "उफ़! आपका कोड समाप्त हो गया है। कृपया अपने ईमेल पते से पुनः लॉगिन का प्रयास करें या 'कोड पुनः भेजें' पर क्लिक करें",
    authCodeVerified: 'उपयोगकर्ता सफलतापूर्वक सत्यापित किया गया',
    generalError: 'उफ़! आपके कोड की जांच करते समय हमें एक त्रुटि मिली',
  },
  analyzeImage: {
    scanLimitReached:
      'आप अधिकतम स्वीकृत स्कैन की संख्या तक पहुंच गए हैं। सेवा का उपयोग जारी रखने के लिए कृपया अपनी योजना को अपग्रेड करें',
    imageMissing:
      'छवि गायब है। कृपया आगे बढ़ने के लिए एक छवि चुनें और अपलोड करें',
    uploadImageStorageError:
      'आपकी छवि अपलोड करते समय हमें एक त्रुटि मिली। कृपया अपना कनेक्शन जांचें और पुनः प्रयास करें',
    interpretationNotSaved:
      'विश्लेषण परिणाम सहेजने में असमर्थ। कृपया अपना कनेक्शन जांचें और पुनः प्रयास करें',
    analysisCompleted: 'छवि विश्लेषण सफलतापूर्वक पूरा हुआ!',
  },
  analyzeVideo: {
    noVideoFound:
      'वीडियो फ़ाइल गायब है। कृपया आगे बढ़ने के लिए एक वीडियो चुनें और अपलोड करें',
    uploadVideoStorageError:
      'आपका वीडियो अपलोड करते समय हमें एक त्रुटि मिली। कृपया अपना कनेक्शन जांचें और पुनः प्रयास करें',
    interpretationNotSaved:
      'विश्लेषण परिणाम सहेजने में असमर्थ। कृपया अपना कनेक्शन जांचें और पुनः प्रयास करें',
    analysisCompleted: 'वीडियो विश्लेषण सफलतापूर्वक पूरा हुआ!',
  },
  incrementUsersScans: {
    incrementSuccessScan: 'एक और स्कैन का उपयोग किया गया',
    generalError: 'स्कैन की संख्या कम करने में असमर्थ!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'एक स्कैन कम कर दिया गया है',
    decrementErrorScan:
      'स्कैन की संख्या अपडेट करने में एक समस्या हुई। कृपया बाद में पुनः प्रयास करें',
    generalError: 'स्कैन की संख्या कम करने में असमर्थ!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'सफलतापूर्वक सदस्यता ली गई!',
    updateSubscriptionError: 'उपयोगकर्ता की सदस्यता अपडेट करने में असमर्थ!',
  },
  updateUserLanguage: {
    updateSuccess: 'भाषा सफलतापूर्वक अपडेट की गई!',
    updateError:
      'भाषा अपडेट करते समय एक अनपेक्षित त्रुटि हुई। कृपया बाद में पुनः प्रयास करें',
  },
  getUserInfo: {
    successGetInfo: 'उपयोगकर्ता की जानकारी सफलतापूर्वक प्राप्त की गई',
    errorGetInfo:
      'उपयोगकर्ता की जानकारी प्राप्त करते समय एक अनपेक्षित त्रुटि हुई। कृपया बाद में पुनः प्रयास करें',
  },
  getUserInfoById: {
    noUserInfoData:
      'उपयोगकर्ता दस्तावेज़ मौजूद है, लेकिन कोई डेटा उपलब्ध नहीं है',
    getUserFetchError: 'उपयोगकर्ता की जानकारी प्राप्त करते समय एक त्रुटि हुई',
  },
  updateScanInterpretation: {
    success: 'स्कैन व्याख्या रिकॉर्ड सफलतापूर्वक अपडेट किया गया!',
    generalError: 'स्कैन व्याख्या अपडेट करते समय एक त्रुटि हुई',
    paramsRequired: "'documentId' और 'fieldsToUpdate' दोनों आवश्यक हैं",
  },
  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' आवश्यक है",
    noDocIdFound: 'दिए गए आईडी के साथ कोई दस्तावेज़ नहीं मिला',
    success: 'दस्तावेज़ सफलतापूर्वक प्राप्त किया गया',
    generalError:
      'दिए गए दस्तावेज़ आईडी के लिए व्याख्या प्राप्त करते समय एक त्रुटि हुई',
  },
  getRecentInterpretation: {
    limitRequired: 'सीमा 1 और 100 के बीच एक संख्या होनी चाहिए',
    noInterpretationFound: 'कोई व्याख्या नहीं मिली',
    success: 'हाल की व्याख्याएं सफलतापूर्वक प्राप्त की गईं!',
    generalError: 'हाल की व्याख्याएं प्राप्त करते समय एक त्रुटि हुई',
    generalErrorAdditional: 'आंतरिक सर्वर त्रुटि हुई',
  },
  storeDeviceToken: {
    deviceTokenRequired: 'डिवाइस टोकन प्रदान करना अनिवार्य है।',
    generalError: 'डिवाइस टोकन संग्रहित करने में त्रुटि',
  },
  sendGlobalPushNotifications: {
    requiredParams: 'सूचना शीर्षक और सामग्री अनिवार्य हैं।',
    generalError: 'सूचनाएं संसाधित करते समय एक त्रुटि हुई',
    generalErrorAdditional: 'वैश्विक सूचना भेजने में विफल',
  },
  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'डिवाइस आईडी अनिवार्य है',
    languageMandatory: 'भाषा अनिवार्य है',
    deviceIdentified: 'आपका डिवाइस सफलतापूर्वक पहचाना गया',
    generalError: 'डिवाइस परीक्षण की जांच करते समय एक त्रुटि हुई',
  },
  getUserNotification: {
    generalError: 'उपयोगकर्ता सूचनाएं प्राप्त करने में विफल',
    generalErrorAdditional: 'उपयोगकर्ता सूचनाएं प्राप्त करते समय एक त्रुटि हुई',
  },
  getScanCategories: {
    noCategoryFound: 'कोई श्रेणी नहीं मिली',
    generalError: 'स्कैन श्रेणियां प्राप्त करते समय एक त्रुटि हुई',
  },
  uploadScanCategories: {
    successfullyUploaded: 'स्कैन श्रेणियां सफलतापूर्वक अपलोड की गईं',
    generalError: 'स्कैन श्रेणियां अपलोड करने में विफल',
  },
  sendUserNotification: {
    noTokenFound: 'कोई मान्य Expo टोकन नहीं मिला। सूचनाएं भेजने में असमर्थ',
    generalError: 'सूचना भेजने में विफल',
  },
  updateUser: {
    successUpdatedUser: 'उपयोगकर्ता सफलतापूर्वक अपडेट किया गया',
    updateUserError:
      'उपयोगकर्ता रिकॉर्ड अपडेट करने में असमर्थ। कृपया पुनः प्रयास करें।',
  },
};

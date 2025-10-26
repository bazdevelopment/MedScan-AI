import { ITranslation } from './types';

export const hu: ITranslation = {
  common: {
    welcome: 'Üdvözöljük',
    error: 'Hiba történt',
    loading: 'Betöltés...',
    noUserFound: 'Nincs jogosultsága ehhez a kéréshez. Kérjük, jelentkezzen be',
    userIdMissing:
      'Úgy tűnik, hiányzik a felhasználói azonosító. Kérjük, adja meg a folytatáshoz',
    scanLimitReached:
      'Elérte a megengedett maximális szkennelések számát. Kérjük, frissítse a csomagját a szolgáltatás további használatához',
    mandatoryLanguage: 'A nyelvi kód kötelező',
  },
  auth: {
    signIn: 'Bejelentkezés',
    signUp: 'Regisztráció',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'Kérjük, adja meg e-mail címét a folytatáshoz',
    invalidEmail:
      'A megadott e-mail cím érvénytelen. Kérjük, ellenőrizze és próbálja újra',
    accountCreated:
      'Fiókja sikeresen létrejött! Kérjük, ellenőrizze e-mailjét a hitelesítési kódért',
    verificationCodeSent:
      'Elküldtünk egy hitelesítési kódot az e-mail címére. Kérjük, ellenőrizze bejövő leveleit',
    internalError:
      'Hiba történt az e-mailes hitelesítése feldolgozása során. Kérjük, próbálja újra',
  },

  sendEmailVerification: {
    emailMandatory: 'E-mail cím szükséges a folytatáshoz',
    emailUsed: 'Ezt az e-mail címet már használják. Kérjük, használjon másikat',
    userNotFound:
      'Nem találtuk a megadott felhasználót. Kérjük, ellenőrizze adatait és próbálja újra',
    verificationCodeSent:
      'A hitelesítési kód sikeresen elküldve az e-mail címére',
    generalError: 'Hiba történt az e-mail hitelesítés indításakor',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'Kezdő és befejező dátum megadása kötelező.',
    startDatePriority: 'A kezdő dátum nem lehet későbbi a befejező dátumnál.',
    generalError: 'Nem sikerült lekérni az elemzéseket.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory: 'Hitelesítési kód kötelező a folytatáshoz',
    emailAddressMandatory: 'E-mail cím kötelező a folytatáshoz',
    userNotFound:
      'A megadott felhasználó nem található. Kérjük, ellenőrizze adatait és próbálja újra',
    invalidAuthCode:
      'Hoppá! Ez nem érvényes hitelesítési kód. Kérjük, ellenőrizze és próbálja újra!',
    authCodeExpired:
      "Hoppá! A kódja lejárt. Kérjük, próbáljon meg újra bejelentkezni e-mail címével vagy kattintson a 'Kód újraküldése' gombra",
    authCodeVerified: 'A felhasználó sikeresen hitelesítve',
    generalError: 'Hoppá! Hiba történt a kódja hitelesítése során',
  },

  analyzeImage: {
    scanLimitReached:
      'Elérte a megengedett maximális szkennelések számát. Kérjük, frissítse a csomagját a szolgáltatás további használatához',
    imageMissing:
      'Kép hiányzik. Kérjük, válasszon ki és töltsön fel egy képet a folytatáshoz',
    uploadImageStorageError:
      'Hiba történt a kép feltöltése során. Kérjük, ellenőrizze kapcsolatát és próbálja újra',
    interpretationNotSaved:
      'Nem sikerült menteni az elemzés eredményét. Kérjük, ellenőrizze kapcsolatát és próbálja újra',
    analysisCompleted: 'Képelemzés sikeresen befejezve!',
  },
  analyzeVideo: {
    noVideoFound:
      'Videófájl hiányzik. Kérjük, válasszon ki és töltsön fel egy videót a folytatáshoz',
    uploadVideoStorageError:
      'Hiba történt a videó feltöltése során. Kérjük, ellenőrizze kapcsolatát és próbálja újra',
    interpretationNotSaved:
      'Nem sikerült menteni az elemzés eredményét. Kérjük, ellenőrizze kapcsolatát és próbálja újra',
    analysisCompleted: 'Videóelemzés sikeresen befejezve!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'Még egy szkennelés felhasználva',
    generalError: 'Nem sikerült növelni a szkennelések számát!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Egy szkennelés csökkentve',
    decrementErrorScan:
      'Probléma merült fel a szkennelések számának frissítésekor. Kérjük, próbálja újra később',
    generalError: 'Nem sikerült csökkenteni a szkennelések számát!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Sikeresen feliratkozva!',
    updateSubscriptionError:
      'Nem sikerült frissíteni a felhasználó előfizetését!',
  },
  updateUserLanguage: {
    updateSuccess: 'Nyelv sikeresen frissítve!',
    updateError:
      'Váratlan hiba történt a nyelv frissítése során. Kérjük, próbálja újra később',
  },

  getUserInfo: {
    successGetInfo: 'Felhasználói információk sikeresen lekérve',
    errorGetInfo:
      'Váratlan hiba történt a felhasználói információk lekérése során. Kérjük, próbálja újra később',
  },
  getUserInfoById: {
    noUserInfoData:
      'A felhasználói dokumentum létezik, de nincsenek elérhető adatok',
    getUserFetchError: 'Hiba történt a felhasználói információk lekérése során',
  },

  updateScanInterpretation: {
    success: 'Szkennelés értelmezési rekord sikeresen frissítve!',
    generalError: 'Hiba történt a szkennelés értelmezésének frissítése során',
    paramsRequired: "Mind a 'documentId', mind a 'fieldsToUpdate' kötelező",
  },
  deleteScanInterpretation: {
    success: 'A jelentés sikeresen törölve!',
    documentIdRequired: "'DocumentId' megadása kötelező a folytatáshoz.",
    generalError:
      'Valami hiba történt a jelentés törlése során. Kérjük, próbálja újra.',
  },

  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' megadása kötelező",
    noDocIdFound: 'Nem található dokumentum a megadott azonosítóval',
    success: 'Dokumentum sikeresen lekérve',
    generalError:
      'Hiba történt a megadott dokumentum azonosító értelmezésének lekérése során',
  },

  getRecentInterpretation: {
    limitRequired: 'A limitnek 1 és 100 közötti számnak kell lennie',
    noInterpretationFound: 'Nem találhatók értelmezések',
    success: 'Legutóbbi értelmezések sikeresen lekérve!',
    generalError: 'Hiba történt a legutóbbi értelmezések lekérése során',
    generalErrorAdditional: 'Belső szerverhiba történt',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Eszköz token megadása kötelező.',
    generalError: 'Hiba az eszköz token tárolása során',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Az értesítés címe és szövege kötelező.',
    generalError: 'Hiba történt az értesítések feldolgozása során',
    generalErrorAdditional: 'Nem sikerült globális értesítést küldeni',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'Eszköz azonosító kötelező',
    languageMandatory: 'Nyelv megadása kötelező',
    deviceIdentified: 'Az eszköze sikeresen azonosítva',
    generalError: 'Hiba történt az eszköz próbaidőszakának ellenőrzése során',
  },

  getUserNotification: {
    generalError: 'Nem sikerült lekérni a felhasználói értesítéseket',
    generalErrorAdditional:
      'Hiba történt a felhasználói értesítések lekérése során',
  },

  getScanCategories: {
    noCategoryFound: 'Nem találhatók kategóriák',
    generalError: 'Hiba történt a szkennelési kategóriák lekérése során',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Szkennelési kategóriák sikeresen feltöltve',
    generalError: 'Nem sikerült feltölteni a szkennelési kategóriákat',
  },

  sendUserNotification: {
    noTokenFound:
      'Nem találhatók érvényes Expo tokenek. Nem lehet értesítéseket küldeni',
    generalError: 'Nem sikerült elküldeni az értesítést',
  },

  updateUser: {
    successUpdatedUser: 'Felhasználó sikeresen frissítve',
    updateUserError:
      'Nem sikerült frissíteni a felhasználói rekordot. Kérjük, próbálja újra.',
  },

  loginUserAnonymously: {
    mandatoryUsername: 'Válasszon becenevet és kezdjük!',
    userLoggedIn: 'Üdv újra! Bejelentkezve.',
    accountCreated: 'Bejelentkezve! Élvezze a felfedezést!',
    error:
      'Hoppá! Valami hiba történt. Kérjük, ellenőrizze kapcsolatát és próbálja újra.',
  },
  continueConversation: {
    messagesLimit:
      'Aria teljes kapacitáson van! Töltsön fel egy újabb szkennelést további elemzések és betekintések érdekében',
    conversationNotFound: 'Nem található a beszélgetés',
    serviceIssueAi:
      'Úgy tűnik, probléma van az AI szolgáltatással. Kérjük, próbálja újra.',
    noResponseAiService:
      'Nem sikerült érvényes választ kapni az AI szolgáltatástól. Kérjük, próbálja újra',
  },
};

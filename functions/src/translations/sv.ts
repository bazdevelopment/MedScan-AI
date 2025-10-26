import { ITranslation } from './types';

export const sv: ITranslation = {
  common: {
    welcome: 'Välkommen',
    error: 'Ett fel uppstod',
    loading: 'Laddar...',
    noUserFound:
      'Du är inte behörig att göra denna förfrågan. Var god logga in',
    userIdMissing:
      'Det verkar som att användar-ID saknas. Var god ange det för att fortsätta',
    scanLimitReached:
      'Du har nått det maximala antalet tillåtna skanningar. Var god uppgradera ditt abonnemang för att fortsätta använda tjänsten',
    mandatoryLanguage: 'Språkkoden är obligatorisk',
  },
  auth: {
    signIn: 'Logga in',
    signUp: 'Registrera dig',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'Var god ange din e-postadress för att fortsätta',
    invalidEmail:
      'Den angivna e-postadressen är ogiltig. Var god verifiera den och försök igen',
    accountCreated:
      'Ditt konto har skapats framgångsrikt! Var god kolla din e-post för verifieringskoden',
    verificationCodeSent:
      'Vi har skickat en verifieringskod till din e-post. Var god kolla din inkorg',
    internalError:
      'Det uppstod ett fel vid autentisering via e-post. Var god försök igen',
  },

  sendEmailVerification: {
    emailMandatory: 'En e-postadress krävs för att fortsätta',
    emailUsed: 'Denna e-postadress används redan. Var god använd en annan',
    userNotFound:
      'Vi kunde inte hitta den angivna användaren. Var god kontrollera dina uppgifter och försök igen',
    verificationCodeSent: 'Verifieringskoden har skickats till din e-post',
    generalError: 'Ett fel uppstod vid start av e-postverifiering',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'Startdatum och slutdatum krävs.',
    startDatePriority: 'Startdatumet kan inte vara efter slutdatumet.',
    generalError: 'Kunde inte hämta analyser.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory: 'En autentiseringskod är obligatorisk för att fortsätta',
    emailAddressMandatory: 'E-postadress är obligatorisk för att fortsätta',
    userNotFound:
      'Den angivna användaren kunde inte hittas. Var god kontrollera dina uppgifter och försök igen',
    invalidAuthCode:
      'Oj! Detta är inte en giltig autentiseringskod. Var god kontrollera och försök igen!',
    authCodeExpired:
      "Oj! Din kod har utgått. Var god försök logga in igen med din e-postadress eller klicka på 'Skicka kod igen'",
    authCodeVerified: 'Användaren har verifierats framgångsrikt',
    generalError: 'Oj! Vi stötte på ett fel vid verifiering av din kod',
  },

  analyzeImage: {
    scanLimitReached:
      'Du har nått det maximala antalet tillåtna skanningar. Var god uppgradera ditt abonnemang för att fortsätta använda tjänsten',
    imageMissing:
      'Bild saknas. Var god välj och ladda upp en bild för att fortsätta',
    uploadImageStorageError:
      'Vi stötte på ett fel vid uppladdning av din bild. Var god kontrollera din anslutning och försök igen',
    interpretationNotSaved:
      'Kunde inte spara analysresultatet. Var god kontrollera din anslutning och försök igen',
    analysisCompleted: 'Bildanalys slutförd framgångsrikt!',
  },
  analyzeVideo: {
    noVideoFound:
      'Videofil saknas. Var god välj och ladda upp en video för att fortsätta',
    uploadVideoStorageError:
      'Vi stötte på ett fel vid uppladdning av din video. Var god kontrollera din anslutning och försök igen',
    interpretationNotSaved:
      'Kunde inte spara analysresultatet. Var god kontrollera din anslutning och försök igen',
    analysisCompleted: 'Videoanalys slutförd framgångsrikt!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'Ytterligare en skanning har använts',
    generalError: 'Kunde inte minska antalet skanningar!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'En skanning har minskats',
    decrementErrorScan:
      'Det uppstod ett problem vid uppdatering av antalet skanningar. Var god försök igen senare',
    generalError: 'Kunde inte minska antalet skanningar!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Prenumerera framgångsrikt!',
    updateSubscriptionError: 'Kunde inte uppdatera användarprenumerationen!',
  },
  updateUserLanguage: {
    updateSuccess: 'Språket har uppdaterats framgångsrikt!',
    updateError:
      'Ett oväntat fel uppstod vid uppdatering av språket. Var god försök igen senare',
  },

  getUserInfo: {
    successGetInfo: 'Hämtade userInfo-data framgångsrikt',
    errorGetInfo:
      'Ett oväntat fel uppstod vid hämtning av användarinformation. Var god försök igen senare',
  },
  getUserInfoById: {
    noUserInfoData: 'Användardokumentet finns, men ingen data är tillgänglig',
    getUserFetchError: 'Ett fel uppstod vid hämtning av användarinformationen',
  },

  updateScanInterpretation: {
    success: 'Skanningstolkningspost uppdaterad framgångsrikt!',
    generalError: 'Ett fel uppstod vid uppdatering av skanningstolkningen',
    paramsRequired: "'documentId' och 'fieldsToUpdate' krävs båda",
  },
  deleteScanInterpretation: {
    success: 'Rapporten har raderats framgångsrikt!',
    documentIdRequired: "'DocumentId' krävs för att fortsätta.",
    generalError:
      'Något gick fel vid radering av rapporten. Var god försök igen.',
  },

  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' krävs",
    noDocIdFound: 'Inget dokument hittades med det angivna id:t',
    success: 'Dokument hämtat framgångsrikt',
    generalError:
      'Ett fel uppstod vid hämtning av tolkningen för det angivna dokument-id:t',
  },

  getRecentInterpretation: {
    limitRequired: 'Gränsen måste vara ett nummer mellan 1 och 100',
    noInterpretationFound: 'Inga tolkningar hittades',
    success: 'Senaste tolkningar hämtade framgångsrikt!',
    generalError: 'Ett fel uppstod vid hämtning av senaste tolkningar',
    generalErrorAdditional: 'Ett internt serverfel uppstod',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Att tillhandahålla en enhetstoken är obligatoriskt.',
    generalError: 'Fel vid lagring av enhetstoken',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Aviseringstitel och brödtext är obligatoriska.',
    generalError: 'Ett fel uppstod vid behandling av aviseringar',
    generalErrorAdditional: 'Kunde inte skicka global avisering',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'Enhets-ID är obligatoriskt',
    languageMandatory: 'Språk är obligatoriskt',
    deviceIdentified: 'Din enhet har identifierats framgångsrikt',
    generalError: 'Ett fel uppstod vid kontroll av enhetens provperiod',
  },

  getUserNotification: {
    generalError: 'Kunde inte hämta användaraviseringar',
    generalErrorAdditional:
      'Ett fel uppstod vid hämtning av användaraviseringar',
  },

  getScanCategories: {
    noCategoryFound: 'Inga kategorier hittades',
    generalError: 'Ett fel uppstod vid hämtning av skanningskategorier',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Skanningskategorier uppladdade framgångsrikt',
    generalError: 'Kunde inte ladda upp skanningskategorier',
  },

  sendUserNotification: {
    noTokenFound:
      'Inga giltiga Expo-tokens hittades. Kan inte skicka aviseringar',
    generalError: 'Kunde inte skicka avisering',
  },

  updateUser: {
    successUpdatedUser: 'Användaren uppdaterad framgångsrikt',
    updateUserError:
      'Kunde inte uppdatera användarposten. Var god försök igen.',
  },

  loginUserAnonymously: {
    mandatoryUsername: 'Välj ett smeknamn och låt oss komma igång!',
    userLoggedIn: 'Välkommen tillbaka! Du är inloggad.',
    accountCreated: 'Du är inloggad! Njut av att utforska!',
    error:
      'Oj! Något gick fel. Var god kontrollera din anslutning och försök igen.',
  },
  continueConversation: {
    messagesLimit:
      'Aria är på full kapacitet! Ladda upp ytterligare en skanning för att fortsätta få analyser och insikter',
    conversationNotFound: 'Kan inte hitta konversationen',
    serviceIssueAi:
      'Det verkar vara ett problem med AI-tjänsten. Var god försök igen.',
    noResponseAiService:
      'Kunde inte få ett giltigt svar från AI-tjänsten. Var god försök igen',
  },
};

import { ITranslation } from './types';

export const nl: ITranslation = {
  common: {
    welcome: 'Welkom',
    error: 'Er is een fout opgetreden',
    loading: 'Laden...',
    noUserFound:
      'U bent niet gemachtigd om dit verzoek te doen. Log alstublieft in',
    userIdMissing:
      'Het lijkt erop dat het gebruikers-ID ontbreekt. Geef dit op om door te gaan',
    scanLimitReached:
      'U heeft het maximaal toegestane aantal scans bereikt. Upgrade uw abonnement om de service te blijven gebruiken',
    mandatoryLanguage: 'De taalcode is verplicht',
  },
  auth: {
    signIn: 'Inloggen',
    signUp: 'Registreren',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'Geef uw e-mailadres op om door te gaan',
    invalidEmail:
      'Het ingevoerde e-mailadres is ongeldig. Controleer het en probeer het opnieuw',
    accountCreated:
      'Uw account is succesvol aangemaakt! Controleer uw e-mail voor de verificatiecode',
    verificationCodeSent:
      'We hebben een verificatiecode naar uw e-mail gestuurd. Controleer uw inbox',
    internalError:
      'Er is een fout opgetreden bij de authenticatie via e-mail. Probeer het opnieuw',
  },

  sendEmailVerification: {
    emailMandatory: 'Een e-mailadres is verplicht om door te gaan',
    emailUsed:
      'Dit e-mailadres wordt al gebruikt. Gebruik alstublieft een ander adres',
    userNotFound:
      'We konden de opgegeven gebruiker niet vinden. Controleer uw gegevens en probeer het opnieuw',
    verificationCodeSent:
      'De verificatiecode is succesvol naar uw e-mail verzonden',
    generalError:
      'Er is een fout opgetreden bij het starten van e-mailverificatie',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'Startdatum en einddatum zijn verplicht.',
    startDatePriority: 'De startdatum kan niet na de einddatum liggen.',
    generalError: 'Kan analyses niet ophalen.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory: 'Een authenticatiecode is verplicht om door te gaan',
    emailAddressMandatory: 'E-mailadres is verplicht om door te gaan',
    userNotFound:
      'De opgegeven gebruiker kon niet worden gevonden. Controleer uw gegevens en probeer het opnieuw',
    invalidAuthCode:
      'Oeps! Dit is geen geldige authenticatiecode. Controleer en probeer het opnieuw!',
    authCodeExpired:
      "Oeps! Uw code is verlopen. Probeer opnieuw in te loggen met uw e-mailadres of klik op 'Code opnieuw verzenden'",
    authCodeVerified: 'De gebruiker is succesvol geverifieerd',
    generalError:
      'Oeps! We hebben een fout tegengekomen bij het verifiëren van uw code',
  },

  analyzeImage: {
    scanLimitReached:
      'U heeft het maximaal toegestane aantal scans bereikt. Upgrade uw abonnement om de service te blijven gebruiken',
    imageMissing:
      'Afbeelding ontbreekt. Selecteer en upload een afbeelding om door te gaan',
    uploadImageStorageError:
      'We hebben een fout tegengekomen bij het uploaden van uw afbeelding. Controleer uw verbinding en probeer het opnieuw',
    interpretationNotSaved:
      'Kan het analyseresultaat niet opslaan. Controleer uw verbinding en probeer het opnieuw',
    analysisCompleted: 'Beeldanalyse succesvol voltooid!',
  },
  analyzeVideo: {
    noVideoFound:
      'Videobestand ontbreekt. Selecteer en upload een video om door te gaan',
    uploadVideoStorageError:
      'We hebben een fout tegengekomen bij het uploaden van uw video. Controleer uw verbinding en probeer het opnieuw',
    interpretationNotSaved:
      'Kan het analyseresultaat niet opslaan. Controleer uw verbinding en probeer het opnieuw',
    analysisCompleted: 'Video-analyse succesvol voltooid!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'Er is nog een scan gebruikt',
    generalError: 'Kan het aantal scans niet verminderen!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Eén scan is verminderd',
    decrementErrorScan:
      'Er was een probleem bij het bijwerken van het aantal scans. Probeer het later opnieuw',
    generalError: 'Kan het aantal scans niet verminderen!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Succesvol geabonneerd!',
    updateSubscriptionError: 'Kan gebruikersabonnement niet bijwerken!',
  },
  updateUserLanguage: {
    updateSuccess: 'Taal succesvol bijgewerkt!',
    updateError:
      'Er is een onverwachte fout opgetreden bij het bijwerken van de taal. Probeer het later opnieuw',
  },

  getUserInfo: {
    successGetInfo: 'UserInfo-gegevens succesvol opgehaald',
    errorGetInfo:
      'Er is een onverwachte fout opgetreden bij het ophalen van gebruikersinformatie. Probeer het later opnieuw',
  },
  getUserInfoById: {
    noUserInfoData:
      'Het gebruikersdocument bestaat, maar er zijn geen gegevens beschikbaar',
    getUserFetchError:
      'Er is een fout opgetreden bij het ophalen van de gebruikersinformatie',
  },

  updateScanInterpretation: {
    success: 'Scaninterpretatierecord succesvol bijgewerkt!',
    generalError:
      'Er is een fout opgetreden bij het bijwerken van de scaninterpretatie',
    paramsRequired: "'documentId' en 'fieldsToUpdate' zijn beide verplicht",
  },
  deleteScanInterpretation: {
    success: 'Het rapport is succesvol verwijderd!',
    documentIdRequired: "'DocumentId' is verplicht om door te gaan.",
    generalError:
      'Er is iets misgegaan bij het verwijderen van het rapport. Probeer het opnieuw.',
  },

  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' is verplicht",
    noDocIdFound: 'Er is geen document gevonden met de opgegeven ID',
    success: 'Document succesvol opgehaald',
    generalError:
      'Er is een fout opgetreden bij het ophalen van de interpretatie voor de opgegeven document-ID',
  },

  getRecentInterpretation: {
    limitRequired: 'De limiet moet een getal tussen 1 en 100 zijn',
    noInterpretationFound: 'Geen interpretaties gevonden',
    success: 'Recente interpretaties succesvol opgehaald!',
    generalError:
      'Er is een fout opgetreden bij het ophalen van recente interpretaties',
    generalErrorAdditional: 'Er is een interne serverfout opgetreden',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Het verstrekken van een apparaattoken is verplicht.',
    generalError: 'Fout bij opslaan apparaattoken',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Meldings titel en inhoud zijn verplicht.',
    generalError: 'Er is een fout opgetreden bij het verwerken van meldingen',
    generalErrorAdditional: 'Kan globale melding niet verzenden',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'Apparaat-ID is verplicht',
    languageMandatory: 'Taal is verplicht',
    deviceIdentified: 'Uw apparaat is succesvol geïdentificeerd',
    generalError:
      'Er is een fout opgetreden bij het controleren van apparaatproefversie',
  },

  getUserNotification: {
    generalError: 'Kan gebruikersmeldingen niet ophalen',
    generalErrorAdditional:
      'Er is een fout opgetreden bij het ophalen van gebruikersmeldingen',
  },

  getScanCategories: {
    noCategoryFound: 'Geen categorieën gevonden',
    generalError:
      'Er is een fout opgetreden bij het ophalen van scancategorieën',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Scancategorieën succesvol geüpload',
    generalError: 'Kan scancategorieën niet uploaden',
  },

  sendUserNotification: {
    noTokenFound:
      'Geen geldige Expo-tokens gevonden. Kan geen meldingen verzenden',
    generalError: 'Kan melding niet verzenden',
  },

  updateUser: {
    successUpdatedUser: 'Gebruiker succesvol bijgewerkt',
    updateUserError:
      'Kan gebruikersrecord niet bijwerken. Probeer het opnieuw.',
  },

  loginUserAnonymously: {
    mandatoryUsername: 'Kies een bijnaam en laten we beginnen!',
    userLoggedIn: 'Welkom terug! U bent ingelogd.',
    accountCreated: 'U bent ingelogd! Veel plezier met verkennen!',
    error:
      'Oeps! Er is iets misgegaan. Controleer uw verbinding en probeer het opnieuw.',
  },
  continueConversation: {
    messagesLimit:
      'Aria zit op volle capaciteit! Upload nog een scan om analyses en inzichten te blijven ontvangen',
    conversationNotFound: 'Kan gesprek niet vinden',
    serviceIssueAi:
      'Er lijkt een probleem te zijn met de AI-service. Probeer het opnieuw.',
    noResponseAiService:
      'Kon geen geldig antwoord krijgen van de AI-service. Probeer het opnieuw',
  },
};

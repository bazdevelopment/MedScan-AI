import { ITranslation } from './types';

export const no: ITranslation = {
  common: {
    welcome: 'Velkommen',
    error: 'En feil oppstod',
    loading: 'Laster...',
    noUserFound:
      'Du er ikke autorisert til å gjøre denne forespørselen. Vennligst logg inn',
    userIdMissing:
      'Det ser ut til at bruker-ID mangler. Vennligst oppgi den for å fortsette',
    scanLimitReached:
      'Du har nådd maksimalt antall tillatte skanninger. Vennligst oppgrader abonnementet ditt for å fortsette å bruke tjenesten',
    mandatoryLanguage: 'Språkkode er påkrevd',
  },
  auth: {
    signIn: 'Logg inn',
    signUp: 'Registrer deg',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'Vennligst oppgi e-postadressen din for å fortsette',
    invalidEmail:
      'E-postadressen du skrev inn er ugyldig. Vennligst bekreft den og prøv på nytt',
    accountCreated:
      'Kontoen din har blitt opprettet! Vennligst sjekk e-posten din for bekreftelseskoden',
    verificationCodeSent:
      'Vi har sendt en bekreftelseskode til e-posten din. Vennligst sjekk innboksen din',
    internalError:
      'Det oppstod en feil under behandling av autentiseringen din via e-post. Vennligst prøv på nytt',
  },

  sendEmailVerification: {
    emailMandatory: 'En e-postadresse er påkrevd for å fortsette',
    emailUsed:
      'Denne e-postadressen er allerede i bruk. Vennligst bruk en annen',
    userNotFound:
      'Vi kunne ikke finne den angitte brukeren. Vennligst sjekk detaljene dine og prøv på nytt',
    verificationCodeSent: 'Bekreftelseskoden har blitt sendt til e-posten din',
    generalError: 'Det oppstod en feil under oppstart av e-postbekreftelse',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'Startdato og sluttdato er påkrevd.',
    startDatePriority: 'Startdatoen kan ikke være etter sluttdatoen.',
    generalError: 'Kan ikke hente analyser.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory: 'En autentiseringskode er påkrevd for å fortsette',
    emailAddressMandatory: 'E-postadresse er påkrevd for å fortsette',
    userNotFound:
      'Den angitte brukeren kunne ikke finnes. Vennligst sjekk detaljene dine og prøv på nytt',
    invalidAuthCode:
      'Oisann! Dette er ikke en gyldig autentiseringskode. Vennligst sjekk og prøv på nytt!',
    authCodeExpired:
      "Oisann! Koden din har utløpt. Vennligst prøv å logge inn på nytt med e-postadressen din eller klikk på 'Send kode på nytt'",
    authCodeVerified: 'Brukeren har blitt bekreftet',
    generalError: 'Oisann! Vi oppdaget en feil under bekreftelse av koden din',
  },

  analyzeImage: {
    scanLimitReached:
      'Du har nådd maksimalt antall tillatte skanninger. Vennligst oppgrader abonnementet ditt for å fortsette å bruke tjenesten',
    imageMissing:
      'Bilde mangler. Vennligst velg og last opp et bilde for å fortsette',
    uploadImageStorageError:
      'Vi oppdaget en feil under opplasting av bildet ditt. Vennligst sjekk tilkoblingen din og prøv på nytt',
    interpretationNotSaved:
      'Kan ikke lagre analyseresultatet. Vennligst sjekk tilkoblingen din og prøv på nytt',
    analysisCompleted: 'Bildeanalyse fullført!',
  },
  analyzeVideo: {
    noVideoFound:
      'Videofil mangler. Vennligst velg og last opp en video for å fortsette',
    uploadVideoStorageError:
      'Vi oppdaget en feil under opplasting av videoen din. Vennligst sjekk tilkoblingen din og prøv på nytt',
    interpretationNotSaved:
      'Kan ikke lagre analyseresultatet. Vennligst sjekk tilkoblingen din og prøv på nytt',
    analysisCompleted: 'Videoanalyse fullført!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'Én skanning til er brukt',
    generalError: 'Kan ikke øke antall skanninger!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Én skanning er redusert',
    decrementErrorScan:
      'Det oppstod et problem med oppdatering av antall skanninger. Vennligst prøv igjen senere',
    generalError: 'Kan ikke redusere antall skanninger!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Vellykket abonnement!',
    updateSubscriptionError: 'Kan ikke oppdatere brukerabonnement!',
  },
  updateUserLanguage: {
    updateSuccess: 'Språk oppdatert!',
    updateError:
      'En uventet feil oppstod under oppdatering av språk. Vennligst prøv igjen senere',
  },

  getUserInfo: {
    successGetInfo: 'Brukerinformasjon hentet',
    errorGetInfo:
      'En uventet feil oppstod under henting av brukerinformasjon. Vennligst prøv igjen senere',
  },
  getUserInfoById: {
    noUserInfoData:
      'Brukerdokumentet eksisterer, men ingen data er tilgjengelig',
    getUserFetchError: 'En feil oppstod under henting av brukerinformasjon',
  },

  updateScanInterpretation: {
    success: 'Skanningtolkning oppdatert!',
    generalError: 'En feil oppstod under oppdatering av skanningtolkning',
    paramsRequired: "Både 'documentId' og 'fieldsToUpdate' er påkrevd",
  },
  deleteScanInterpretation: {
    success: 'Rapporten er slettet!',
    documentIdRequired: "'DocumentId' er påkrevd for å fortsette.",
    generalError:
      'Noe gikk galt under sletting av rapporten. Vennligst prøv på nytt.',
  },

  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' er påkrevd",
    noDocIdFound: 'Ingen dokument funnet med den oppgitte ID-en',
    success: 'Dokument hentet',
    generalError:
      'En feil oppstod under henting av tolkning for den oppgitte dokument-ID-en',
  },

  getRecentInterpretation: {
    limitRequired: 'Grensen må være et tall mellom 1 og 100',
    noInterpretationFound: 'Ingen tolkninger funnet',
    success: 'Nylige tolkninger hentet!',
    generalError: 'En feil oppstod under henting av nylige tolkninger',
    generalErrorAdditional: 'En intern serverfeil oppstod',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Å oppgi en enhetstoken er obligatorisk.',
    generalError: 'Feil under lagring av enhetstoken',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Varslingstittel og -innhold er obligatorisk.',
    generalError: 'En feil oppstod under behandling av varsler',
    generalErrorAdditional: 'Kunne ikke sende globalt varsel',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'Enhets-ID er obligatorisk',
    languageMandatory: 'Språk er obligatorisk',
    deviceIdentified: 'Enheten din er identifisert',
    generalError: 'En feil oppstod under sjekk av enhetens prøveperiode',
  },

  getUserNotification: {
    generalError: 'Kunne ikke hente brukervarsler',
    generalErrorAdditional: 'En feil oppstod under henting av brukervarsler',
  },

  getScanCategories: {
    noCategoryFound: 'Ingen kategorier funnet',
    generalError: 'En feil oppstod under henting av skanningskategorier',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Skanningskategorier lastet opp',
    generalError: 'Kunne ikke laste opp skanningskategorier',
  },

  sendUserNotification: {
    noTokenFound: 'Ingen gyldige Expo-tokens funnet. Kan ikke sende varsler',
    generalError: 'Kunne ikke sende varsel',
  },

  updateUser: {
    successUpdatedUser: 'Bruker oppdatert',
    updateUserError: 'Kan ikke oppdatere brukerposten. Vennligst prøv på nytt.',
  },

  loginUserAnonymously: {
    mandatoryUsername: 'Velg et kallenavn og la oss komme i gang!',
    userLoggedIn: 'Velkommen tilbake! Du er logget inn.',
    accountCreated: 'Du er logget inn! Nyt utforskningen!',
    error:
      'Oisann! Noe gikk galt. Vennligst sjekk tilkoblingen din og prøv på nytt.',
  },
  continueConversation: {
    messagesLimit:
      'Aria er på full kapasitet! Last opp en ny skanning for å fortsette å motta analyser og innsikt',
    conversationNotFound: 'Kan ikke finne samtalen',
    serviceIssueAi:
      'Det ser ut til å være et problem med AI-tjenesten. Vennligst prøv på nytt.',
    noResponseAiService:
      'Kunne ikke få et gyldig svar fra AI-tjenesten. Vennligst prøv på nytt',
  },
};

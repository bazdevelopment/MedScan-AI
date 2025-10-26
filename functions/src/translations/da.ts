import { ITranslation } from './types';

export const da: ITranslation = {
  common: {
    welcome: 'Velkommen',
    error: 'Der opstod en fejl',
    loading: 'Indlæser...',
    noUserFound:
      'Du er ikke autoriseret til at foretage denne anmodning. Venligst log ind',
    userIdMissing:
      'Det ser ud til at bruger-id mangler. Venligst angiv det for at fortsætte',
    scanLimitReached:
      'Du har nået det maksimale antal tilladte scanninger. Venligst opgrader din plan for at fortsætte med at bruge tjenesten',
    mandatoryLanguage: 'Sprogkoden er påkrævet',
  },
  auth: {
    signIn: 'Log ind',
    signUp: 'Tilmeld dig',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'Venligst angiv din e-mailadresse for at fortsætte',
    invalidEmail:
      'Den indtastede e-mailadresse er ugyldig. Venligst verificer den og prøv igen',
    accountCreated:
      'Din konto er blevet oprettet succesfuldt! Venligst tjek din e-mail for verifikationskoden',
    verificationCodeSent:
      'Vi har sendt en verifikationskode til din e-mail. Venligst tjek din indbakke',
    internalError:
      'Der opstod en fejl under behandling af din godkendelse via e-mail. Venligst prøv igen',
  },

  sendEmailVerification: {
    emailMandatory: 'En e-mailadresse er påkrævet for at fortsætte',
    emailUsed: 'Denne e-mailadresse er allerede i brug. Venligst brug en anden',
    userNotFound:
      'Vi kunne ikke finde den specificerede bruger. Venligst tjek dine oplysninger og prøv igen',
    verificationCodeSent:
      'Verifikationskoden er blevet sendt succesfuldt til din e-mail',
    generalError: 'Der opstod en fejl under start af e-mailverifikation',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'Startdato og slutdato er påkrævet.',
    startDatePriority: 'Startdatoen kan ikke være efter slutdatoen.',
    generalError: 'Kan ikke hente analyser.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory: 'En godkendelseskode er påkrævet for at fortsætte',
    emailAddressMandatory: 'E-mailadresse er påkrævet for at fortsætte',
    userNotFound:
      'Den specificerede bruger kunne ikke findes. Venligst tjek dine oplysninger og prøv igen',
    invalidAuthCode:
      'Ups! Dette er ikke en gyldig godkendelseskode. Venligst tjek og prøv igen!',
    authCodeExpired:
      "Ups! Din kode er udløbet. Venligst prøv at logge ind igen med din e-mailadresse eller klik på 'Gensend kode'",
    authCodeVerified: 'Brugeren er blevet verificeret succesfuldt',
    generalError: 'Ups! Vi stødte på en fejl under verifikation af din kode',
  },

  analyzeImage: {
    scanLimitReached:
      'Du har nået det maksimale antal tilladte scanninger. Venligst opgrader din plan for at fortsætte med at bruge tjenesten',
    imageMissing:
      'Billede mangler. Venligst vælg og upload et billede for at fortsætte',
    uploadImageStorageError:
      'Vi stødte på en fejl under upload af dit billede. Venligst tjek din forbindelse og prøv igen',
    interpretationNotSaved:
      'Kan ikke gemme analyseresultatet. Venligst tjek din forbindelse og prøv igen',
    analysisCompleted: 'Billedanalyse gennemført succesfuldt!',
  },
  analyzeVideo: {
    noVideoFound:
      'Videofil mangler. Venligst vælg og upload en video for at fortsætte',
    uploadVideoStorageError:
      'Vi stødte på en fejl under upload af din video. Venligst tjek din forbindelse og prøv igen',
    interpretationNotSaved:
      'Kan ikke gemme analyseresultatet. Venligst tjek din forbindelse og prøv igen',
    analysisCompleted: 'Videoanalyse gennemført succesfuldt!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'Endnu en scanning er blevet brugt',
    generalError: 'Kan ikke øge antallet af scanninger!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'En scanning er blevet trukket fra',
    decrementErrorScan:
      'Der var et problem med at opdatere antallet af scanninger. Venligst prøv igen senere',
    generalError: 'Kan ikke reducere antallet af scanninger!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Succesfuldt abonneret!',
    updateSubscriptionError: 'Kan ikke opdatere brugerabonnement!',
  },
  updateUserLanguage: {
    updateSuccess: 'Sprog succesfuldt opdateret!',
    updateError:
      'Der opstod en uventet fejl under opdatering af sproget. Venligst prøv igen senere',
  },

  getUserInfo: {
    successGetInfo: 'Brugerinfo data hentet succesfuldt',
    errorGetInfo:
      'Der opstod en uventet fejl under hentning af brugerinformation. Venligst prøv igen senere',
  },
  getUserInfoById: {
    noUserInfoData:
      'Brugerdokumentet eksisterer, men der er ingen data tilgængelige',
    getUserFetchError: 'Der opstod en fejl under hentning af brugerinformation',
  },

  updateScanInterpretation: {
    success: 'Scanning fortolkning post opdateret succesfuldt!',
    generalError:
      'Der opstod en fejl under opdatering af scanning fortolkningen',
    paramsRequired: "'documentId' og 'fieldsToUpdate' er begge påkrævet",
  },
  deleteScanInterpretation: {
    success: 'Rapporten er blevet slettet succesfuldt!',
    documentIdRequired: "'DocumentId' er påkrævet for at fortsætte.",
    generalError:
      'Noget gik galt under sletning af rapporten. Venligst prøv igen.',
  },

  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' er påkrævet",
    noDocIdFound: 'Ingen dokument blev fundet med den angivne id',
    success: 'Dokument hentet succesfuldt',
    generalError:
      'Der opstod en fejl under hentning af fortolkningen for den angivne dokument id',
  },

  getRecentInterpretation: {
    limitRequired: 'Grænsen skal være et tal mellem 1 og 100',
    noInterpretationFound: 'Ingen fortolkninger fundet',
    success: 'Seneste fortolkninger hentet succesfuldt!',
    generalError: 'Der opstod en fejl under hentning af seneste fortolkninger',
    generalErrorAdditional: 'Der opstod en intern serverfejl',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Angivelse af en enhedstoken er obligatorisk.',
    generalError: 'Fejl under lagring af enhedstoken',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Notifikationstitel og brødtekst er obligatoriske.',
    generalError: 'Der opstod en fejl under behandling af notifikationer',
    generalErrorAdditional: 'Kunne ikke sende global notifikation',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'Enheds-ID er obligatorisk',
    languageMandatory: 'Sprog er obligatorisk',
    deviceIdentified: 'Din enhed er blevet identificeret succesfuldt',
    generalError: 'Der opstod en fejl under kontrol af enhedens prøveperiode',
  },

  getUserNotification: {
    generalError: 'Kunne ikke hente brugernotifikationer',
    generalErrorAdditional:
      'Der opstod en fejl under hentning af brugernotifikationer',
  },

  getScanCategories: {
    noCategoryFound: 'Ingen kategorier fundet',
    generalError: 'Der opstod en fejl under hentning af scanning kategorier',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Scanning kategorier uploadet succesfuldt',
    generalError: 'Kunne ikke uploade scanning kategorier',
  },

  sendUserNotification: {
    noTokenFound:
      'Ingen gyldige Expo tokens fundet. Kan ikke sende notifikationer',
    generalError: 'Kunne ikke sende notifikation',
  },

  updateUser: {
    successUpdatedUser: 'Bruger opdateret succesfuldt',
    updateUserError: 'Kan ikke opdatere brugerposten. Venligst prøv igen.',
  },

  loginUserAnonymously: {
    mandatoryUsername: 'Vælg et kaldenavn og lad os komme i gang!',
    userLoggedIn: 'Velkommen tilbage! Du er logget ind.',
    accountCreated: 'Du er logget ind! Nyd at udforske!',
    error: 'Ups! Noget gik galt. Venligst tjek din forbindelse og prøv igen.',
  },
  continueConversation: {
    messagesLimit:
      'Aria er på fuld kapacitet! Upload endnu en scanning for at fortsætte med at få analyser og indsigter',
    conversationNotFound: 'Kan ikke finde samtalen',
    serviceIssueAi:
      'Der ser ud til at være et problem med AI-tjenesten. Venligst prøv igen.',
    noResponseAiService:
      'Kunne ikke få et gyldigt svar fra AI-tjenesten. Venligst prøv igen',
  },
};

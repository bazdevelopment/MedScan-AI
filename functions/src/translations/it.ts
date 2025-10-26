import { ITranslation } from './types';

export const it: ITranslation = {
  common: {
    welcome: 'Benvenuto',
    error: 'Si è verificato un errore',
    loading: 'Caricamento...',
    noUserFound:
      'Non sei autorizzato a effettuare questa richiesta. Per favore accedi',
    userIdMissing:
      "Sembra che manchi l'ID utente. Per favore forniscilo per procedere",
    scanLimitReached:
      'Hai raggiunto il numero massimo di scansioni consentite. Per favore aggiorna il tuo piano per continuare a utilizzare il servizio',
    mandatoryLanguage: 'Il codice lingua è obbligatorio',
  },
  auth: {
    signIn: 'Accedi',
    signUp: 'Registrati',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'Per favore fornisci il tuo indirizzo email per procedere',
    invalidEmail:
      "L'indirizzo email inserito non è valido. Per favore verificalo e riprova",
    accountCreated:
      'Il tuo account è stato creato con successo! Per favore controlla la tua email per il codice di verifica',
    verificationCodeSent:
      'Abbiamo inviato un codice di verifica al tuo indirizzo email. Per favore controlla la tua casella di posta',
    internalError:
      "Si è verificato un errore durante l'elaborazione della tua autenticazione tramite email. Per favore riprova",
  },

  sendEmailVerification: {
    emailMandatory: 'È richiesto un indirizzo email per procedere',
    emailUsed:
      'Questo indirizzo email è già in uso. Per favore utilizzane un altro',
    userNotFound:
      "Non siamo riusciti a trovare l'utente specificato. Per favore controlla i tuoi dati e riprova",
    verificationCodeSent:
      'Il codice di verifica è stato inviato con successo alla tua email',
    generalError:
      "Si è verificato un errore durante l'avvio della verifica email",
  },

  getInterpretationByDate: {
    startEndDateRequired:
      'La data di inizio e la data di fine sono obbligatorie.',
    startDatePriority:
      'La data di inizio non può essere successiva alla data di fine.',
    generalError: 'Impossibile recuperare le analisi.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory:
      'Un codice di autenticazione è obbligatorio per continuare',
    emailAddressMandatory: "L'indirizzo email è obbligatorio per continuare",
    userNotFound:
      "L'utente specificato non è stato trovato. Per favore controlla i tuoi dati e riprova",
    invalidAuthCode:
      'Ops! Questo non è un codice di autenticazione valido. Per favore controlla e riprova!',
    authCodeExpired:
      "Ops! Il tuo codice è scaduto. Per favore ritenta l'accesso con il tuo indirizzo email o clicca su 'Invia nuovamente il codice'",
    authCodeVerified: "L'utente è stato verificato con successo",
    generalError:
      'Ops! Abbiamo riscontrato un errore durante la verifica del tuo codice',
  },

  analyzeImage: {
    scanLimitReached:
      'Hai raggiunto il numero massimo di scansioni consentite. Per favore aggiorna il tuo piano per continuare a utilizzare il servizio',
    imageMissing:
      "Immagine mancante. Per favore seleziona e carica un'immagine per procedere",
    uploadImageStorageError:
      'Abbiamo riscontrato un errore durante il caricamento della tua immagine. Per favore controlla la tua connessione e riprova',
    interpretationNotSaved:
      "Impossibile salvare il risultato dell'analisi. Per favore controlla la tua connessione e riprova",
    analysisCompleted: "Analisi dell'immagine completata con successo!",
  },
  analyzeVideo: {
    noVideoFound:
      'File video mancante. Per favore seleziona e carica un video per procedere',
    uploadVideoStorageError:
      'Abbiamo riscontrato un errore durante il caricamento del tuo video. Per favore controlla la tua connessione e riprova',
    interpretationNotSaved:
      "Impossibile salvare il risultato dell'analisi. Per favore controlla la tua connessione e riprova",
    analysisCompleted: 'Analisi del video completata con successo!',
  },

  incrementUsersScans: {
    incrementSuccessScan: "Un'altra scansione è stata utilizzata",
    generalError: 'Impossibile incrementare il numero di scansioni!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Una scansione è stata decrementata',
    decrementErrorScan:
      "Si è verificato un problema durante l'aggiornamento del numero di scansioni. Per favore riprova più tardi",
    generalError: 'Impossibile decrementare il numero di scansioni!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Abbonamento effettuato con successo!',
    updateSubscriptionError:
      "Impossibile aggiornare l'abbonamento dell'utente!",
  },
  updateUserLanguage: {
    updateSuccess: 'Lingua aggiornata con successo!',
    updateError:
      "Si è verificato un errore imprevisto durante l'aggiornamento della lingua. Per favore riprova più tardi",
  },

  getUserInfo: {
    successGetInfo: 'Dati delle informazioni utente recuperati con successo',
    errorGetInfo:
      'Si è verificato un errore imprevisto durante il recupero delle informazioni utente. Per favore riprova più tardi',
  },
  getUserInfoById: {
    noUserInfoData:
      'Il documento utente esiste, ma non ci sono dati disponibili',
    getUserFetchError:
      'Si è verificato un errore durante il recupero delle informazioni utente',
  },

  updateScanInterpretation: {
    success:
      'Record di interpretazione della scansione aggiornato con successo!',
    generalError:
      "Si è verificato un errore durante l'aggiornamento dell'interpretazione della scansione",
    paramsRequired: "Sono richiesti sia 'documentId' che 'fieldsToUpdate'",
  },
  deleteScanInterpretation: {
    success: 'Il report è stato eliminato con successo!',
    documentIdRequired: "'DocumentId' è richiesto per procedere.",
    generalError:
      "Qualcosa è andato storto durante l'eliminazione del report. Per favore riprova.",
  },

  getInterpretationByDocumentId: {
    paramsRequired: "È richiesto 'DocumentId'",
    noDocIdFound: "Nessun documento trovato con l'ID fornito",
    success: 'Documento recuperato con successo',
    generalError:
      "Si è verificato un errore durante il recupero dell'interpretazione per l'ID documento fornito",
  },

  getRecentInterpretation: {
    limitRequired: 'Il limite deve essere un numero compreso tra 1 e 100',
    noInterpretationFound: 'Nessuna interpretazione trovata',
    success: 'Interpretazioni recenti recuperate con successo!',
    generalError:
      'Si è verificato un errore durante il recupero delle interpretazioni recenti',
    generalErrorAdditional: 'Si è verificato un errore interno del server',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Fornire un token del dispositivo è obbligatorio.',
    generalError: 'Errore durante il salvataggio del token del dispositivo',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Il titolo e il corpo della notifica sono obbligatori.',
    generalError:
      "Si è verificato un errore durante l'elaborazione delle notifiche",
    generalErrorAdditional: 'Impossibile inviare la notifica globale',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: "L'ID del dispositivo è obbligatorio",
    languageMandatory: 'La lingua è obbligatoria',
    deviceIdentified: 'Il tuo dispositivo è stato identificato con successo',
    generalError:
      'Si è verificato un errore durante il controllo del periodo di prova del dispositivo',
  },

  getUserNotification: {
    generalError: "Impossibile recuperare le notifiche dell'utente",
    generalErrorAdditional:
      "Si è verificato un errore durante il recupero delle notifiche dell'utente",
  },

  getScanCategories: {
    noCategoryFound: 'Nessuna categoria trovata',
    generalError:
      'Si è verificato un errore durante il recupero delle categorie di scansione',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Categorie di scansione caricate con successo',
    generalError: 'Impossibile caricare le categorie di scansione',
  },

  sendUserNotification: {
    noTokenFound:
      'Nessun token Expo valido trovato. Impossibile inviare notifiche',
    generalError: 'Impossibile inviare la notifica',
  },

  updateUser: {
    successUpdatedUser: 'Utente aggiornato con successo',
    updateUserError:
      'Impossibile aggiornare il record utente. Per favore riprova.',
  },

  loginUserAnonymously: {
    mandatoryUsername: 'Scegli un nickname e iniziamo!',
    userLoggedIn: 'Bentornato! Sei dentro.',
    accountCreated: "Sei dentro! Goditi l'esplorazione!",
    error:
      'Ops! Qualcosa è andato storto. Per favore controlla la tua connessione e riprova.',
  },
  continueConversation: {
    messagesLimit:
      "Aria è a piena capacità! Carica un'altra scansione per continuare a ricevere analisi e approfondimenti",
    conversationNotFound: 'Impossibile trovare la conversazione',
    serviceIssueAi:
      'Sembra esserci un problema con il servizio AI. Per favore riprova.',
    noResponseAiService:
      'Impossibile ottenere una risposta valida dal servizio AI. Per favore riprova',
  },
};

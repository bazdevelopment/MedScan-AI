import { ITranslation } from './types';

export const de: ITranslation = {
  common: {
    welcome: 'Willkommen',
    error: 'Ein Fehler ist aufgetreten',
    loading: 'Laden...',
    noUserFound:
      'Sie sind nicht berechtigt, diese Anfrage zu stellen. Bitte melden Sie sich an',
    userIdMissing:
      'Es scheint, dass die Benutzer-ID fehlt. Bitte geben Sie sie an, um fortzufahren',
    scanLimitReached:
      'Sie haben die maximale Anzahl erlaubter Scans erreicht. Bitte upgraden Sie Ihren Plan, um den Dienst weiterhin nutzen zu können',
    mandatoryLanguage: 'Der Sprachcode ist erforderlich',
  },
  auth: {
    signIn: 'Anmelden',
    signUp: 'Registrieren',
  },
  loginUserViaEmail: {
    mandatoryEmail: 'Bitte geben Sie Ihre E-Mail-Adresse an, um fortzufahren',
    invalidEmail:
      'Die eingegebene E-Mail-Adresse ist ungültig. Bitte überprüfen Sie sie und versuchen Sie es erneut',
    accountCreated:
      'Ihr Konto wurde erfolgreich erstellt! Bitte überprüfen Sie Ihre E-Mail für den Bestätigungscode',
    verificationCodeSent:
      'Wir haben einen Bestätigungscode an Ihre E-Mail gesendet. Bitte überprüfen Sie Ihren Posteingang',
    internalError:
      'Bei der Verarbeitung Ihrer Authentifizierung per E-Mail ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut',
  },
  sendEmailVerification: {
    emailMandatory: 'Eine E-Mail-Adresse ist erforderlich, um fortzufahren',
    emailUsed:
      'Diese E-Mail-Adresse wird bereits verwendet. Bitte verwenden Sie eine andere',
    userNotFound:
      'Der angegebene Benutzer wurde nicht gefunden. Bitte überprüfen Sie Ihre Angaben und versuchen Sie es erneut',
    verificationCodeSent:
      'Der Bestätigungscode wurde erfolgreich an Ihre E-Mail gesendet',
    generalError:
      'Beim Starten der E-Mail-Verifizierung ist ein Fehler aufgetreten',
  },
  getInterpretationByDate: {
    startEndDateRequired: 'Startdatum und Enddatum sind erforderlich.',
    startDatePriority: 'Das Startdatum darf nicht nach dem Enddatum liegen.',
    generalError: 'Analysen konnten nicht abgerufen werden.',
  },
  verifyAuthenticationCode: {
    authCodeMandatory:
      'Ein Authentifizierungscode ist erforderlich, um fortzufahren',
    emailAddressMandatory:
      'Die E-Mail-Adresse ist erforderlich, um fortzufahren',
    userNotFound:
      'Der angegebene Benutzer wurde nicht gefunden. Bitte überprüfen Sie Ihre Angaben und versuchen Sie es erneut',
    invalidAuthCode:
      'Hoppla! Dies ist kein gültiger Authentifizierungscode. Bitte überprüfen Sie ihn und versuchen Sie es erneut',
    authCodeExpired:
      "Hoppla! Ihr Code ist abgelaufen. Bitte versuchen Sie, sich erneut mit Ihrer E-Mail-Adresse anzumelden oder klicken Sie auf 'Code erneut senden'",
    authCodeVerified: 'Der Benutzer wurde erfolgreich verifiziert',
    generalError:
      'Hoppla! Beim Verifizieren Ihres Codes ist ein Fehler aufgetreten',
  },
  analyzeImage: {
    scanLimitReached:
      'Sie haben die maximale Anzahl erlaubter Scans erreicht. Bitte upgraden Sie Ihren Plan, um den Dienst weiterhin nutzen zu können',
    imageMissing:
      'Bild fehlt. Bitte wählen Sie ein Bild aus und laden Sie es hoch, um fortzufahren',
    uploadImageStorageError:
      'Beim Hochladen Ihres Bildes ist ein Fehler aufgetreten. Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut',
    interpretationNotSaved:
      'Das Analyseergebnis konnte nicht gespeichert werden. Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut',
    analysisCompleted: 'Bildanalyse erfolgreich abgeschlossen!',
  },
  analyzeVideo: {
    noVideoFound:
      'Videodatei fehlt. Bitte wählen Sie ein Video aus und laden Sie es hoch, um fortzufahren',
    uploadVideoStorageError:
      'Beim Hochladen Ihres Videos ist ein Fehler aufgetreten. Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut',
    interpretationNotSaved:
      'Das Analyseergebnis konnte nicht gespeichert werden. Bitte überprüfen Sie Ihre Verbindung und versuchen Sie es erneut',
    analysisCompleted: 'Videoanalyse erfolgreich abgeschlossen!',
  },
  incrementUsersScans: {
    incrementSuccessScan: 'Ein weiterer Scan wurde verwendet',
    generalError: 'Die Anzahl der Scans konnte nicht verringert werden',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Ein Scan wurde verringert',
    decrementErrorScan:
      'Es gab ein Problem beim Aktualisieren der Anzahl der Scans. Bitte versuchen Sie es später erneut',
    generalError: 'Die Anzahl der Scans konnte nicht verringert werden',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Erfolgreich abonniert!',
    updateSubscriptionError:
      'Die Benutzerabonnement konnte nicht aktualisiert werden',
  },
  updateUserLanguage: {
    updateSuccess: 'Sprache erfolgreich aktualisiert!',
    updateError:
      'Beim Aktualisieren der Sprache ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut',
  },
  getUserInfo: {
    successGetInfo: 'Benutzerinformationen erfolgreich abgerufen',
    errorGetInfo:
      'Beim Abrufen der Benutzerinformationen ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut',
  },
  getUserInfoById: {
    noUserInfoData:
      'Das Benutzerdokument existiert, aber es sind keine Daten verfügbar',
    getUserFetchError:
      'Beim Abrufen der Benutzerinformationen ist ein Fehler aufgetreten',
  },
  updateScanInterpretation: {
    success: 'Scan-Interpretationsdatensatz erfolgreich aktualisiert!',
    generalError:
      'Beim Aktualisieren der Scan-Interpretation ist ein Fehler aufgetreten',
    paramsRequired: "'documentId' und 'fieldsToUpdate' sind beide erforderlich",
  },
  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' ist erforderlich",
    noDocIdFound: 'Es wurde kein Dokument mit der angegebenen ID gefunden',
    success: 'Dokument erfolgreich abgerufen',
    generalError:
      'Beim Abrufen der Interpretation für die angegebene Dokument-ID ist ein Fehler aufgetreten',
  },
  getRecentInterpretation: {
    limitRequired: 'Das Limit muss eine Zahl zwischen 1 und 100 sein',
    noInterpretationFound: 'Keine Interpretationen gefunden',
    success: 'Aktuelle Interpretationen erfolgreich abgerufen!',
    generalError:
      'Beim Abrufen der letzten Interpretationen ist ein Fehler aufgetreten',
    generalErrorAdditional: 'Ein interner Serverfehler ist aufgetreten',
  },
  storeDeviceToken: {
    deviceTokenRequired: 'Die Angabe eines Gerätetokens ist erforderlich.',
    generalError: 'Fehler beim Speichern des Gerätetokens',
  },
  sendGlobalPushNotifications: {
    requiredParams: 'Titel und Text der Benachrichtigung sind erforderlich.',
    generalError:
      'Beim Verarbeiten der Benachrichtigungen ist ein Fehler aufgetreten',
    generalErrorAdditional:
      'Globale Benachrichtigung konnte nicht gesendet werden',
  },
  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'Die Geräte-ID ist erforderlich',
    languageMandatory: 'Die Sprache ist erforderlich',
    deviceIdentified: 'Ihr Gerät wurde erfolgreich identifiziert',
    generalError: 'Beim Überprüfen der Geräte-ID ist ein Fehler aufgetreten',
  },
  getUserNotification: {
    generalError: 'Benutzerbenachrichtigungen konnten nicht abgerufen werden',
    generalErrorAdditional:
      'Beim Abrufen der Benutzerbenachrichtigungen ist ein Fehler aufgetreten',
  },
  deleteScanInterpretation: {
    success: 'Der Bericht wurde erfolgreich gelöscht!',
    documentIdRequired: "'DocumentId' ist erforderlich, um fortzufahren.",
    generalError:
      'Beim Löschen des Berichts ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
  },
  getScanCategories: {
    noCategoryFound: 'Keine Kategorien gefunden',
    generalError: 'Beim Abrufen der Scan-Kategorien ist ein Fehler aufgetreten',
  },
  uploadScanCategories: {
    successfullyUploaded: 'Scan-Kategorien erfolgreich hochgeladen',
    generalError: 'Scan-Kategorien konnten nicht hochgeladen werden',
  },
  sendUserNotification: {
    noTokenFound:
      'Keine gültigen Expo-Tokens gefunden. Benachrichtigungen können nicht gesendet werden',
    generalError: 'Benachrichtigung konnte nicht gesendet werden',
  },
  updateUser: {
    successUpdatedUser: 'Benutzer erfolgreich aktualisiert',
    updateUserError:
      'Der Benutzerdatensatz konnte nicht aktualisiert werden. Bitte versuchen Sie es erneut.',
  },
};

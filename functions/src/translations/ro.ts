import { ITranslation } from './types';

export const ro: ITranslation = {
  common: {
    welcome: 'Bine ați venit',
    error: 'A apărut o eroare',
    loading: 'Se încarcă...',
    noUserFound:
      'Nu sunteți autorizat să faceți această solicitare. Vă rugăm să vă autentificați',
    userIdMissing:
      'Se pare că lipsește ID-ul utilizatorului. Vă rugăm să îl furnizați pentru a continua',
    scanLimitReached:
      'Ați atins numărul maxim de scanări permise. Vă rugăm să faceți upgrade la planul dumneavoastră pentru a continua să utilizați serviciul',
    mandatoryLanguage: 'Codul limbii este obligatoriu',
  },
  auth: {
    signIn: 'Autentificare',
    signUp: 'Înregistrare',
  },
  loginUserViaEmail: {
    mandatoryEmail: 'Vă rugăm să furnizați adresa de email pentru a continua',
    invalidEmail:
      'Adresa de email introdusă este invalidă. Vă rugăm să o verificați și să încercați din nou',
    accountCreated:
      'Contul dumneavoastră a fost creat cu succes! Vă rugăm să verificați emailul pentru codul de verificare',
    verificationCodeSent:
      'Am trimis un cod de verificare pe adresa dumneavoastră de email. Vă rugăm să verificați inboxul',
    internalError:
      'A apărut o eroare la procesarea autentificării prin email. Vă rugăm să încercați din nou',
  },
  sendEmailVerification: {
    emailMandatory: 'Este necesară o adresă de email pentru a continua',
    emailUsed:
      'Această adresă de email este deja folosită. Vă rugăm să utilizați alta',
    userNotFound:
      'Nu am găsit utilizatorul specificat. Vă rugăm să verificați detaliile și să încercați din nou',
    verificationCodeSent:
      'Codul de verificare a fost trimis cu succes pe adresa dumneavoastră de email',
    generalError: 'A apărut o eroare la începerea verificării emailului',
  },
  getInterpretationByDate: {
    startEndDateRequired:
      'Data de început și data de sfârșit sunt obligatorii.',
    startDatePriority: 'Data de început nu poate fi după data de sfârșit.',
    generalError: 'Nu s-au putut prelua analizele.',
  },
  verifyAuthenticationCode: {
    authCodeMandatory:
      'Codul de autentificare este obligatoriu pentru a continua',
    emailAddressMandatory: 'Adresa de email este obligatorie pentru a continua',
    userNotFound:
      'Utilizatorul specificat nu a fost găsit. Vă rugăm să verificați detaliile și să încercați din nou',
    invalidAuthCode:
      'Hopa! Acesta nu este un cod de autentificare valid. Vă rugăm să verificați și să încercați din nou!',
    authCodeExpired:
      "Hopa! Codul dumneavoastră a expirat. Vă rugăm să încercați din nou să vă autentificați folosind adresa de email sau să faceți clic pe 'Retrimite codul'",
    authCodeVerified: 'Utilizatorul a fost verificat cu succes',
    generalError:
      'Hopa! A apărut o eroare la verificarea codului dumneavoastră',
  },
  analyzeImage: {
    scanLimitReached:
      'Ați atins numărul maxim de scanări permise. Vă rugăm să faceți upgrade la planul dumneavoastră pentru a continua să utilizați serviciul',
    imageMissing:
      'Lipsește imaginea. Vă rugăm să selectați și să încărcați o imagine pentru a continua',
    uploadImageStorageError:
      'A apărut o eroare la încărcarea imaginii dumneavoastră. Vă rugăm să verificați conexiunea și să încercați din nou',
    interpretationNotSaved:
      'Nu s-a putut salva rezultatul analizei. Vă rugăm să verificați conexiunea și să încercați din nou',
    analysisCompleted: 'Analiza imaginii a fost finalizată cu succes!',
  },
  analyzeVideo: {
    noVideoFound:
      'Lipsește fișierul video. Vă rugăm să selectați și să încărcați un video pentru a continua',
    uploadVideoStorageError:
      'A apărut o eroare la încărcarea videoclipului dumneavoastră. Vă rugăm să verificați conexiunea și să încercați din nou',
    interpretationNotSaved:
      'Nu s-a putut salva rezultatul analizei. Vă rugăm să verificați conexiunea și să încercați din nou',
    analysisCompleted: 'Analiza videoclipului a fost finalizată cu succes!',
  },
  incrementUsersScans: {
    incrementSuccessScan: 'A fost utilizată încă o scanare',
    generalError: 'Nu s-a putut decrementa numărul de scanări!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'O scanare a fost decrementată',
    decrementErrorScan:
      'A apărut o problemă la actualizarea numărului de scanări. Vă rugăm să încercați mai târziu',
    generalError: 'Nu s-a putut decrementa numărul de scanări!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Abonare realizată cu succes!',
    updateSubscriptionError:
      'Nu s-a putut actualiza abonamentul utilizatorului!',
  },
  updateUserLanguage: {
    updateSuccess: 'Limba a fost actualizată cu succes!',
    updateError:
      'A apărut o eroare neașteptată la actualizarea limbii. Vă rugăm să încercați mai târziu',
  },
  getUserInfo: {
    successGetInfo: 'Informațiile despre utilizator au fost preluate cu succes',
    errorGetInfo:
      'A apărut o eroare neașteptată la preluarea informațiilor despre utilizator. Vă rugăm să încercați mai târziu',
  },
  getUserInfoById: {
    noUserInfoData:
      'Documentul utilizatorului există, dar nu sunt disponibile date',
    getUserFetchError:
      'A apărut o eroare la preluarea informațiilor despre utilizator',
  },
  updateScanInterpretation: {
    success:
      'Înregistrarea interpretării scanării a fost actualizată cu succes!',
    generalError: 'A apărut o eroare la actualizarea interpretării scanării',
    paramsRequired: "'documentId' și 'fieldsToUpdate' sunt ambele obligatorii",
  },
  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' este obligatoriu",
    noDocIdFound: 'Nu a fost găsit niciun document cu ID-ul furnizat',
    success: 'Documentul a fost preluat cu succes',
    generalError:
      'A apărut o eroare la preluarea interpretării pentru ID-ul documentului furnizat',
  },
  getRecentInterpretation: {
    limitRequired: 'Limita trebuie să fie un număr între 1 și 100',
    noInterpretationFound: 'Nu au fost găsite interpretări',
    success: 'Interpretările recente au fost preluate cu succes!',
    generalError: 'A apărut o eroare la preluarea interpretărilor recente',
    generalErrorAdditional: 'A apărut o eroare internă a serverului',
  },
  storeDeviceToken: {
    deviceTokenRequired:
      'Furnizarea unui token de dispozitiv este obligatorie.',
    generalError: 'Eroare la stocarea token-ului de dispozitiv',
  },
  sendGlobalPushNotifications: {
    requiredParams: 'Titlul și corpul notificării sunt obligatorii.',
    generalError: 'A apărut o eroare la procesarea notificărilor',
    generalErrorAdditional: 'Nu s-a putut trimite notificarea globală',
  },
  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'ID-ul dispozitivului este obligatoriu',
    languageMandatory: 'Limba este obligatorie',
    deviceIdentified: 'Dispozitivul dumneavoastră a fost identificat cu succes',
    generalError:
      'A apărut o eroare la verificarea perioadei de încercare a dispozitivului',
  },
  getUserNotification: {
    generalError: 'Nu s-au putut prelua notificările utilizatorului',
    generalErrorAdditional:
      'A apărut o eroare la preluarea notificărilor utilizatorului',
  },
  getScanCategories: {
    noCategoryFound: 'Nu au fost găsite categorii',
    generalError: 'A apărut o eroare la preluarea categoriilor de scanare',
  },
  uploadScanCategories: {
    successfullyUploaded: 'Categoriile de scanare au fost încărcate cu succes',
    generalError: 'Nu s-au putut încărca categoriile de scanare',
  },
  sendUserNotification: {
    noTokenFound:
      'Nu au fost găsite token-uri Expo valide. Nu s-au putut trimite notificări',
    generalError: 'Nu s-a putut trimite notificarea',
  },
  updateUser: {
    successUpdatedUser: 'Utilizatorul a fost actualizat cu succes',
    updateUserError:
      'Nu s-a putut actualiza înregistrarea utilizatorului. Vă rugăm să încercați din nou.',
  },
};

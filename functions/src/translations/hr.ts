import { ITranslation } from './types';

export const hr: ITranslation = {
  common: {
    welcome: 'Dobrodošli',
    error: 'Došlo je do pogreške',
    loading: 'Učitavanje...',
    noUserFound: 'Niste ovlašteni za ovaj zahtjev. Molimo prijavite se',
    userIdMissing:
      'Čini se da nedostaje korisnički ID. Molimo unesite ga za nastavak',
    scanLimitReached:
      'Dosegli ste maksimalni dopušteni broj skeniranja. Molimo nadogradite svoj plan za nastavak korištenja usluge',
    mandatoryLanguage: 'Jezični kod je obavezan',
  },
  auth: {
    signIn: 'Prijava',
    signUp: 'Registracija',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'Molimo unesite svoju email adresu za nastavak',
    invalidEmail:
      'Unesena email adresa nije valjana. Molimo provjerite je i pokušajte ponovno',
    accountCreated:
      'Vaš račun je uspješno kreiran! Molimo provjerite svoj email za verifikacijski kod',
    verificationCodeSent:
      'Poslali smo verifikacijski kod na vaš email. Molimo provjerite svoju pristiglu poštu',
    internalError:
      'Došlo je do pogreške pri obradi vaše autentifikacije putem emaila. Molimo pokušajte ponovno',
  },

  sendEmailVerification: {
    emailMandatory: 'Email adresa je obavezna za nastavak',
    emailUsed: 'Ova email adresa se već koristi. Molimo koristite drugu',
    userNotFound:
      'Nismo mogli pronaći navedenog korisnika. Molimo provjerite svoje podatke i pokušajte ponovno',
    verificationCodeSent: 'Verifikacijski kod je uspješno poslan na vaš email',
    generalError: 'Došlo je do pogreške pri pokretanju email verifikacije',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'Datum početka i datum završetka su obavezni.',
    startDatePriority: 'Datum početka ne može biti nakon datuma završetka.',
    generalError: 'Nije moguće dohvatiti analize.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory: 'Autentifikacijski kod je obavezan za nastavak',
    emailAddressMandatory: 'Email adresa je obavezna za nastavak',
    userNotFound:
      'Navedeni korisnik nije pronađen. Molimo provjerite svoje podatke i pokušajte ponovno',
    invalidAuthCode:
      'Ups! Ovo nije valjani autentifikacijski kod. Molimo provjerite i pokušajte ponovno!',
    authCodeExpired:
      "Ups! Vaš kod je istekao. Molimo pokušajte ponovnu prijavu sa svojom email adresom ili kliknite na 'Pošalji kod ponovno'",
    authCodeVerified: 'Korisnik je uspješno verificiran',
    generalError: 'Ups! Došli smo do pogreške pri verifikaciji vašeg koda',
  },

  analyzeImage: {
    scanLimitReached:
      'Dosegli ste maksimalni dopušteni broj skeniranja. Molimo nadogradite svoj plan za nastavak korištenja usluge',
    imageMissing:
      'Slika nedostaje. Molimo odaberite i učitajte sliku za nastavak',
    uploadImageStorageError:
      'Došli smo do pogreške pri učitavanju vaše slike. Molimo provjerite svoju vezu i pokušajte ponovno',
    interpretationNotSaved:
      'Nije moguće spremiti rezultat analize. Molimo provjerite svoju vezu i pokušajte ponovno',
    analysisCompleted: 'Analiza slike uspješno završena!',
  },
  analyzeVideo: {
    noVideoFound:
      'Video datoteka nedostaje. Molimo odaberite i učitajte video za nastavak',
    uploadVideoStorageError:
      'Došli smo do pogreške pri učitavanju vašeg videa. Molimo provjerite svoju vezu i pokušajte ponovno',
    interpretationNotSaved:
      'Nije moguće spremiti rezultat analize. Molimo provjerite svoju vezu i pokušajte ponovno',
    analysisCompleted: 'Analiza videa uspješno završena!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'Još jedno skeniranje je iskorišteno',
    generalError: 'Nije moguće povećati broj skeniranja!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Jedno skeniranje je umanjeno',
    decrementErrorScan:
      'Došlo je do problema pri ažuriranju broja skeniranja. Molimo pokušajte ponovno kasnije',
    generalError: 'Nije moguće smanjiti broj skeniranja!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Uspješno pretplaćeni!',
    updateSubscriptionError: 'Nije moguće ažurirati korisničku pretplatu!',
  },
  updateUserLanguage: {
    updateSuccess: 'Jezik uspješno ažuriran!',
    updateError:
      'Došlo je do neočekivane pogreške pri ažuriranju jezika. Molimo pokušajte ponovno kasnije',
  },

  getUserInfo: {
    successGetInfo: 'Podaci korisničkih informacija uspješno dohvaćeni',
    errorGetInfo:
      'Došlo je do neočekivane pogreške pri dohvaćanju korisničkih informacija. Molimo pokušajte ponovno kasnije',
  },
  getUserInfoById: {
    noUserInfoData: 'Korisnički dokument postoji, ali nema dostupnih podataka',
    getUserFetchError:
      'Došlo je do pogreške pri dohvaćanju korisničkih informacija',
  },

  updateScanInterpretation: {
    success: 'Zapis interpretacije skeniranja uspješno ažuriran!',
    generalError:
      'Došlo je do pogreške pri ažuriranju interpretacije skeniranja',
    paramsRequired: "Obavezni su i 'documentId' i 'fieldsToUpdate'",
  },
  deleteScanInterpretation: {
    success: 'Izvješće je uspješno izbrisano!',
    documentIdRequired: "'DocumentId' je obavezan za nastavak.",
    generalError:
      'Nešto je pošlo po zlu pri brisanju izvješća. Molimo pokušajte ponovno.',
  },

  getInterpretationByDocumentId: {
    paramsRequired: "Obavezan je 'DocumentId'",
    noDocIdFound: 'Nije pronađen dokument s navedenim ID-om',
    success: 'Dokument uspješno dohvaćen',
    generalError:
      'Došlo je do pogreške pri dohvaćanju interpretacije za navedeni ID dokumenta',
  },

  getRecentInterpretation: {
    limitRequired: 'Ograničenje mora biti broj između 1 i 100',
    noInterpretationFound: 'Nisu pronađene interpretacije',
    success: 'Nedavne interpretacije uspješno dohvaćene!',
    generalError: 'Došlo je do pogreške pri dohvaćanju nedavnih interpretacija',
    generalErrorAdditional: 'Došlo je do interne pogreške poslužitelja',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Davanje tokena uređaja je obavezno.',
    generalError: 'Pogreška pri pohrani tokena uređaja',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Naslov i tijelo obavijesti su obavezni.',
    generalError: 'Došlo je do pogreške pri obradi obavijesti',
    generalErrorAdditional: 'Nije uspjelo slanje globalne obavijesti',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'ID uređaja je obavezan',
    languageMandatory: 'Jezik je obavezan',
    deviceIdentified: 'Vaš uređaj je uspješno identificiran',
    generalError: 'Došlo je do pogreške pri provjeri probnog razdoblja uređaja',
  },

  getUserNotification: {
    generalError: 'Nije uspjelo dohvaćanje korisničkih obavijesti',
    generalErrorAdditional:
      'Došlo je do pogreške pri dohvaćanju korisničkih obavijesti',
  },

  getScanCategories: {
    noCategoryFound: 'Nije pronađena nijedna kategorija',
    generalError: 'Došlo je do pogreške pri dohvaćanju kategorija skeniranja',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Kategorije skeniranja uspješno učitane',
    generalError: 'Nije uspjelo učitavanje kategorija skeniranja',
  },

  sendUserNotification: {
    noTokenFound:
      'Nisu pronađeni valjani Expo tokeni. Nije moguće slati obavijesti',
    generalError: 'Nije uspjelo slanje obavijesti',
  },

  updateUser: {
    successUpdatedUser: 'Korisnik uspješno ažuriran',
    updateUserError:
      'Nije moguće ažurirati zapis korisnika. Molimo pokušajte ponovno.',
  },

  loginUserAnonymously: {
    mandatoryUsername: 'Odaberite nadimak i krenimo!',
    userLoggedIn: 'Dobrodošli natrag! Prijavljeni ste.',
    accountCreated: 'Prijavljeni ste! Uživajte u istraživanju!',
    error:
      'Ups! Nešto je pošlo po zlu. Molimo provjerite svoju vezu i pokušajte ponovno.',
  },
  continueConversation: {
    messagesLimit:
      'Aria je na punom kapacitetu! Učitajte još jedno skeniranje za nastavak dobivanja analiza i uvida',
    conversationNotFound: 'Nije moguće pronaći razgovor',
    serviceIssueAi:
      'Čini se da postoji problem s AI uslugom. Molimo pokušajte ponovno.',
    noResponseAiService:
      'Nije uspjelo dobivanje valjanog odgovora od AI usluge. Molimo pokušajte ponovno',
  },
};

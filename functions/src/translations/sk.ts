import { ITranslation } from './types';

export const sk: ITranslation = {
  common: {
    welcome: 'Vitajte',
    error: 'Vyskytla sa chyba',
    loading: 'Načítava sa...',
    noUserFound:
      'Nie ste oprávnení vykonať túto požiadavku. Prosím, prihláste sa',
    userIdMissing:
      'Zdá sa, že chýba ID používateľa. Poskytnite ho pre pokračovanie',
    scanLimitReached:
      'Dosiahli ste maximálny povolený počet skenovaní. Ak chcete naďalej používať službu, inovujte si plán',
    mandatoryLanguage: 'Kód jazyka je povinný',
  },
  auth: {
    signIn: 'Prihlásiť sa',
    signUp: 'Registrovať sa',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'Poskytnite svoju e-mailovú adresu pre pokračovanie',
    invalidEmail:
      'Zadaná e-mailová adresa je neplatná. Overte ju a skúste znova',
    accountCreated:
      'Váš účet bol úspešne vytvorený! Skontrolujte svoj e-mail kvôli overovaciemu kódu',
    verificationCodeSent:
      'Poslali sme overovací kód na váš e-mail. Skontrolujte svoju doručenú poštu',
    internalError:
      'Pri overovaní prostredníctvom e-mailu došlo k chybe. Skúste to znova',
  },

  sendEmailVerification: {
    emailMandatory: 'Pre pokračovanie je potrebná e-mailová adresa',
    emailUsed: 'Táto e-mailová adresa sa už používa. Použite inú',
    userNotFound:
      'Nepodarilo sa nám nájsť zadaného používateľa. Skontrolujte svoje údaje a skúste znova',
    verificationCodeSent: 'Overovací kód bol úspešne odoslaný na váš e-mail',
    generalError: 'Pri spustení overovania e-mailu došlo k chybe',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'Dátum začiatku a dátum ukončenia sú povinné.',
    startDatePriority: 'Dátum začiatku nemôže byť po dátume ukončenia.',
    generalError: 'Nepodarilo sa získať analýzy.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory: 'Overovací kód je povinný pre pokračovanie',
    emailAddressMandatory: 'E-mailová adresa je povinná pre pokračovanie',
    userNotFound:
      'Zadaného používateľa sa nepodarilo nájsť. Skontrolujte svoje údaje a skúste znova',
    invalidAuthCode:
      'Ops! Toto nie je platný overovací kód. Skontrolujte a skúste znova!',
    authCodeExpired:
      "Ops! Váš kód vypršal. Skúste sa znova prihlásiť pomocou svojej e-mailovej adresy alebo kliknite na 'Znova odoslať kód'",
    authCodeVerified: 'Používateľ bol úspešne overený',
    generalError: 'Ops! Pri overovaní vášho kódu sa vyskytla chyba',
  },

  analyzeImage: {
    scanLimitReached:
      'Dosiahli ste maximálny povolený počet skenovaní. Ak chcete naďalej používať službu, inovujte si plán',
    imageMissing: 'Obrázok chýba. Vyberte a nahrajte obrázok pre pokračovanie',
    uploadImageStorageError:
      'Pri nahrávaní vášho obrázka sa vyskytla chyba. Skontrolujte svoje pripojenie a skúste znova',
    interpretationNotSaved:
      'Nepodarilo sa uložiť výsledok analýzy. Skontrolujte svoje pripojenie a skúste znova',
    analysisCompleted: 'Analýza obrázka úspešne dokončená!',
  },
  analyzeVideo: {
    noVideoFound:
      'Video súbor chýba. Vyberte a nahrajte video pre pokračovanie',
    uploadVideoStorageError:
      'Pri nahrávaní vášho videa sa vyskytla chyba. Skontrolujte svoje pripojenie a skúste znova',
    interpretationNotSaved:
      'Nepodarilo sa uložiť výsledok analýzy. Skontrolujte svoje pripojenie a skúste znova',
    analysisCompleted: 'Analýza videa úspešne dokončená!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'Bolo použitých ďalšie skenovanie',
    generalError: 'Nepodarilo sa znížiť počet skenovaní!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Počet skenovaní bol znížený o jeden',
    decrementErrorScan:
      'Vyskytol sa problém pri aktualizácii počtu skenovaní. Skúste to neskôr',
    generalError: 'Nepodarilo sa znížiť počet skenovaní!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Úspešne prihlásené na odber!',
    updateSubscriptionError:
      'Nepodarilo sa aktualizovať predplatné používateľa!',
  },
  updateUserLanguage: {
    updateSuccess: 'Jazyk bol úspešne aktualizovaný!',
    updateError:
      'Pri aktualizácii jazyka došlo k neočakávanej chybe. Skúste to neskôr',
  },

  getUserInfo: {
    successGetInfo: 'Údaje o používateľovi boli úspešne načítané',
    errorGetInfo:
      'Pri načítavaní informácií o používateľovi došlo k neočakávanej chybe. Skúste to neskôr',
  },
  getUserInfoById: {
    noUserInfoData:
      'Dokument používateľa existuje, ale nie sú k dispozícii žiadne údaje',
    getUserFetchError:
      'Pri načítavaní informácií o používateľovi došlo k chybe',
  },

  updateScanInterpretation: {
    success: 'Záznam interpretácie skenovania bol úspešne aktualizovaný!',
    generalError: 'Pri aktualizácii interpretácie skenovania došlo k chybe',
    paramsRequired: "'documentId' a 'fieldsToUpdate' sú povinné",
  },
  deleteScanInterpretation: {
    success: 'Správa bola úspešne odstránená!',
    documentIdRequired: "Pre pokračovanie je potrebný 'DocumentId'.",
    generalError: 'Pri odstraňovaní správy sa niečo pokazilo. Skúste to znova.',
  },

  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' je povinný",
    noDocIdFound: 'S poskytnutým ID nebol nájdený žiadny dokument',
    success: 'Dokument bol úspešne načítaný',
    generalError:
      'Pri načítavaní interpretácie pre poskytnuté ID dokumentu došlo k chybe',
  },

  getRecentInterpretation: {
    limitRequired: 'Limit musí byť číslo medzi 1 a 100',
    noInterpretationFound: 'Neboli nájdené žiadne interpretácie',
    success: 'Nedávne interpretácie boli úspešne načítané!',
    generalError: 'Pri načítavaní nedávnych interpretácií došlo k chybe',
    generalErrorAdditional: 'Došlo k internej chybe servera',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Poskytnutie tokenu zariadenia je povinné.',
    generalError: 'Chyba pri ukladaní tokenu zariadenia',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Nadpis a telo notifikácie sú povinné.',
    generalError: 'Pri spracovaní notifikácií došlo k chybe',
    generalErrorAdditional: 'Nepodarilo sa odoslať globálnu notifikáciu',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'ID zariadenia je povinné',
    languageMandatory: 'Jazyk je povinný',
    deviceIdentified: 'Vaše zariadenie bolo úspešne identifikované',
    generalError: 'Pri kontrole skúšobnej verzie zariadenia došlo k chybe',
  },

  getUserNotification: {
    generalError: 'Nepodarilo sa načítať používateľské notifikácie',
    generalErrorAdditional:
      'Pri načítavaní používateľských notifikácií došlo k chybe',
  },

  getScanCategories: {
    noCategoryFound: 'Neboli nájdené žiadne kategórie',
    generalError: 'Pri načítavaní kategórií skenovania došlo k chybe',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Kategórie skenovania boli úspešne nahrané',
    generalError: 'Nepodarilo sa nahrať kategórie skenovania',
  },

  sendUserNotification: {
    noTokenFound:
      'Neboli nájdené žiadne platné Expo tokeny. Nie je možné odoslať notifikácie',
    generalError: 'Nepodarilo sa odoslať notifikáciu',
  },

  updateUser: {
    successUpdatedUser: 'Používateľ bol úspešne aktualizovaný',
    updateUserError:
      'Nepodarilo sa aktualizovať záznam používateľa. Skúste to znova.',
  },

  loginUserAnonymously: {
    mandatoryUsername: 'Vyberte si prezývku a poďme začať!',
    userLoggedIn: 'Vitajte späť! Ste prihlásený.',
    accountCreated: 'Ste prihlásený! Užite si prehliadanie!',
    error:
      'Ops! Niečo sa pokazilo. Skontrolujte svoje pripojenie a skúste znova.',
  },
  continueConversation: {
    messagesLimit:
      'Aria je na plnej kapacite! Nahrajte ďalšie skenovanie, aby ste naďalej dostávali analýzy a poznatky',
    conversationNotFound: 'Nepodarilo sa nájsť konverzáciu',
    serviceIssueAi:
      'Zdá sa, že existuje problém so službou AI. Skúste to znova.',
    noResponseAiService:
      'Nepodarilo sa získať platnú odpoveď od služby AI. Skúste to znova',
  },
};

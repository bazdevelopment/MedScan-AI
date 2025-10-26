import { ITranslation } from './types';

export const cs: ITranslation = {
  common: {
    welcome: 'Vítejte',
    error: 'Došlo k chybě',
    loading: 'Načítání...',
    noUserFound: 'Nejste oprávněni k tomuto požadavku. Prosím, přihlaste se',
    userIdMissing:
      'Vypadá to, že chybí ID uživatele. Prosím, poskytněte jej pro pokračování',
    scanLimitReached:
      'Dosáhli jste maximálního povoleného počtu skenů. Prosím, upgradujte svůj plán pro pokračování ve službě',
    mandatoryLanguage: 'Je vyžadován kód jazyka',
  },
  auth: {
    signIn: 'Přihlásit se',
    signUp: 'Registrovat se',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'Prosím, poskytněte svou e-mailovou adresu pro pokračování',
    invalidEmail:
      'Zadaná e-mailová adresa je neplatná. Prosím, ověřte ji a zkuste to znovu',
    accountCreated:
      'Váš účet byl úspěšně vytvořen! Prosím, zkontrolujte svůj e-mail pro ověřovací kód',
    verificationCodeSent:
      'Odeslali jsme ověřovací kód na váš e-mail. Prosím, zkontrolujte svou doručenou poštu',
    internalError:
      'Při zpracování vašeho ověření pomocí e-mailu došlo k chybě. Prosím, zkuste to znovu',
  },

  sendEmailVerification: {
    emailMandatory: 'Pro pokračování je vyžadována e-mailová adresa',
    emailUsed: 'Tato e-mailová adresa je již používána. Prosím, použijte jinou',
    userNotFound:
      'Nepodařilo se najít zadaného uživatele. Prosím, zkontrolujte své údaje a zkuste to znovu',
    verificationCodeSent: 'Ověřovací kód byl úspěšně odeslán na váš e-mail',
    generalError: 'Při zahájení ověření e-mailu došlo k chybě',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'Datum začátku a datum konce jsou povinné.',
    startDatePriority: 'Datum začátku nemůže být po datu konce.',
    generalError: 'Nelze načíst analýzy.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory: 'Pro pokračování je vyžadován ověřovací kód',
    emailAddressMandatory: 'Pro pokračování je vyžadována e-mailová adresa',
    userNotFound:
      'Zadaného uživatele se nepodařilo najít. Prosím, zkontrolujte své údaje a zkuste to znovu',
    invalidAuthCode:
      'Jejda! Toto není platný ověřovací kód. Prosím, zkontrolujte a zkuste to znovu!',
    authCodeExpired:
      "Jejda! Váš kód vypršel. Prosím, zkuste se znovu přihlásit pomocí své e-mailové adresy nebo klikněte na 'Znovu odeslat kód'",
    authCodeVerified: 'Uživatel byl úspěšně ověřen',
    generalError: 'Jejda! Při ověřování vašeho kódu došlo k chybě',
  },

  analyzeImage: {
    scanLimitReached:
      'Dosáhli jste maximálního povoleného počtu skenů. Prosím, upgradujte svůj plán pro pokračování ve službě',
    imageMissing:
      'Chybí obrázek. Prosím, vyberte a nahrajte obrázek pro pokračování',
    uploadImageStorageError:
      'Při nahrávání vašeho obrázku došlo k chybě. Prosím, zkontrolujte své připojení a zkuste to znovu',
    interpretationNotSaved:
      'Nelze uložit výsledek analýzy. Prosím, zkontrolujte své připojení a zkuste to znovu',
    analysisCompleted: 'Analýza obrázku úspěšně dokončena!',
  },
  analyzeVideo: {
    noVideoFound:
      'Chybí video soubor. Prosím, vyberte a nahrajte video pro pokračování',
    uploadVideoStorageError:
      'Při nahrávání vašeho videa došlo k chybě. Prosím, zkontrolujte své připojení a zkuste to znovu',
    interpretationNotSaved:
      'Nelze uložit výsledek analýzy. Prosím, zkontrolujte své připojení a zkuste to znovu',
    analysisCompleted: 'Analýza videa úspěšně dokončena!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'Byl použit další sken',
    generalError: 'Nelze zvýšit počet skenů!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Jeden sken byl odebrán',
    decrementErrorScan:
      'Při aktualizaci počtu skenů došlo k problému. Prosím, zkuste to později',
    generalError: 'Nelze snížit počet skenů!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Úspěšně předplaceno!',
    updateSubscriptionError: 'Nelze aktualizovat předplatné uživatele!',
  },
  updateUserLanguage: {
    updateSuccess: 'Jazyk úspěšně aktualizován!',
    updateError:
      'Při aktualizaci jazyka došlo k neočekávané chybě. Prosím, zkuste to později',
  },

  getUserInfo: {
    successGetInfo: 'Úspěšně načtena data uživatelských informací',
    errorGetInfo:
      'Při načítání uživatelských informací došlo k neočekávané chybě. Prosím, zkuste to později',
  },
  getUserInfoById: {
    noUserInfoData:
      'Uživatelský dokument existuje, ale nejsou k dispozici žádná data',
    getUserFetchError: 'Při načítání uživatelských informací došlo k chybě',
  },

  updateScanInterpretation: {
    success: 'Záznam interpretace skenu úspěšně aktualizován!',
    generalError: 'Při aktualizaci interpretace skenu došlo k chybě',
    paramsRequired: "Jsou vyžadovány 'documentId' a 'fieldsToUpdate'",
  },
  deleteScanInterpretation: {
    success: 'Zpráva byla úspěšně smazána!',
    documentIdRequired: "Pro pokračování je vyžadován 'DocumentId'.",
    generalError: 'Při mazání zprávy došlo k chybě. Prosím, zkuste to znovu.',
  },

  getInterpretationByDocumentId: {
    paramsRequired: "Je vyžadován 'DocumentId'",
    noDocIdFound: 'S poskytnutým ID nebyl nalezen žádný dokument',
    success: 'Dokument úspěšně načten',
    generalError:
      'Při načítání interpretace pro poskytnuté ID dokumentu došlo k chybě',
  },

  getRecentInterpretation: {
    limitRequired: 'Limit musí být číslo mezi 1 a 100',
    noInterpretationFound: 'Nenalezeny žádné interpretace',
    success: 'Nedávné interpretace úspěšně načteny!',
    generalError: 'Při načítání nedávných interpretací došlo k chybě',
    generalErrorAdditional: 'Došlo k interní chybě serveru',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Poskytnutí tokenu zařízení je povinné.',
    generalError: 'Chyba při ukládání tokenu zařízení',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Nadpis a tělo notifikace jsou povinné.',
    generalError: 'Při zpracování notifikací došlo k chybě',
    generalErrorAdditional: 'Nepodařilo se odeslat globální notifikaci',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'ID zařízení je povinné',
    languageMandatory: 'Jazyk je povinný',
    deviceIdentified: 'Vaše zařízení bylo úspěšně identifikováno',
    generalError: 'Při kontrole zkušebního období zařízení došlo k chybě',
  },

  getUserNotification: {
    generalError: 'Nepodařilo se načíst uživatelské notifikace',
    generalErrorAdditional:
      'Při načítání uživatelských notifikací došlo k chybě',
  },

  getScanCategories: {
    noCategoryFound: 'Nenalezeny žádné kategorie',
    generalError: 'Při načítání kategorií skenů došlo k chybě',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Kategorie skenů úspěšně nahrány',
    generalError: 'Nepodařilo se nahrát kategorie skenů',
  },

  sendUserNotification: {
    noTokenFound:
      'Nebyly nalezeny platné Expo tokeny. Nelze odeslat notifikace',
    generalError: 'Nepodařilo se odeslat notifikaci',
  },

  updateUser: {
    successUpdatedUser: 'Uživatel úspěšně aktualizován',
    updateUserError:
      'Nelze aktualizovat záznam uživatele. Prosím, zkuste to znovu.',
  },

  loginUserAnonymously: {
    mandatoryUsername: 'Zvolte přezdívku a můžeme začít!',
    userLoggedIn: 'Vítejte zpět! Jste přihlášeni.',
    accountCreated: 'Jste přihlášeni! Užijte si prozkoumávání!',
    error:
      'Jejda! Něco se pokazilo. Prosím, zkontrolujte své připojení a zkuste to znovu.',
  },
  continueConversation: {
    messagesLimit:
      'Aria je na plné kapacitě! Nahrajte další sken pro pokračování v analýzách a poznatcích',
    conversationNotFound: 'Nelze najít konverzaci',
    serviceIssueAi:
      'Zdá se, že je problém se službou AI. Prosím, zkuste to znovu.',
    noResponseAiService:
      'Nepodařilo se získat platnou odpověď od služby AI. Prosím, zkuste to znovu',
  },
};

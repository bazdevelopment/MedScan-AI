import { ITranslation } from './types';

export const ca: ITranslation = {
  common: {
    welcome: 'Benvingut/da',
    error: "S'ha produït un error",
    loading: 'Carregant...',
    noUserFound:
      'No estàs autoritzat/ada per fer aquesta sol·licitud. Si us plau, inicia sessió',
    userIdMissing:
      "Sembla que falta l'identificador d'usuari. Si us plau, proporciona'l per continuar",
    scanLimitReached:
      "Has arribat al nombre màxim d'escanejats permesos. Si us plau, actualitza el teu pla per continuar utilitzant el servei",
    mandatoryLanguage: "El codi d'idioma és obligatori",
  },
  auth: {
    signIn: 'Iniciar Sessió',
    signUp: 'Registrar-se',
  },

  loginUserViaEmail: {
    mandatoryEmail:
      'Si us plau, proporciona la teva adreça de correu electrònic per continuar',
    invalidEmail:
      "L'adreça de correu electrònic introduïda no és vàlida. Si us plau, verifica-la i torna a intentar-ho",
    accountCreated:
      "El teu compte s'ha creat amb èxit! Si us plau, comprova el teu correu electrònic per al codi de verificació",
    verificationCodeSent:
      "Hem enviat un codi de verificació al teu correu electrònic. Si us plau, comprova la teva safata d'entrada",
    internalError:
      "S'ha produït un error processant la teva autenticació via correu electrònic. Si us plau, torna a intentar-ho",
  },

  sendEmailVerification: {
    emailMandatory:
      'Es requereix una adreça de correu electrònic per continuar',
    emailUsed:
      'Aquesta adreça de correu electrònic ja està en ús. Si us plau, utilitza una altra',
    userNotFound:
      "No hem pogut trobar l'usuari especificat. Si us plau, comprova les teves dades i torna a intentar-ho",
    verificationCodeSent:
      "El codi de verificació s'ha enviat amb èxit al teu correu electrònic",
    generalError:
      "S'ha produït un error mentre s'iniciava la verificació per correu electrònic",
  },

  getInterpretationByDate: {
    startEndDateRequired:
      "La data d'inici i la data de finalització són obligatòries.",
    startDatePriority:
      "La data d'inici no pot ser posterior a la data de finalització.",
    generalError: "No s'han pogut recuperar les anàlisis.",
  },

  verifyAuthenticationCode: {
    authCodeMandatory: "Un codi d'autenticació és obligatori per continuar",
    emailAddressMandatory:
      "L'adreça de correu electrònic és obligatòria per continuar",
    userNotFound:
      "No s'ha pogut trobar l'usuari especificat. Si us plau, comprova les teves dades i torna a intentar-ho",
    invalidAuthCode:
      "Vaja! Aquest no és un codi d'autenticació vàlid. Si us plau, comprova-ho i torna a intentar-ho!",
    authCodeExpired:
      "Vaja! El teu codi ha caducat. Si us plau, torna a intentar l'inici de sessió amb la teva adreça de correu electrònic o fes clic a 'Reenviar codi'",
    authCodeVerified: "L'usuari s'ha verificat amb èxit",
    generalError: 'Vaja! Hem trobat un error mentre verifiquem el teu codi',
  },

  analyzeImage: {
    scanLimitReached:
      "Has arribat al nombre màxim d'escanejats permesos. Si us plau, actualitza el teu pla per continuar utilitzant el servei",
    imageMissing:
      'Falta la imatge. Si us plau, selecciona i puja una imatge per continuar',
    uploadImageStorageError:
      'Hem trobat un error mentre pujàvem la teva imatge. Si us plau, comprova la teva connexió i torna a intentar-ho',
    interpretationNotSaved:
      "No s'ha pogut desar el resultat de l'anàlisi. Si us plau, comprova la teva connexió i torna a intentar-ho",
    analysisCompleted: "Anàlisi d'imatge completada amb èxit!",
  },
  analyzeVideo: {
    noVideoFound:
      'Falta el fitxer de vídeo. Si us plau, selecciona i puja un vídeo per continuar',
    uploadVideoStorageError:
      'Hem trobat un error mentre pujàvem el teu vídeo. Si us plau, comprova la teva connexió i torna a intentar-ho',
    interpretationNotSaved:
      "No s'ha pogut desar el resultat de l'anàlisi. Si us plau, comprova la teva connexió i torna a intentar-ho",
    analysisCompleted: 'Anàlisi de vídeo completada amb èxit!',
  },

  incrementUsersScans: {
    incrementSuccessScan: "S'ha utilitzat un escanejat més",
    generalError: "No s'ha pogut incrementar el nombre d'escanejats!",
  },
  decrementUserScans: {
    decrementSuccessScan: "S'ha decrementat un escanejat",
    decrementErrorScan:
      "Hi ha hagut un problema actualitzant el nombre d'escanejats. Si us plau, torna a intentar-ho més tard",
    generalError: "No s'ha pogut decrementar el nombre d'escanejats!",
  },
  updateUserSubscription: {
    subscribeSuccess: 'Subscripció realitzada amb èxit!',
    updateSubscriptionError:
      "No s'ha pogut actualitzar la subscripció de l'usuari!",
  },
  updateUserLanguage: {
    updateSuccess: 'Idioma actualitzat amb èxit!',
    updateError:
      "S'ha produït un error inesperat mentre s'actualitzava l'idioma. Si us plau, torna a intentar-ho més tard",
  },

  getUserInfo: {
    successGetInfo:
      "S'han obtingut les dades d'informació de l'usuari amb èxit",
    errorGetInfo:
      "S'ha produït un error inesperat mentre es recuperava la informació de l'usuari. Si us plau, torna a intentar-ho més tard",
  },
  getUserInfoById: {
    noUserInfoData:
      "El document d'usuari existeix, però no hi ha dades disponibles",
    getUserFetchError:
      "S'ha produït un error mentre es recuperava la informació de l'usuari",
  },

  updateScanInterpretation: {
    success: "Registre d'interpretació d'escanejat actualitzat amb èxit!",
    generalError:
      "S'ha produït un error mentre s'actualitzava la interpretació de l'escanejat",
    paramsRequired: "Es requereixen tant 'documentId' com 'fieldsToUpdate'",
  },
  deleteScanInterpretation: {
    success: "L'informe s'ha eliminat amb èxit!",
    documentIdRequired: "Es requereix 'DocumentId' per continuar.",
    generalError:
      "Alguna cosa ha anat malament mentre s'eliminava l'informe. Si us plau, torna a intentar-ho.",
  },

  getInterpretationByDocumentId: {
    paramsRequired: "Es requereix 'DocumentId'",
    noDocIdFound:
      "No s'ha trobat cap document amb l'identificador proporcionat",
    success: 'Document recuperat amb èxit',
    generalError:
      "S'ha produït un error mentre es recuperava la interpretació per l'identificador de document proporcionat",
  },

  getRecentInterpretation: {
    limitRequired: 'El límit ha de ser un número entre 1 i 100',
    noInterpretationFound: "No s'han trobat interpretacions",
    success: 'Interpretacions recents recuperades amb èxit!',
    generalError:
      "S'ha produït un error mentre es recuperaven les interpretacions recents",
    generalErrorAdditional: "S'ha produït un error intern del servidor",
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Proporcionar un token de dispositiu és obligatori.',
    generalError: 'Error emmagatzemant el token del dispositiu',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'El títol i el cos de la notificació són obligatoris.',
    generalError: "S'ha produït un error processant les notificacions",
    generalErrorAdditional: "No s'ha pogut enviar la notificació global",
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: "L'identificador del dispositiu és obligatori",
    languageMandatory: "L'idioma és obligatori",
    deviceIdentified: "El teu dispositiu s'ha identificat amb èxit",
    generalError:
      "S'ha produït un error mentre es comprovava la prova del dispositiu",
  },

  getUserNotification: {
    generalError: "No s'han pogut recuperar les notificacions de l'usuari",
    generalErrorAdditional:
      "S'ha produït un error mentre es recuperaven les notificacions de l'usuari",
  },

  getScanCategories: {
    noCategoryFound: "No s'han trobat categories",
    generalError:
      "S'ha produït un error mentre es recuperaven les categories d'escanejat",
  },

  uploadScanCategories: {
    successfullyUploaded: "Categories d'escanejat pujades amb èxit",
    generalError: "No s'han pogut pujar les categories d'escanejat",
  },

  sendUserNotification: {
    noTokenFound:
      "No s'han trobat tokens vàlids d'Expo. No es poden enviar notificacions",
    generalError: "No s'ha pogut enviar la notificació",
  },

  updateUser: {
    successUpdatedUser: 'Usuari actualitzat amb èxit',
    updateUserError:
      "No s'ha pogut actualitzar el registre de l'usuari. Si us plau, torna a intentar-ho.",
  },

  loginUserAnonymously: {
    mandatoryUsername: 'Tria un sobrenom i comencem!',
    userLoggedIn: 'Benvingut/da de nou! Ja estàs dins.',
    accountCreated: 'Ja estàs dins! Gaudeix explorant!',
    error:
      'Vaja! Alguna cosa ha anat malament. Si us plau, comprova la teva connexió i torna a intentar-ho.',
  },
  continueConversation: {
    messagesLimit:
      'Ària està a plena capacitat! Puja un altre escanejat per continuar rebent anàlisis i insights',
    conversationNotFound: "No s'ha pogut trobar la conversa",
    serviceIssueAi:
      "Sembla que hi ha un problema amb el servei d'IA. Si us plau, torna a intentar-ho.",
    noResponseAiService:
      "No s'ha pogut obtenir una resposta vàlida del servei d'IA. Si us plau, torna a intentar-ho",
  },
};

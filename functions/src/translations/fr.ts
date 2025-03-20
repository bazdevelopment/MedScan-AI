import { ITranslation } from './types';

export const fr: ITranslation = {
  common: {
    welcome: 'Bienvenue',
    error: 'Une erreur est survenue',
    loading: 'Chargement...',
    noUserFound:
      "Vous n'êtes pas autorisé à effectuer cette demande. Veuillez vous connecter",
    userIdMissing:
      "Il semble que l'identifiant utilisateur soit manquant. Veuillez le fournir pour continuer",
    scanLimitReached:
      'Vous avez atteint le nombre maximum de numérisations autorisées. Veuillez mettre à niveau votre forfait pour continuer à utiliser le service',
    mandatoryLanguage: 'Le code de langue est requis',
  },
  auth: {
    signIn: 'Se connecter',
    signUp: "S'inscrire",
  },
  loginUserViaEmail: {
    mandatoryEmail: 'Veuillez fournir votre adresse e-mail pour continuer',
    invalidEmail:
      "L'adresse e-mail saisie n'est pas valide. Veuillez la vérifier et réessayer",
    accountCreated:
      'Votre compte a été créé avec succès ! Veuillez vérifier votre e-mail pour obtenir le code de vérification',
    verificationCodeSent:
      'Nous avons envoyé un code de vérification à votre e-mail. Veuillez vérifier votre boîte de réception',
    internalError:
      "Une erreur s'est produite lors du traitement de votre authentification par e-mail. Veuillez réessayer",
  },
  sendEmailVerification: {
    emailMandatory: 'Une adresse e-mail est requise pour continuer',
    emailUsed:
      'Cette adresse e-mail est déjà utilisée. Veuillez en utiliser une autre',
    userNotFound:
      "Nous n'avons pas trouvé l'utilisateur spécifié. Veuillez vérifier vos informations et réessayer",
    verificationCodeSent:
      'Le code de vérification a été envoyé avec succès à votre e-mail',
    generalError:
      "Une erreur s'est produite lors du démarrage de la vérification par e-mail",
  },
  getInterpretationByDate: {
    startEndDateRequired: 'La date de début et la date de fin sont requises.',
    startDatePriority:
      'La date de début ne peut pas être postérieure à la date de fin.',
    generalError: 'Impossible de récupérer les analyses.',
  },
  verifyAuthenticationCode: {
    authCodeMandatory:
      "Un code d'authentification est obligatoire pour continuer",
    emailAddressMandatory: "L'adresse e-mail est obligatoire pour continuer",
    userNotFound:
      "L'utilisateur spécifié n'a pas été trouvé. Veuillez vérifier vos informations et réessayer",
    invalidAuthCode:
      "Oups ! Ce code d'authentification n'est pas valide. Veuillez vérifier et réessayer !",
    authCodeExpired:
      'Oups ! Votre code a expiré. Veuillez réessayer de vous connecter avec votre adresse e-mail ou cliquer sur "Renvoyer le code"',
    authCodeVerified: "L'utilisateur a été vérifié avec succès",
    generalError:
      'Oups ! Nous avons rencontré une erreur lors de la vérification de votre code',
  },
  analyzeImage: {
    scanLimitReached:
      'Vous avez atteint le nombre maximum de numérisations autorisées. Veuillez mettre à niveau votre forfait pour continuer à utiliser le service',
    imageMissing:
      'Image manquante. Veuillez sélectionner et télécharger une image pour continuer',
    uploadImageStorageError:
      'Nous avons rencontré une erreur lors du téléchargement de votre image. Veuillez vérifier votre connexion et réessayer',
    interpretationNotSaved:
      "Impossible d'enregistrer le résultat de l'analyse. Veuillez vérifier votre connexion et réessayer",
    analysisCompleted: "Analyse d'image terminée avec succès !",
  },
  analyzeVideo: {
    noVideoFound:
      'Fichier vidéo manquant. Veuillez sélectionner et télécharger une vidéo pour continuer',
    uploadVideoStorageError:
      'Nous avons rencontré une erreur lors du téléchargement de votre vidéo. Veuillez vérifier votre connexion et réessayer',
    interpretationNotSaved:
      "Impossible d'enregistrer le résultat de l'analyse. Veuillez vérifier votre connexion et réessayer",
    analysisCompleted: 'Analyse vidéo terminée avec succès !',
  },
  incrementUsersScans: {
    incrementSuccessScan: 'Une numérisation supplémentaire a été utilisée',
    generalError: 'Impossible de décrémenter le nombre de numérisations !',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Une numérisation a été décrémentée',
    decrementErrorScan:
      'Un problème est survenu lors de la mise à jour du nombre de numérisations. Veuillez réessayer plus tard',
    generalError: 'Impossible de décrémenter le nombre de numérisations !',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Abonnement réussi !',
    updateSubscriptionError:
      "Impossible de mettre à jour l'abonnement de l'utilisateur !",
  },
  updateUserLanguage: {
    updateSuccess: 'La langue a été mise à jour avec succès !',
    updateError:
      "Une erreur inattendue s'est produite lors de la mise à jour de la langue. Veuillez réessayer plus tard",
  },
  getUserInfo: {
    successGetInfo: 'Données utilisateur récupérées avec succès',
    errorGetInfo:
      "Une erreur inattendue s'est produite lors de la récupération des informations utilisateur. Veuillez réessayer plus tard",
  },
  getUserInfoById: {
    noUserInfoData:
      "Le document utilisateur existe, mais aucune donnée n'est disponible",
    getUserFetchError:
      "Une erreur s'est produite lors de la récupération des informations utilisateur",
  },
  updateScanInterpretation: {
    success:
      "Enregistrement d'interprétation de numérisation mis à jour avec succès !",
    generalError:
      "Une erreur s'est produite lors de la mise à jour de l'interprétation de la numérisation",
    paramsRequired:
      'Le "documentId" et les "fieldsToUpdate" sont tous deux requis',
  },
  getInterpretationByDocumentId: {
    paramsRequired: 'Le "DocumentId" est requis',
    noDocIdFound: "Aucun document n'a été trouvé avec l'identifiant fourni",
    success: 'Document récupéré avec succès',
    generalError:
      "Une erreur s'est produite lors de la récupération de l'interprétation pour l'identifiant de document fourni",
  },
  deleteScanInterpretation: {
    success: 'Le rapport a été supprimé avec succès !',
    documentIdRequired: "'DocumentId' est requis pour continuer.",
    generalError:
      "Quelque chose s'est mal passé lors de la suppression du rapport. Veuillez réessayer.",
  },
  getRecentInterpretation: {
    limitRequired: 'La limite doit être un nombre entre 1 et 100',
    noInterpretationFound: 'Aucune interprétation trouvée',
    success: 'Interprétations récentes récupérées avec succès !',
    generalError:
      "Une erreur s'est produite lors de la récupération des interprétations récentes",
    generalErrorAdditional: "Une erreur interne du serveur s'est produite",
  },
  storeDeviceToken: {
    deviceTokenRequired: "La fourniture d'un jeton d'appareil est obligatoire.",
    generalError: "Erreur lors du stockage du jeton d'appareil",
  },
  sendGlobalPushNotifications: {
    requiredParams:
      'Le titre et le contenu de la notification sont obligatoires.',
    generalError:
      "Une erreur s'est produite lors du traitement des notifications",
    generalErrorAdditional: "Échec de l'envoi de la notification globale",
  },
  checkDeviceUniqueIdentifier: {
    deviceMandatory: "L'identifiant de l'appareil est obligatoire",
    languageMandatory: 'La langue est obligatoire',
    deviceIdentified: 'Votre appareil a été identifié avec succès',
    generalError:
      "Une erreur s'est produite lors de la vérification de l'essai de l'appareil",
  },
  getUserNotification: {
    generalError: 'Échec de la récupération des notifications utilisateur',
    generalErrorAdditional:
      "Une erreur s'est produite lors de la récupération des notifications utilisateur",
  },
  getScanCategories: {
    noCategoryFound: 'Aucune catégorie trouvée',
    generalError:
      "Une erreur s'est produite lors de la récupération des catégories de numérisation",
  },
  uploadScanCategories: {
    successfullyUploaded: 'Catégories de numérisation téléchargées avec succès',
    generalError: 'Échec du téléchargement des catégories de numérisation',
  },
  sendUserNotification: {
    noTokenFound:
      "Aucun jeton Expo valide trouvé. Impossible d'envoyer des notifications",
    generalError: "Échec de l'envoi de la notification",
  },
  updateUser: {
    successUpdatedUser: 'Utilisateur mis à jour avec succès',
    updateUserError:
      "Impossible de mettre à jour l'enregistrement de l'utilisateur. Veuillez réessayer.",
  },
  loginUserAnonymously: {
    mandatoryUsername: 'Choisissez un pseudonyme et commençons!',
    userLoggedIn: 'Content de vous revoir! Vous êtes connecté.',
    accountCreated: "Vous êtes inscrit! Profitez de l'exploration!",
    error:
      "Oups! Quelque chose s'est mal passé. Veuillez vérifier votre connexion et réessayer.",
  },
  continueConversation: {
    messagesLimit:
      'Aria a atteint sa capacité maximale ! Téléversez une autre analyse pour continuer à obtenir des résultats et des insights',
    conversationNotFound: 'Impossible de trouver la conversation',
    serviceIssueAi:
      "Il semble y avoir un problème avec le service d'IA. Veuillez réessayer.",
    noResponseAiService:
      "Échec de l'obtention d'une réponse valide du service d'IA. Veuillez réessayer.",
  },
};

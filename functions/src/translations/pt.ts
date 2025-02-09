import { ITranslation } from './types';

export const pt: ITranslation = {
  common: {
    welcome: 'Bem-vindo',
    error: 'Ocorreu um erro',
    loading: 'A carregar...',
    noUserFound:
      'Não está autorizado a fazer este pedido. Por favor, inicie sessão',
    userIdMissing:
      'Parece que falta o ID do utilizador. Por favor, forneça-o para continuar',
    scanLimitReached:
      'Atingiu o número máximo de digitalizações permitidas. Atualize o seu plano para continuar a usar o serviço',
    mandatoryLanguage: 'O código do idioma é obrigatório',
  },
  auth: {
    signIn: 'Iniciar Sessão',
    signUp: 'Registar',
  },
  loginUserViaEmail: {
    mandatoryEmail:
      'Por favor, forneça o seu endereço de e-mail para continuar',
    invalidEmail:
      'O endereço de e-mail introduzido é inválido. Por favor, verifique e tente novamente',
    accountCreated:
      'A sua conta foi criada com sucesso! Por favor, verifique o seu e-mail para obter o código de verificação',
    verificationCodeSent:
      'Enviamos um código de verificação para o seu e-mail. Por favor, verifique a sua caixa de entrada',
    internalError:
      'Ocorreu um erro ao processar a sua autenticação por e-mail. Por favor, tente novamente',
  },
  sendEmailVerification: {
    emailMandatory: 'É necessário um endereço de e-mail para continuar',
    emailUsed:
      'Este endereço de e-mail já está em uso. Por favor, utilize outro',
    userNotFound:
      'Não foi possível encontrar o utilizador especificado. Por favor, verifique os seus dados e tente novamente',
    verificationCodeSent:
      'O código de verificação foi enviado com sucesso para o seu e-mail',
    generalError: 'Ocorreu um erro ao iniciar a verificação por e-mail',
  },
  getInterpretationByDate: {
    startEndDateRequired: 'A data de início e a data de fim são obrigatórias.',
    startDatePriority: 'A data de início não pode ser posterior à data de fim.',
    generalError: 'Não foi possível recuperar as análises.',
  },
  verifyAuthenticationCode: {
    authCodeMandatory: 'Um código de autenticação é obrigatório para continuar',
    emailAddressMandatory: 'O endereço de e-mail é obrigatório para continuar',
    userNotFound:
      'Não foi possível encontrar o utilizador especificado. Por favor, verifique os seus dados e tente novamente',
    invalidAuthCode:
      'Oops! Este não é um código de autenticação válido. Por favor, verifique e tente novamente!',
    authCodeExpired:
      "Oops! O seu código expirou. Por favor, tente novamente o login com o seu endereço de e-mail ou clique em 'Reenviar código'",
    authCodeVerified: 'O utilizador foi verificado com sucesso',
    generalError: 'Oops! Ocorreu um erro ao verificar o seu código',
  },
  analyzeImage: {
    scanLimitReached:
      'Atingiu o número máximo de digitalizações permitidas. Atualize o seu plano para continuar a usar o serviço',
    imageMissing:
      'Falta a imagem. Por favor, selecione e carregue uma imagem para continuar',
    uploadImageStorageError:
      'Ocorreu um erro ao carregar a sua imagem. Por favor, verifique a sua conexão e tente novamente',
    interpretationNotSaved:
      'Não foi possível guardar o resultado da análise. Por favor, verifique a sua conexão e tente novamente',
    analysisCompleted: 'Análise de imagem concluída com sucesso!',
  },
  analyzeVideo: {
    noVideoFound:
      'Falta o ficheiro de vídeo. Por favor, selecione e carregue um vídeo para continuar',
    uploadVideoStorageError:
      'Ocorreu um erro ao carregar o seu vídeo. Por favor, verifique a sua conexão e tente novamente',
    interpretationNotSaved:
      'Não foi possível guardar o resultado da análise. Por favor, verifique a sua conexão e tente novamente',
    analysisCompleted: 'Análise de vídeo concluída com sucesso!',
  },
  incrementUsersScans: {
    incrementSuccessScan: 'Mais uma digitalização foi utilizada',
    generalError: 'Não foi possível decrementar o número de digitalizações!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Uma digitalização foi decrementada',
    decrementErrorScan:
      'Ocorreu um problema ao atualizar o número de digitalizações. Por favor, tente novamente mais tarde',
    generalError: 'Não foi possível decrementar o número de digitalizações!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Subscrição realizada com sucesso!',
    updateSubscriptionError:
      'Não foi possível atualizar a subscrição do utilizador!',
  },
  updateUserLanguage: {
    updateSuccess: 'Idioma atualizado com sucesso!',
    updateError:
      'Ocorreu um erro inesperado ao atualizar o idioma. Por favor, tente novamente mais tarde',
  },
  getUserInfo: {
    successGetInfo: 'Informações do utilizador obtidas com sucesso',
    errorGetInfo:
      'Ocorreu um erro inesperado ao obter as informações do utilizador. Por favor, tente novamente mais tarde',
  },
  getUserInfoById: {
    noUserInfoData:
      'O documento do utilizador existe, mas não há dados disponíveis',
    getUserFetchError: 'Ocorreu um erro ao obter as informações do utilizador',
  },
  updateScanInterpretation: {
    success:
      'Registo de interpretação da digitalização atualizado com sucesso!',
    generalError:
      'Ocorreu um erro ao atualizar a interpretação da digitalização',
    paramsRequired: "'documentId' e 'fieldsToUpdate' são ambos obrigatórios",
  },
  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' é obrigatório",
    noDocIdFound: 'Nenhum documento foi encontrado com o ID fornecido',
    success: 'Documento obtido com sucesso',
    generalError:
      'Ocorreu um erro ao obter a interpretação para o ID do documento fornecido',
  },
  getRecentInterpretation: {
    limitRequired: 'O limite deve ser um número entre 1 e 100',
    noInterpretationFound: 'Nenhuma interpretação encontrada',
    success: 'Interpretações recentes obtidas com sucesso!',
    generalError: 'Ocorreu um erro ao obter interpretações recentes',
    generalErrorAdditional: 'Ocorreu um erro interno no servidor',
  },
  storeDeviceToken: {
    deviceTokenRequired: 'Fornecer um token de dispositivo é obrigatório.',
    generalError: 'Erro ao guardar o token do dispositivo',
  },
  sendGlobalPushNotifications: {
    requiredParams: 'O título e o corpo da notificação são obrigatórios.',
    generalError: 'Ocorreu um erro ao processar as notificações',
    generalErrorAdditional: 'Falha ao enviar notificação global',
  },
  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'O ID do dispositivo é obrigatório',
    languageMandatory: 'O idioma é obrigatório',
    deviceIdentified: 'O seu dispositivo foi identificado com sucesso',
    generalError: 'Ocorreu um erro ao verificar o trial do dispositivo',
  },
  getUserNotification: {
    generalError: 'Falha ao obter as notificações do utilizador',
    generalErrorAdditional:
      'Ocorreu um erro ao obter as notificações do utilizador',
  },
  getScanCategories: {
    noCategoryFound: 'Nenhuma categoria encontrada',
    generalError: 'Ocorreu um erro ao obter as categorias de digitalização',
  },
  uploadScanCategories: {
    successfullyUploaded: 'Categorias de digitalização carregadas com sucesso',
    generalError: 'Falha ao carregar as categorias de digitalização',
  },
  sendUserNotification: {
    noTokenFound:
      'Nenhum token Expo válido encontrado. Não foi possível enviar notificações',
    generalError: 'Falha ao enviar notificação',
  },
  updateUser: {
    successUpdatedUser: 'Utilizador atualizado com sucesso',
    updateUserError:
      'Não foi possível atualizar o registo do utilizador. Por favor, tente novamente.',
  },
};

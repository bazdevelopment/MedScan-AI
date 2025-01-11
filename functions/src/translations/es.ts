import { ITranslation } from './types';

export const es: ITranslation = {
  common: {
    welcome: 'Bienvenido',
    error: 'Ocurrió un error',
    loading: 'Cargando...',
    noUserFound:
      'No estás autorizado para realizar esta solicitud. Por favor, inicia sesión.',
    userIdMissing:
      'Parece que falta el ID de usuario. Por favor, proporciónalo para continuar.',
    scanLimitReached:
      'Has alcanzado el número máximo de escaneos permitidos. Por favor, mejora tu plan para seguir usando el servicio.',
    mandatoryLanguage: 'El código de idioma es obligatorio.',
  },
  auth: {
    signIn: 'Iniciar sesión',
    signUp: 'Registrarse',
    forgotPassword: '¿Olvidaste tu contraseña?',
  },

  loginUserViaEmail: {
    mandatoryEmail:
      'Por favor, proporciona tu dirección de correo electrónico para continuar.',
    invalidEmail:
      'La dirección de correo electrónico ingresada no es válida. Por favor, verifícala e inténtalo de nuevo.',
    accountCreated:
      '¡Tu cuenta ha sido creada con éxito! Por favor, revisa tu correo electrónico para obtener el código de verificación.',
    verificationCodeSent:
      'Hemos enviado un código de verificación a tu correo electrónico. Por favor, revisa tu bandeja de entrada.',
    internalError:
      'Hubo un error al procesar tu autenticación por correo electrónico. Por favor, inténtalo de nuevo.',
  },

  sendEmailVerification: {
    emailMandatory:
      'Se requiere una dirección de correo electrónico para continuar.',
    emailUsed:
      'Esta dirección de correo electrónico ya está en uso. Por favor, utiliza otra diferente.',
    userNotFound:
      'No pudimos encontrar al usuario especificado. Por favor, verifica tus datos e inténtalo de nuevo.',
    verificationCodeSent:
      'El código de verificación se ha enviado exitosamente a tu correo electrónico.',
    generalError:
      'Ocurrió un error al iniciar la verificación por correo electrónico.',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'Se requieren las fechas de inicio y fin.',
    startDatePriority:
      'La fecha de inicio no puede ser posterior a la fecha de fin.',
    generalError: 'No se pudieron recuperar los análisis.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory:
      'Es obligatorio proporcionar un código de autenticación para continuar.',
    emailAddressMandatory:
      'Es obligatorio proporcionar una dirección de correo electrónico para continuar.',
    userNotFound:
      'No se pudo encontrar al usuario especificado. Por favor, verifica tus datos e inténtalo de nuevo.',
    invalidAuthCode:
      '¡Vaya! Este no es un código de autenticación válido. ¡Por favor, verifícalo e inténtalo de nuevo!',
    authCodeExpired:
      '¡Vaya! Tu código ha expirado. Por favor, vuelve a intentar iniciar sesión con tu dirección de correo electrónico.',
    authCodeVerified: 'El usuario ha sido verificado con éxito.',
    generalError: '¡Vaya! Encontramos un error al verificar tu código.',
  },

  analyzeImage: {
    scanLimitReached:
      'Has alcanzado el número máximo de escaneos permitidos. Por favor, mejora tu plan para seguir usando el servicio.',
    imageMissing:
      'Falta la imagen. Por favor, selecciona y sube una imagen para continuar.',
    uploadImageStorageError:
      'Encontramos un error al subir tu imagen. Por favor, verifica tu conexión e inténtalo de nuevo.',
    interpretationNotSaved:
      'No se pudo guardar el resultado del análisis. Por favor, verifica tu conexión e inténtalo de nuevo.',
    analysisCompleted: '¡El análisis de la imagen se completó con éxito!',
  },
  analyzeVideo: {
    noVideoFound:
      'Falta el archivo de video. Por favor, selecciona y sube un video para continuar.',
    uploadVideoStorageError:
      'Encontramos un error al subir tu video. Por favor, verifica tu conexión e inténtalo de nuevo.',
    interpretationNotSaved:
      'No se pudo guardar el resultado del análisis. Por favor, verifica tu conexión e inténtalo de nuevo.',
    analysisCompleted: '¡El análisis del video se completó con éxito!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'Se ha usado un escaneo más.',
    generalError: '¡No se pudo incrementar el número de escaneos!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Se ha descontado un escaneo.',
    decrementErrorScan:
      'Hubo un problema al actualizar el número de escaneos. Por favor, inténtalo de nuevo más tarde.',
    generalError: '¡No se pudo descontar el número de escaneos!',
  },
  updateUserSubscription: {
    subscribeSuccess: '¡Suscripción realizada con éxito!',
    updateSubscriptionError:
      '¡No se pudo actualizar la suscripción del usuario!',
  },
  updateUserLanguage: {
    updateSuccess: '¡El idioma se actualizó con éxito!',
    updateError:
      'Ocurrió un error inesperado al actualizar el idioma. Por favor, inténtalo de nuevo más tarde.',
  },

  getUserInfo: {
    successGetInfo: 'Datos de usuario obtenidos exitosamente.',
    errorGetInfo:
      'Ocurrió un error inesperado al obtener la información del usuario. Por favor, inténtalo de nuevo más tarde.',
  },
  getUserInfoById: {
    noUserInfoData:
      'El documento del usuario existe, pero no hay datos disponibles.',
    getUserFetchError:
      'Ocurrió un error al obtener la información del usuario.',
  },

  updateScanInterpretation: {
    success:
      '¡El registro de interpretación del escaneo se actualizó con éxito!',
    generalError:
      'Ocurrió un error al actualizar la interpretación del escaneo.',
    paramsRequired: "'documentId' y 'fieldsToUpdate' son ambos obligatorios.",
  },

  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' es obligatorio.",
    noDocIdFound: 'No se encontró ningún documento con el ID proporcionado.',
    success: 'Documento obtenido con éxito.',
    generalError:
      'Ocurrió un error al obtener la interpretación para el ID de documento proporcionado.',
  },

  getRecentInterpretation: {
    limitRequired: 'El límite debe ser un número entre 1 y 100.',
    noInterpretationFound: 'No se encontraron interpretaciones.',
    success: '¡Interpretaciones recientes obtenidas con éxito!',
    generalError: 'Ocurrió un error al obtener las interpretaciones recientes.',
    generalErrorAdditional: 'Ocurrió un error interno del servidor.',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Es obligatorio proporcionar un token de dispositivo.',
    generalError: 'Error al almacenar el token del dispositivo.',
  },

  sendGlobalPushNotifications: {
    requiredParams:
      'El título y el cuerpo de la notificación son obligatorios.',
    generalError: 'Ocurrió un error al procesar las notificaciones.',
    generalErrorAdditional: 'No se pudo enviar la notificación global.',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'El ID del dispositivo es obligatorio.',
    languageMandatory: 'El idioma es obligatorio.',
    deviceIdentified: 'Tu dispositivo ha sido identificado con éxito.',
    generalError:
      'Ocurrió un error al verificar el identificador único del dispositivo.',
  },

  getUserNotification: {
    generalError: 'No se pudieron obtener las notificaciones del usuario.',
    generalErrorAdditional:
      'Ocurrió un error al obtener las notificaciones del usuario.',
  },

  getScanCategories: {
    noCategoryFound: 'No se encontraron categorías.',
    generalError: 'Ocurrió un error al recuperar las categorías de escaneo.',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Categorías de escaneo subidas con éxito.',
    generalError: 'No se pudieron subir las categorías de escaneo.',
  },

  sendUserNotification: {
    noTokenFound:
      'No se encontraron tokens de Expo válidos. No se pueden enviar notificaciones.',
    generalError: 'No se pudo enviar la notificación.',
  },
};

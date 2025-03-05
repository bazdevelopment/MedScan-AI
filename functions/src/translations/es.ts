import { ITranslation } from './types';

export const es: ITranslation = {
  common: {
    welcome: 'Bienvenido',
    error: 'Ocurrió un error',
    loading: 'Cargando...',
    noUserFound:
      'No estás autorizado para realizar esta solicitud. Por favor, inicia sesión',
    userIdMissing:
      'Parece que falta el ID de usuario. Por favor, proporciónalo para continuar',
    scanLimitReached:
      'Has alcanzado el número máximo de escaneos permitidos. Actualiza tu plan para seguir utilizando el servicio',
    mandatoryLanguage: 'El código de idioma es obligatorio',
  },
  auth: {
    signIn: 'Iniciar Sesión',
    signUp: 'Registrarse',
  },
  loginUserViaEmail: {
    mandatoryEmail:
      'Por favor, proporciona tu dirección de correo electrónico para continuar',
    invalidEmail:
      'La dirección de correo electrónico ingresada no es válida. Por favor, verifícala e intenta nuevamente',
    accountCreated:
      '¡Tu cuenta ha sido creada con éxito! Por favor, revisa tu correo electrónico para obtener el código de verificación',
    verificationCodeSent:
      'Hemos enviado un código de verificación a tu correo electrónico. Por favor, revisa tu bandeja de entrada',
    internalError:
      'Hubo un error al procesar tu autenticación por correo electrónico. Por favor, intenta nuevamente',
  },
  sendEmailVerification: {
    emailMandatory:
      'Se requiere una dirección de correo electrónico para continuar',
    emailUsed:
      'Esta dirección de correo electrónico ya está en uso. Por favor, utiliza una diferente',
    userNotFound:
      'No pudimos encontrar el usuario especificado. Por favor, verifica tus detalles e intenta nuevamente',
    verificationCodeSent:
      'El código de verificación ha sido enviado con éxito a tu correo electrónico',
    generalError:
      'Ocurrió un error al iniciar la verificación por correo electrónico',
  },
  getInterpretationByDate: {
    startEndDateRequired: 'Se requieren la fecha de inicio y la fecha de fin.',
    startDatePriority:
      'La fecha de inicio no puede ser posterior a la fecha de fin.',
    generalError: 'No se pudieron recuperar los análisis.',
  },
  verifyAuthenticationCode: {
    authCodeMandatory:
      'Un código de autenticación es obligatorio para continuar',
    emailAddressMandatory:
      'La dirección de correo electrónico es obligatoria para continuar',
    userNotFound:
      'No se pudo encontrar el usuario especificado. Por favor, verifica tus detalles e intenta nuevamente',
    invalidAuthCode:
      '¡Oops! Este no es un código de autenticación válido. Por favor, verifícalo e intenta nuevamente',
    authCodeExpired:
      "¡Oops! Tu código ha expirado. Por favor, intenta iniciar sesión nuevamente con tu correo electrónico o haz clic en 'Reenviar código'",
    authCodeVerified: 'El usuario ha sido verificado con éxito',
    generalError: '¡Oops! Ocurrió un error al verificar tu código',
  },
  analyzeImage: {
    scanLimitReached:
      'Has alcanzado el número máximo de escaneos permitidos. Actualiza tu plan para seguir utilizando el servicio',
    imageMissing:
      'Falta la imagen. Por favor, selecciona y sube una imagen para continuar',
    uploadImageStorageError:
      'Ocurrió un error al subir tu imagen. Por favor, verifica tu conexión e intenta nuevamente',
    interpretationNotSaved:
      'No se pudo guardar el resultado del análisis. Por favor, verifica tu conexión e intenta nuevamente',
    analysisCompleted: '¡Análisis de imagen completado con éxito!',
  },
  analyzeVideo: {
    noVideoFound:
      'Falta el archivo de video. Por favor, selecciona y sube un video para continuar',
    uploadVideoStorageError:
      'Ocurrió un error al subir tu video. Por favor, verifica tu conexión e intenta nuevamente',
    interpretationNotSaved:
      'No se pudo guardar el resultado del análisis. Por favor, verifica tu conexión e intenta nuevamente',
    analysisCompleted: '¡Análisis de video completado con éxito!',
  },
  incrementUsersScans: {
    incrementSuccessScan: 'Se ha utilizado un escaneo más',
    generalError: 'No se pudo decrementar el número de escaneos',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Se ha decrementado un escaneo',
    decrementErrorScan:
      'Hubo un problema al actualizar el número de escaneos. Por favor, intenta nuevamente más tarde',
    generalError: 'No se pudo decrementar el número de escaneos',
  },
  deleteScanInterpretation: {
    success: '¡El informe se ha eliminado correctamente!',
    documentIdRequired: "Se requiere 'DocumentId' para continuar.",
    generalError:
      'Algo salió mal al eliminar el informe. Por favor, inténtelo de nuevo.',
  },
  updateUserSubscription: {
    subscribeSuccess: '¡Suscripción exitosa!',
    updateSubscriptionError: 'No se pudo actualizar la suscripción del usuario',
  },
  updateUserLanguage: {
    updateSuccess: '¡Idioma actualizado con éxito!',
    updateError:
      'Ocurrió un error inesperado al actualizar el idioma. Por favor, intenta nuevamente más tarde',
  },
  getUserInfo: {
    successGetInfo: 'Datos de userInfo obtenidos con éxito',
    errorGetInfo:
      'Ocurrió un error inesperado al obtener la información del usuario. Por favor, intenta nuevamente más tarde',
  },
  getUserInfoById: {
    noUserInfoData:
      'El documento del usuario existe, pero no hay datos disponibles',
    getUserFetchError: 'Ocurrió un error al obtener la información del usuario',
  },
  updateScanInterpretation: {
    success: '¡Registro de interpretación de escaneo actualizado con éxito!',
    generalError:
      'Ocurrió un error al actualizar la interpretación del escaneo',
    paramsRequired: "Se requieren 'documentId' y 'fieldsToUpdate'",
  },
  getInterpretationByDocumentId: {
    paramsRequired: "Se requiere 'DocumentId'",
    noDocIdFound: 'No se encontró ningún documento con el ID proporcionado',
    success: 'Documento obtenido con éxito',
    generalError:
      'Ocurrió un error al obtener la interpretación para el ID de documento proporcionado',
  },
  getRecentInterpretation: {
    limitRequired: 'El límite debe ser un número entre 1 y 100',
    noInterpretationFound: 'No se encontraron interpretaciones',
    success: '¡Interpretaciones recientes obtenidas con éxito!',
    generalError: 'Ocurrió un error al obtener las interpretaciones recientes',
    generalErrorAdditional: 'Ocurrió un error interno del servidor',
  },
  storeDeviceToken: {
    deviceTokenRequired: 'Proporcionar un token de dispositivo es obligatorio.',
    generalError: 'Error al almacenar el token del dispositivo',
  },
  sendGlobalPushNotifications: {
    requiredParams:
      'El título y el cuerpo de la notificación son obligatorios.',
    generalError: 'Ocurrió un error al procesar las notificaciones',
    generalErrorAdditional: 'No se pudo enviar la notificación global',
  },
  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'El ID del dispositivo es obligatorio',
    languageMandatory: 'El idioma es obligatorio',
    deviceIdentified: 'Tu dispositivo ha sido identificado con éxito',
    generalError: 'Ocurrió un error al verificar el dispositivo',
  },
  getUserNotification: {
    generalError: 'No se pudieron obtener las notificaciones del usuario',
    generalErrorAdditional:
      'Ocurrió un error al obtener las notificaciones del usuario',
  },
  getScanCategories: {
    noCategoryFound: 'No se encontraron categorías',
    generalError: 'Ocurrió un error al obtener las categorías de escaneo',
  },
  uploadScanCategories: {
    successfullyUploaded: 'Categorías de escaneo subidas con éxito',
    generalError: 'No se pudieron subir las categorías de escaneo',
  },
  sendUserNotification: {
    noTokenFound:
      'No se encontraron tokens válidos de Expo. No se pueden enviar notificaciones',
    generalError: 'No se pudo enviar la notificación',
  },
  updateUser: {
    successUpdatedUser: 'Usuario actualizado con éxito',
    updateUserError:
      'No se pudo actualizar el registro del usuario. Por favor, intenta nuevamente.',
  },
  loginUserAnonymously: {
    mandatoryUsername: '¡Elige un apodo y comencemos!',
    userLoggedIn: '¡Bienvenido de nuevo! Estás dentro.',
    accountCreated: '¡Estás dentro! ¡Disfruta explorando!',
    error:
      '¡Ups! Algo salió mal. Por favor, revisa tu conexión e inténtalo de nuevo.',
  },
};

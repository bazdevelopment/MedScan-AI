import { ITranslation } from './types';

export const ru: ITranslation = {
  common: {
    welcome: 'Добро пожаловать',
    error: 'Произошла ошибка',
    loading: 'Загрузка...',
    noUserFound:
      'Вы не авторизованы для выполнения этого запроса. Пожалуйста, войдите в систему',
    userIdMissing:
      'Похоже, идентификатор пользователя отсутствует. Пожалуйста, укажите его для продолжения',
    scanLimitReached:
      'Вы достигли максимального количества сканирований. Пожалуйста, обновите тарифный план, чтобы продолжить использование сервиса',
    mandatoryLanguage: 'Требуется указать код языка',
  },
  auth: {
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
  },
  loginUserViaEmail: {
    mandatoryEmail:
      'Пожалуйста, укажите ваш адрес электронной почты для продолжения',
    invalidEmail:
      'Указанный адрес электронной почты недействителен. Пожалуйста, проверьте его и попробуйте снова',
    accountCreated:
      'Ваш аккаунт успешно создан! Пожалуйста, проверьте вашу почту для получения кода подтверждения',
    verificationCodeSent:
      'Мы отправили код подтверждения на вашу электронную почту. Пожалуйста, проверьте ваш почтовый ящик',
    internalError:
      'Произошла ошибка при обработке вашей аутентификации через электронную почту. Пожалуйста, попробуйте снова',
  },
  sendEmailVerification: {
    emailMandatory: 'Требуется указать адрес электронной почты для продолжения',
    emailUsed:
      'Этот адрес электронной почты уже используется. Пожалуйста, используйте другой',
    userNotFound:
      'Указанный пользователь не найден. Пожалуйста, проверьте ваши данные и попробуйте снова',
    verificationCodeSent:
      'Код подтверждения успешно отправлен на вашу электронную почту',
    generalError: 'Произошла ошибка при запуске проверки электронной почты',
  },
  getInterpretationByDate: {
    startEndDateRequired: 'Требуется указать дату начала и дату окончания.',
    startDatePriority: 'Дата начала не может быть позже даты окончания.',
    generalError: 'Не удалось получить анализы.',
  },
  verifyAuthenticationCode: {
    authCodeMandatory: 'Требуется указать код аутентификации для продолжения',
    emailAddressMandatory:
      'Требуется указать адрес электронной почты для продолжения',
    userNotFound:
      'Указанный пользователь не найден. Пожалуйста, проверьте ваши данные и попробуйте снова',
    invalidAuthCode:
      'Упс! Это недействительный код аутентификации. Пожалуйста, проверьте и попробуйте снова!',
    authCodeExpired:
      "Упс! Ваш код истек. Пожалуйста, попробуйте войти снова, используя ваш адрес электронной почты, или нажмите 'Отправить код повторно'",
    authCodeVerified: 'Пользователь успешно подтвержден',
    generalError: 'Упс! Произошла ошибка при проверке вашего кода',
  },
  analyzeImage: {
    scanLimitReached:
      'Вы достигли максимального количества сканирований. Пожалуйста, обновите тарифный план, чтобы продолжить использование сервиса',
    imageMissing:
      'Изображение отсутствует. Пожалуйста, выберите и загрузите изображение для продолжения',
    uploadImageStorageError:
      'Произошла ошибка при загрузке вашего изображения. Пожалуйста, проверьте ваше соединение и попробуйте снова',
    interpretationNotSaved:
      'Не удалось сохранить результат анализа. Пожалуйста, проверьте ваше соединение и попробуйте снова',
    analysisCompleted: 'Анализ изображения успешно завершен!',
  },
  analyzeVideo: {
    noVideoFound:
      'Видеофайл отсутствует. Пожалуйста, выберите и загрузите видео для продолжения',
    uploadVideoStorageError:
      'Произошла ошибка при загрузке вашего видео. Пожалуйста, проверьте ваше соединение и попробуйте снова',
    interpretationNotSaved:
      'Не удалось сохранить результат анализа. Пожалуйста, проверьте ваше соединение и попробуйте снова',
    analysisCompleted: 'Анализ видео успешно завершен!',
  },
  incrementUsersScans: {
    incrementSuccessScan: 'Использовано еще одно сканирование',
    generalError: 'Не удалось уменьшить количество сканирований!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Одно сканирование уменьшено',
    decrementErrorScan:
      'Произошла ошибка при обновлении количества сканирований. Пожалуйста, попробуйте позже',
    generalError: 'Не удалось уменьшить количество сканирований!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Подписка успешно оформлена!',
    updateSubscriptionError: 'Не удалось обновить подписку пользователя!',
  },
  updateUserLanguage: {
    updateSuccess: 'Язык успешно обновлен!',
    updateError:
      'Произошла непредвиденная ошибка при обновлении языка. Пожалуйста, попробуйте позже',
  },
  getUserInfo: {
    successGetInfo: 'Данные пользователя успешно получены',
    errorGetInfo:
      'Произошла непредвиденная ошибка при получении информации о пользователе. Пожалуйста, попробуйте позже',
  },
  getUserInfoById: {
    noUserInfoData: 'Документ пользователя существует, но данные отсутствуют',
    getUserFetchError:
      'Произошла ошибка при получении информации о пользователе',
  },
  updateScanInterpretation: {
    success: 'Запись интерпретации сканирования успешно обновлена!',
    generalError: 'Произошла ошибка при обновлении интерпретации сканирования',
    paramsRequired: "Требуется указать 'documentId' и 'fieldsToUpdate'",
  },
  deleteScanInterpretation: {
    success: 'Отчет успешно удален!',
    documentIdRequired: "Для продолжения требуется 'DocumentId'.",
    generalError:
      'Что-то пошло не так при удалении отчета. Пожалуйста, попробуйте еще раз.',
  },
  getInterpretationByDocumentId: {
    paramsRequired: "Требуется указать 'DocumentId'",
    noDocIdFound: 'Документ с указанным идентификатором не найден',
    success: 'Документ успешно получен',
    generalError:
      'Произошла ошибка при получении интерпретации для указанного идентификатора документа',
  },
  getRecentInterpretation: {
    limitRequired: 'Лимит должен быть числом от 1 до 100',
    noInterpretationFound: 'Интерпретации не найдены',
    success: 'Последние интерпретации успешно получены!',
    generalError: 'Произошла ошибка при получении последних интерпретаций',
    generalErrorAdditional: 'Произошла внутренняя ошибка сервера',
  },
  storeDeviceToken: {
    deviceTokenRequired: 'Требуется указать токен устройства.',
    generalError: 'Ошибка при сохранении токена устройства',
  },
  sendGlobalPushNotifications: {
    requiredParams: 'Требуется указать заголовок и текст уведомления.',
    generalError: 'Произошла ошибка при обработке уведомлений',
    generalErrorAdditional: 'Не удалось отправить глобальное уведомление',
  },
  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'Требуется указать идентификатор устройства',
    languageMandatory: 'Требуется указать язык',
    deviceIdentified: 'Ваше устройство успешно идентифицировано',
    generalError: 'Произошла ошибка при проверке пробного периода устройства',
  },
  getUserNotification: {
    generalError: 'Не удалось получить уведомления пользователя',
    generalErrorAdditional:
      'Произошла ошибка при получении уведомлений пользователя',
  },
  getScanCategories: {
    noCategoryFound: 'Категории не найдены',
    generalError: 'Произошла ошибка при получении категорий сканирования',
  },
  uploadScanCategories: {
    successfullyUploaded: 'Категории сканирования успешно загружены',
    generalError: 'Не удалось загрузить категории сканирования',
  },
  sendUserNotification: {
    noTokenFound:
      'Действительные токены Expo не найдены. Не удалось отправить уведомления',
    generalError: 'Не удалось отправить уведомление',
  },
  updateUser: {
    successUpdatedUser: 'Пользователь успешно обновлен',
    updateUserError:
      'Не удалось обновить запись пользователя. Пожалуйста, попробуйте снова.',
  },
  loginUserAnonymously: {
    mandatoryUsername: 'Выберите псевдоним и начнем!',
    userLoggedIn: 'С возвращением! Вы вошли.',
    accountCreated: 'Вы в деле! Наслаждайтесь исследованием!',
    error:
      'Упс! Что-то пошло не так. Пожалуйста, проверьте соединение и попробуйте снова.',
  },
  continueConversation: {
    messagesLimit:
      'Aria достигла максимальной загрузки! Загрузите еще один скан, чтобы продолжить получать анализ и выводы',
    conversationNotFound: 'Не удалось найти беседу',
    serviceIssueAi:
      'Похоже, возникла проблема с сервисом ИИ. Пожалуйста, попробуйте еще раз.',
    noResponseAiService:
      'Не удалось получить корректный ответ от сервиса ИИ. Пожалуйста, попробуйте еще раз.',
  },
};

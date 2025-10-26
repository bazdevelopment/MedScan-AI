import { ITranslation } from './types';

export const tr: ITranslation = {
  common: {
    welcome: 'Hoş geldiniz',
    error: 'Bir hata oluştu',
    loading: 'Yükleniyor...',
    noUserFound: 'Bu isteği yapmaya yetkiniz yok. Lütfen giriş yapın',
    userIdMissing:
      'Görünüşe göre kullanıcı kimliği eksik. Devam etmek için lütfen sağlayın',
    scanLimitReached:
      'İzin verilen maksimum tarama sayısına ulaştınız. Lütfen hizmeti kullanmaya devam etmek için planınızı yükseltin',
    mandatoryLanguage: 'Dil kodu gereklidir',
  },
  auth: {
    signIn: 'Giriş Yap',
    signUp: 'Kayıt Ol',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'Devam etmek için lütfen e-posta adresinizi sağlayın',
    invalidEmail:
      'Girilen e-posta adresi geçersiz. Lütfen kontrol edip tekrar deneyin',
    accountCreated:
      'Hesabınız başarıyla oluşturuldu! Lütfen doğrulama kodunuz için e-postanızı kontrol edin',
    verificationCodeSent:
      'E-postanıza bir doğrulama kodu gönderdik. Lütfen gelen kutunuzu kontrol edin',
    internalError:
      'E-posta ile kimlik doğrulama işleminiz sırasında bir hata oluştu. Lütfen tekrar deneyin',
  },

  sendEmailVerification: {
    emailMandatory: 'Devam etmek için e-posta adresi gereklidir',
    emailUsed:
      'Bu e-posta adresi zaten kullanılıyor. Lütfen farklı bir tane kullanın',
    userNotFound:
      'Belirtilen kullanıcı bulunamadı. Lütfen bilgilerinizi kontrol edip tekrar deneyin',
    verificationCodeSent: 'Doğrulama kodu e-postanıza başarıyla gönderildi',
    generalError: 'E-posta doğrulaması başlatılırken bir hata oluştu',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'Başlangıç tarihi ve bitiş tarihi gereklidir.',
    startDatePriority: 'Başlangıç tarihi, bitiş tarihinden sonra olamaz.',
    generalError: 'Analizler alınamadı.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory: 'Devam etmek için bir kimlik doğrulama kodu zorunludur',
    emailAddressMandatory: 'Devam etmek için e-posta adresi zorunludur',
    userNotFound:
      'Belirtilen kullanıcı bulunamadı. Lütfen bilgilerinizi kontrol edip tekrar deneyin',
    invalidAuthCode:
      'Oops! Bu geçerli bir kimlik doğrulama kodu değil. Lütfen kontrol edip tekrar deneyin!',
    authCodeExpired:
      "Oops! Kodunuzun süresi doldu. Lütfen e-posta adresinizle giriş yapmayı tekrar deneyin veya 'Kodu yeniden gönder' seçeneğine tıklayın",
    authCodeVerified: 'Kullanıcı başarıyla doğrulandı',
    generalError: 'Oops! Kodunuzu doğrularken bir hata ile karşılaştık',
  },

  analyzeImage: {
    scanLimitReached:
      'İzin verilen maksimum tarama sayısına ulaştınız. Lütfen hizmeti kullanmaya devam etmek için planınızı yükseltin',
    imageMissing:
      'Resim eksik. Lütfen devam etmek için bir resim seçin ve yükleyin',
    uploadImageStorageError:
      'Resminizi yüklerken bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin',
    interpretationNotSaved:
      'Analiz sonucu kaydedilemedi. Lütfen bağlantınızı kontrol edip tekrar deneyin',
    analysisCompleted: 'Resim analizi başarıyla tamamlandı!',
  },
  analyzeVideo: {
    noVideoFound:
      'Video dosyası eksik. Lütfen devam etmek için bir video seçin ve yükleyin',
    uploadVideoStorageError:
      'Videonuzu yüklerken bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin',
    interpretationNotSaved:
      'Analiz sonucu kaydedilemedi. Lütfen bağlantınızı kontrol edip tekrar deneyin',
    analysisCompleted: 'Video analizi başarıyla tamamlandı!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'Bir tarama daha kullanıldı',
    generalError: 'Tarama sayısı azaltılamadı!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Bir tarama azaltıldı',
    decrementErrorScan:
      'Tarama sayısı güncellenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin',
    generalError: 'Tarama sayısı azaltılamadı!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Başarıyla abone olundu!',
    updateSubscriptionError: 'Kullanıcı aboneliği güncellenemedi!',
  },
  updateUserLanguage: {
    updateSuccess: 'Dil başarıyla güncellendi!',
    updateError:
      'Dil güncellenirken beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin',
  },

  getUserInfo: {
    successGetInfo: 'Kullanıcı bilgisi verileri başarıyla alındı',
    errorGetInfo:
      'Kullanıcı bilgisi alınırken beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin',
  },
  getUserInfoById: {
    noUserInfoData: 'Kullanıcı belgesi mevcut, ancak hiç veri yok',
    getUserFetchError: 'Kullanıcı bilgisi alınırken bir hata oluştu',
  },

  updateScanInterpretation: {
    success: 'Tarama yorumlama kaydı başarıyla güncellendi!',
    generalError: 'Tarama yorumu güncellenirken bir hata oluştu',
    paramsRequired: "'documentId' ve 'fieldsToUpdate' her ikisi de gereklidir",
  },
  deleteScanInterpretation: {
    success: 'Rapor başarıyla silindi!',
    documentIdRequired: "Devam etmek için 'DocumentId' gereklidir.",
    generalError:
      'Rapor silinirken bir şeyler yanlış gitti. Lütfen tekrar deneyin.',
  },

  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' gereklidir",
    noDocIdFound: 'Sağlanan kimlikle herhangi bir belge bulunamadı',
    success: 'Belge başarıyla alındı',
    generalError: 'Sağlanan belge kimliği için yorum alınırken bir hata oluştu',
  },

  getRecentInterpretation: {
    limitRequired: 'Limit 1 ile 100 arasında bir sayı olmalıdır',
    noInterpretationFound: 'Hiç yorum bulunamadı',
    success: 'Son yorumlar başarıyla alındı!',
    generalError: 'Son yorumlar alınırken bir hata oluştu',
    generalErrorAdditional: 'Dahili sunucu hatası oluştu',
  },

  storeDeviceToken: {
    deviceTokenRequired: "Cihaz token'ı sağlamak zorunludur.",
    generalError: "Cihaz token'ı kaydetme hatası",
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Bildirim başlığı ve gövdesi zorunludur.',
    generalError: 'Bildirimler işlenirken bir hata oluştu',
    generalErrorAdditional: 'Global bildirim gönderilemedi',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'Cihaz kimliği zorunludur',
    languageMandatory: 'Dil zorunludur',
    deviceIdentified: 'Cihazınız başarıyla tanımlandı',
    generalError: 'Cihaz denemesi kontrol edilirken bir hata oluştu',
  },

  getUserNotification: {
    generalError: 'Kullanıcı bildirimleri alınamadı',
    generalErrorAdditional: 'Kullanıcı bildirimleri alınırken bir hata oluştu',
  },

  getScanCategories: {
    noCategoryFound: 'Hiç kategori bulunamadı',
    generalError: 'Tarama kategorileri alınırken bir hata oluştu',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Tarama kategorileri başarıyla yüklendi',
    generalError: 'Tarama kategorileri yüklenemedi',
  },

  sendUserNotification: {
    noTokenFound: "Geçerli Expo token'ı bulunamadı. Bildirimler gönderilemiyor",
    generalError: 'Bildirim gönderilemedi',
  },

  updateUser: {
    successUpdatedUser: 'Kullanıcı başarıyla güncellendi',
    updateUserError: 'Kullanıcı kaydı güncellenemedi. Lütfen tekrar deneyin.',
  },

  loginUserAnonymously: {
    mandatoryUsername: 'Bir kullanıcı adı seçin ve başlayalım!',
    userLoggedIn: 'Tekrar hoş geldiniz! Giriş yaptınız.',
    accountCreated: 'Giriş yaptınız! Keşfetmenin tadını çıkarın!',
    error:
      'Oops! Bir şeyler yanlış gitti. Lütfen bağlantınızı kontrol edip tekrar deneyin.',
  },
  continueConversation: {
    messagesLimit:
      'Aria tam kapasiteye ulaştı! Analiz ve içgörü almaya devam etmek için başka bir tarama yükleyin',
    conversationNotFound: 'Sohbet bulunamadı',
    serviceIssueAi:
      'AI servisiyle ilgili bir sorun var gibi görünüyor. Lütfen tekrar deneyin.',
    noResponseAiService:
      'AI servisinden geçerli bir yanıt alınamadı. Lütfen tekrar deneyin',
  },
};

import { ITranslation } from './types';

export const ar: ITranslation = {
  common: {
    welcome: 'مرحباً',
    error: 'حدث خطأ',
    loading: 'جاري التحميل...',
    noUserFound: 'غير مصرح لك بإجراء هذا الطلب. الرجاء تسجيل الدخول',
    userIdMissing: 'يبدو أن معرف المستخدم مفقود. يرجى تقديمه للمتابعة',
    scanLimitReached:
      'لقد وصلت إلى الحد الأقصى المسموح به من عمليات المسح. يرجى ترقية خطتك لمواصلة استخدام الخدمة',
    mandatoryLanguage: 'رمز اللغة مطلوب',
  },
  auth: {
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
  },
  loginUserViaEmail: {
    mandatoryEmail: 'يرجى تقديم عنوان بريدك الإلكتروني للمتابعة',
    invalidEmail:
      'عنوان البريد الإلكتروني المدخل غير صالح. يرجى التحقق منه والمحاولة مرة أخرى',
    accountCreated:
      'تم إنشاء حسابك بنجاح! يرجى التحقق من بريدك الإلكتروني للحصول على رمز التحقق',
    verificationCodeSent:
      'لقد أرسلنا رمز التحقق إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد الخاص بك',
    internalError:
      'حدث خطأ أثناء معالجة المصادقة عبر البريد الإلكتروني. حاول مرة اخرى',
  },
  sendEmailVerification: {
    emailMandatory: 'عنوان البريد الإلكتروني مطلوب للمتابعة',
    emailUsed:
      'عنوان البريد الإلكتروني مستخدم بالفعل. الرجاء استخدام عنوان آخر',
    userNotFound:
      'لم نتمكن من العثور على المستخدم المحدد. يرجى التحقق من التفاصيل الخاصة بك والمحاولة مرة أخرى',
    verificationCodeSent: 'تم إرسال رمز التحقق بنجاح إلى بريدك الإلكتروني',
    generalError: 'حدث خطأ أثناء بدء التحقق من البريد الإلكتروني',
  },
  getInterpretationByDate: {
    startEndDateRequired: 'تاريخ البدء وتاريخ الانتهاء مطلوبان.',
    startDatePriority: 'لا يمكن أن يكون تاريخ البدء بعد تاريخ الانتهاء.',
    generalError: 'تعذر استرداد التحليلات.',
  },
  verifyAuthenticationCode: {
    authCodeMandatory: 'رمز المصادقة إلزامي للمتابعة',
    emailAddressMandatory: 'عنوان البريد الإلكتروني إلزامي للمتابعة',
    userNotFound:
      'تعذر العثور على المستخدم المحدد. يرجى التحقق من التفاصيل الخاصة بك والمحاولة مرة أخرى',
    invalidAuthCode:
      'عذراً! هذا ليس رمز مصادقة صالح. يرجى التحقق والمحاولة مرة أخرى!',
    authCodeExpired:
      'عذراً! انتهت صلاحية الرمز الخاص بك. يرجى إعادة محاولة تسجيل الدخول باستخدام عنوان بريدك الإلكتروني أو النقر على "إعادة إرسال الرمز"',
    authCodeVerified: 'تم التحقق من المستخدم بنجاح',
    generalError: 'عذراً! واجهنا خطأ أثناء التحقق من الرمز الخاص بك',
  },
  analyzeImage: {
    scanLimitReached:
      'لقد وصلت إلى الحد الأقصى المسموح به من عمليات المسح. يرجى ترقية خطتك لمواصلة استخدام الخدمة',
    imageMissing: 'الصورة مفقودة. يرجى تحديد وتحميل صورة للمتابعة',
    uploadImageStorageError:
      'واجهنا خطأ أثناء تحميل صورتك. يرجى التحقق من اتصالك والمحاولة مرة أخرى',
    interpretationNotSaved:
      'تعذر حفظ نتيجة التحليل. يرجى التحقق من اتصالك والمحاولة مرة أخرى',
    analysisCompleted: 'اكتمل تحليل الصورة بنجاح!',
  },
  analyzeVideo: {
    noVideoFound: 'ملف الفيديو مفقود. يرجى تحديد وتحميل فيديو للمتابعة',
    uploadVideoStorageError:
      'واجهنا خطأ أثناء تحميل الفيديو الخاص بك. يرجى التحقق من اتصالك والمحاولة مرة أخرى',
    interpretationNotSaved:
      'تعذر حفظ نتيجة التحليل. يرجى التحقق من اتصالك والمحاولة مرة أخرى',
    analysisCompleted: 'اكتمل تحليل الفيديو بنجاح!',
  },
  incrementUsersScans: {
    incrementSuccessScan: 'تم استخدام عملية مسح إضافية',
    generalError: 'تعذر تقليل عدد عمليات المسح!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'تم خصم عملية مسح واحدة',
    decrementErrorScan:
      'حدثت مشكلة في تحديث عدد عمليات المسح. يرجى المحاولة مرة أخرى لاحقاً',
    generalError: 'تعذر تقليل عدد عمليات المسح!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'تم الاشتراك بنجاح!',
    updateSubscriptionError: 'تعذر تحديث اشتراك المستخدم!',
  },
  updateUserLanguage: {
    updateSuccess: 'تم تحديث اللغة بنجاح!',
    updateError:
      'حدث خطأ غير متوقع أثناء تحديث اللغة. يرجى المحاولة مرة أخرى لاحقاً',
  },
  getUserInfo: {
    successGetInfo: 'تم جلب بيانات المستخدم بنجاح',
    errorGetInfo:
      'حدث خطأ غير متوقع أثناء جلب معلومات المستخدم. يرجى المحاولة مرة أخرى لاحقاً',
  },
  getUserInfoById: {
    noUserInfoData: 'وثيقة المستخدم موجودة، ولكن لا تتوفر بيانات',
    getUserFetchError: 'حدث خطأ أثناء جلب معلومات المستخدم',
  },
  updateScanInterpretation: {
    success: 'تم تحديث سجل تفسير المسح بنجاح!',
    generalError: 'حدث خطأ أثناء تحديث تفسير المسح',
    paramsRequired: 'كل من "معرف المستند" و"الحقول المراد تحديثها" مطلوبة',
  },
  getInterpretationByDocumentId: {
    paramsRequired: 'معرف المستند مطلوب',
    noDocIdFound: 'لم يتم العثور على مستند بالمعرف المقدم',
    success: 'تم استرداد المستند بنجاح',
    generalError: 'حدث خطأ أثناء جلب التفسير لمعرف المستند المقدم',
  },
  getRecentInterpretation: {
    limitRequired: 'يجب أن يكون الحد رقماً بين 1 و 100',
    noInterpretationFound: 'لم يتم العثور على تفسيرات',
    success: 'تم استرداد التفسيرات الأخيرة بنجاح!',
    generalError: 'حدث خطأ أثناء استرداد التفسيرات الأخيرة',
    generalErrorAdditional: 'حدث خطأ داخلي في الخادم',
  },
  storeDeviceToken: {
    deviceTokenRequired: 'توفير رمز الجهاز إلزامي.',
    generalError: 'خطأ في تخزين رمز الجهاز',
  },
  sendGlobalPushNotifications: {
    requiredParams: 'عنوان الإشعار ومحتواه إلزاميان.',
    generalError: 'حدث خطأ أثناء معالجة الإشعارات',
    generalErrorAdditional: 'فشل في إرسال الإشعار العام',
  },
  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'معرف الجهاز إلزامي',
    languageMandatory: 'اللغة إلزامية',
    deviceIdentified: 'تم تحديد جهازك بنجاح',
    generalError: 'حدث خطأ أثناء التحقق من تجربة الجهاز',
  },
  getUserNotification: {
    generalError: 'فشل في جلب إشعارات المستخدم',
    generalErrorAdditional: 'حدث خطأ أثناء جلب إشعارات المستخدم',
  },
  getScanCategories: {
    noCategoryFound: 'لم يتم العثور على فئات',
    generalError: 'حدث خطأ أثناء استرداد فئات المسح',
  },
  uploadScanCategories: {
    successfullyUploaded: 'تم تحميل فئات المسح بنجاح',
    generalError: 'فشل في تحميل فئات المسح',
  },
  sendUserNotification: {
    noTokenFound: 'لم يتم العثور على رموز Expo صالحة. تعذر إرسال الإشعارات',
    generalError: 'فشل في إرسال الإشعار',
  },
  updateUser: {
    successUpdatedUser: 'تم تحديث المستخدم بنجاح',
    updateUserError: 'تعذر تحديث سجل المستخدم. يرجى المحاولة مرة أخرى.',
  },
};

import { ITranslation } from './types';

export const he: ITranslation = {
  common: {
    welcome: 'ברוך הבא',
    error: 'אירעה שגיאה',
    loading: 'טוען...',
    noUserFound: 'אינך מורשה לבצע בקשה זו. אנא התחבר',
    userIdMissing: 'נראה שחסר מזהה משתמש. אנא ספק אותו כדי להמשיך',
    scanLimitReached:
      'הגעת למספר הסריקות המותר המרבי. אנא שדרג את התוכנית שלך כדי להמשיך להשתמש בשירות',
    mandatoryLanguage: 'קוד השפה נדרש',
  },
  auth: {
    signIn: 'התחברות',
    signUp: 'הרשמה',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'אנא ספק את כתובת האימייל שלך כדי להמשיך',
    invalidEmail: 'כתובת האימייל שהזנת אינה תקינה. אנא אמת אותה ונסה שוב',
    accountCreated:
      'החשבון שלך נוצר בהצלחה! אנא בדוק את האימייל שלך לקבלת קוד האימות',
    verificationCodeSent:
      'שלחנו קוד אימות לכתובת האימייל שלך. אנא בדוק את תיבת הדואר הנכנס שלך',
    internalError: 'אירעה שגיאה בעיבוד האימות שלך דרך אימייל. אנא נסה שוב',
  },

  sendEmailVerification: {
    emailMandatory: 'נדרשת כתובת אימייל כדי להמשיך',
    emailUsed: 'כתובת אימייל זו כבר בשימוש. אנא השתמש באחרת',
    userNotFound: 'לא מצאנו את המשתמש שצוין. אנא בדוק את הפרטים שלך ונסה שוב',
    verificationCodeSent: 'קוד האימות נשלח בהצלחה לכתובת האימייל שלך',
    generalError: 'אירעה שגיאה בתחילת אימות האימייל',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'נדרשים תאריך התחלה ותאריך סיום.',
    startDatePriority: 'תאריך ההתחלה לא יכול להיות אחרי תאריך הסיום.',
    generalError: 'לא ניתן לאחזר ניתוחים.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory: 'קוד אימות נדרש כדי להמשיך',
    emailAddressMandatory: 'כתובת אימייל נדרשת כדי להמשיך',
    userNotFound:
      'לא ניתן למצוא את המשתמש שצוין. אנא בדוק את הפרטים שלך ונסה שוב',
    invalidAuthCode: 'אופס! זה לא קוד אימות תקין. אנא בדוק ונסה שוב!',
    authCodeExpired:
      "אופס! הקוד שלך פג תוקף. אנא נסה להתחבר שוב עם כתובת האימייל שלך או לחץ על 'שלח קוד מחדש'",
    authCodeVerified: 'המשתמש אומת בהצלחה',
    generalError: 'אופס! נתקלנו בשגיאה בעת אימות הקוד שלך',
  },

  analyzeImage: {
    scanLimitReached:
      'הגעת למספר הסריקות המותר המרבי. אנא שדרג את התוכנית שלך כדי להמשיך להשתמש בשירות',
    imageMissing: 'חסרה תמונה. אנא בחר והעלה תמונה כדי להמשיך',
    uploadImageStorageError:
      'נתקלנו בשגיאה בהעלאת התמונה שלך. אנא בדוק את החיבור שלך ונסה שוב',
    interpretationNotSaved:
      'לא ניתן לשמור את תוצאת הניתוח. אנא בדוק את החיבור שלך ונסה שוב',
    analysisCompleted: 'ניתוח התמונה הושלם בהצלחה!',
  },
  analyzeVideo: {
    noVideoFound: 'חסר קובץ וידאו. אנא בחר והעלה וידאו כדי להמשיך',
    uploadVideoStorageError:
      'נתקלנו בשגיאה בהעלאת הווידאו שלך. אנא בדוק את החיבור שלך ונסה שוב',
    interpretationNotSaved:
      'לא ניתן לשמור את תוצאת הניתוח. אנא בדוק את החיבור שלך ונסה שוב',
    analysisCompleted: 'ניתוח הווידאו הושלם בהצלחה!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'סריקה נוספת שומשה',
    generalError: 'לא ניתן להגדיל את מספר הסריקות!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'סריקה אחת הופחתה',
    decrementErrorScan:
      'הייתה בעיה בעדכון מספר הסריקות. אנא נסה שוב מאוחר יותר',
    generalError: 'לא ניתן להפחית את מספר הסריקות!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'נרשמת בהצלחה!',
    updateSubscriptionError: 'לא ניתן לעדכן את המנוי של המשתמש!',
  },
  updateUserLanguage: {
    updateSuccess: 'השפה עודכנה בהצלחה!',
    updateError:
      'אירעה שגיאה בלתי צפויה בעת עדכון השפה. אנא נסה שוב מאוחר יותר',
  },

  getUserInfo: {
    successGetInfo: 'נתוני מידע המשתמש נקלטו בהצלחה',
    errorGetInfo:
      'אירעה שגיאה בלתי צפויה בעת אחזור מידע המשתמש. אנא נסה שוב מאוחר יותר',
  },
  getUserInfoById: {
    noUserInfoData: 'מסמך המשתמש קיים, אך אין נתונים זמינים',
    getUserFetchError: 'אירעה שגיאה בעת אחזור מידע המשתמש',
  },

  updateScanInterpretation: {
    success: 'רשומת פרשנות הסריקה עודכנה בהצלחה!',
    generalError: 'אירעה שגיאה בעת עדכון פרשנות הסריקה',
    paramsRequired: "נדרשים גם 'documentId' וגם 'fieldsToUpdate'",
  },
  deleteScanInterpretation: {
    success: 'הדוח נמחק בהצלחה!',
    documentIdRequired: "נדרש 'DocumentId' כדי להמשיך.",
    generalError: 'משהו השתבש במחיקת הדוח. אנא נסה שוב.',
  },

  getInterpretationByDocumentId: {
    paramsRequired: "נדרש 'DocumentId'",
    noDocIdFound: 'לא נמצא מסמך עם המזהה שסופק',
    success: 'המסמך נקלט בהצלחה',
    generalError: 'אירעה שגיאה בעת אחזור הפרשנות עבור מזהה המסמך שסופק',
  },

  getRecentInterpretation: {
    limitRequired: 'המגבלה חייבת להיות מספר בין 1 ל-100',
    noInterpretationFound: 'לא נמצאו פרשנויות',
    success: 'פרשנויות אחרונות נקלטו בהצלחה!',
    generalError: 'אירעה שגיאה בעת אחזור פרשנויות אחרונות',
    generalErrorAdditional: 'אירעה שגיאת שרת פנימית',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'אספקת טוקן מכשיר היא חובה.',
    generalError: 'שגיאה באחסון טוקן המכשיר',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'כותרת וגוף ההתראה הם חובה.',
    generalError: 'אירעה שגיאה בעיבוד התראות',
    generalErrorAdditional: 'נכשל בשליחת התראה גלובלית',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'מזהה מכשיר הוא חובה',
    languageMandatory: 'שפה היא חובה',
    deviceIdentified: 'המכשיר שלך זוהה בהצלחה',
    generalError: 'אירעה שגיאה בבדיקת ניסיון המכשיר',
  },

  getUserNotification: {
    generalError: 'נכשל באחזור התראות משתמש',
    generalErrorAdditional: 'אירעה שגיאה בעת אחזור התראות משתמש',
  },

  getScanCategories: {
    noCategoryFound: 'לא נמצאו קטגוריות',
    generalError: 'אירעה שגיאה בעת אחזור קטגוריות סריקה',
  },

  uploadScanCategories: {
    successfullyUploaded: 'קטגוריות סריקה הועלו בהצלחה',
    generalError: 'נכשל בהעלאת קטגוריות סריקה',
  },

  sendUserNotification: {
    noTokenFound: 'לא נמצאו טוקנים חוקיים של Expo. לא ניתן לשלוח התראות',
    generalError: 'נכשל בשליחת ההתראה',
  },

  updateUser: {
    successUpdatedUser: 'המשתמש עודכן בהצלחה',
    updateUserError: 'לא ניתן לעדכן את רשומת המשתמש. אנא נסה שוב.',
  },

  loginUserAnonymously: {
    mandatoryUsername: 'בחר כינוי ובוא נתחיל!',
    userLoggedIn: 'ברוך שובך! אתה מחובר.',
    accountCreated: 'אתה מחובר! תהנה מהחקירה!',
    error: 'אופס! משהו השתבש. אנא בדוק את החיבור שלך ונסה שוב.',
  },
  continueConversation: {
    messagesLimit:
      'אריה בקצה יכולת! העלה סריקה נוספת כדי להמשיך לקבל ניתוחים ותובנות',
    conversationNotFound: 'לא ניתן למצוא את השיחה',
    serviceIssueAi: 'נראה שיש בעיה עם שירות הבינה המלאכותית. אנא נסה שוב.',
    noResponseAiService:
      'נכשל בקבלת תגובה חוקית משירות הבינה המלאכותית. אנא נסה שוב',
  },
};

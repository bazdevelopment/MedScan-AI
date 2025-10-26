import { ITranslation } from './types';

export const pl: ITranslation = {
  common: {
    welcome: 'Witamy',
    error: 'Wystąpił błąd',
    loading: 'Ładowanie...',
    noUserFound:
      'Nie masz uprawnień do wykonania tego żądania. Proszę się zalogować',
    userIdMissing:
      'Wygląda na to, że brakuje identyfikatora użytkownika. Podaj go, aby kontynuować',
    scanLimitReached:
      'Osiągnąłeś maksymalną dozwoloną liczbę skanów. Ulepsz swój plan, aby kontynuować korzystanie z usługi',
    mandatoryLanguage: 'Kod języka jest wymagany',
  },
  auth: {
    signIn: 'Zaloguj się',
    signUp: 'Zarejestruj się',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'Podaj swój adres e-mail, aby kontynuować',
    invalidEmail:
      'Wprowadzony adres e-mail jest nieprawidłowy. Sprawdź go i spróbuj ponownie',
    accountCreated:
      'Twoje konto zostało pomyślnie utworzone! Sprawdź swój e-mail w celu uzyskania kodu weryfikacyjnego',
    verificationCodeSent:
      'Wysłaliśmy kod weryfikacyjny na Twój adres e-mail. Sprawdź swoją skrzynkę odbiorczą',
    internalError:
      'Wystąpił błąd podczas uwierzytelniania za pomocą poczty e-mail. Spróbuj ponownie',
  },

  sendEmailVerification: {
    emailMandatory: 'Adres e-mail jest wymagany do kontynuacji',
    emailUsed: 'Ten adres e-mail jest już używany. Użyj innego',
    userNotFound:
      'Nie znaleźliśmy określonego użytkownika. Sprawdź swoje dane i spróbuj ponownie',
    verificationCodeSent:
      'Kod weryfikacyjny został pomyślnie wysłany na Twój adres e-mail',
    generalError: 'Wystąpił błąd podczas rozpoczynania weryfikacji e-mail',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'Wymagana jest data rozpoczęcia i data zakończenia.',
    startDatePriority: 'Data rozpoczęcia nie może być po dacie zakończenia.',
    generalError: 'Nie można pobrać analiz.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory: 'Kod uwierzytelniający jest obowiązkowy do kontynuacji',
    emailAddressMandatory: 'Adres e-mail jest obowiązkowy do kontynuacji',
    userNotFound:
      'Nie można znaleźć określonego użytkownika. Sprawdź swoje dane i spróbuj ponownie',
    invalidAuthCode:
      'Ups! To nie jest prawidłowy kod uwierzytelniający. Sprawdź i spróbuj ponownie!',
    authCodeExpired:
      "Ups! Twój kod wygasł. Spróbuj ponownie zalogować się przy użyciu adresu e-mail lub kliknij 'Wyślij kod ponownie'",
    authCodeVerified: 'Użytkownik został pomyślnie zweryfikowany',
    generalError: 'Ups! Wystąpił błąd podczas weryfikacji Twojego kodu',
  },

  analyzeImage: {
    scanLimitReached:
      'Osiągnąłeś maksymalną dozwoloną liczbę skanów. Ulepsz swój plan, aby kontynuować korzystanie z usługi',
    imageMissing: 'Brak obrazu. Wybierz i prześlij obraz, aby kontynuować',
    uploadImageStorageError:
      'Wystąpił błąd podczas przesyłania obrazu. Sprawdź swoje połączenie i spróbuj ponownie',
    interpretationNotSaved:
      'Nie można zapisać wyniku analizy. Sprawdź swoje połączenie i spróbuj ponownie',
    analysisCompleted: 'Analiza obrazu zakończona pomyślnie!',
  },
  analyzeVideo: {
    noVideoFound: 'Brak pliku wideo. Wybierz i prześlij wideo, aby kontynuować',
    uploadVideoStorageError:
      'Wystąpił błąd podczas przesyłania filmu. Sprawdź swoje połączenie i spróbuj ponownie',
    interpretationNotSaved:
      'Nie można zapisać wyniku analizy. Sprawdź swoje połączenie i spróbuj ponownie',
    analysisCompleted: 'Analiza wideo zakończona pomyślnie!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'Wykorzystano jeszcze jedno skanowanie',
    generalError: 'Nie można zmniejszyć liczby skanów!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Jedno skanowanie zostało odjęte',
    decrementErrorScan:
      'Wystąpił problem z aktualizacją liczby skanów. Spróbuj ponownie później',
    generalError: 'Nie można zmniejszyć liczby skanów!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Pomyślnie zasubskrybowano!',
    updateSubscriptionError: 'Nie można zaktualizować subskrypcji użytkownika!',
  },
  updateUserLanguage: {
    updateSuccess: 'Język został pomyślnie zaktualizowany!',
    updateError:
      'Podczas aktualizacji języka wystąpił nieoczekiwany błąd. Spróbuj ponownie później',
  },

  getUserInfo: {
    successGetInfo: 'Pomyślnie pobrano dane userInfo',
    errorGetInfo:
      'Podczas pobierania informacji o użytkowniku wystąpił nieoczekiwany błąd. Spróbuj ponownie później',
  },
  getUserInfoById: {
    noUserInfoData:
      'Dokument użytkownika istnieje, ale nie ma dostępnych danych',
    getUserFetchError:
      'Wystąpił błąd podczas pobierania informacji o użytkowniku',
  },

  updateScanInterpretation: {
    success: 'Rekord interpretacji skanowania został pomyślnie zaktualizowany!',
    generalError: 'Wystąpił błąd podczas aktualizacji interpretacji skanowania',
    paramsRequired: "'documentId' i 'fieldsToUpdate' są wymagane",
  },
  deleteScanInterpretation: {
    success: 'Raport został pomyślnie usunięty!',
    documentIdRequired: "Do kontynuacji wymagany jest 'DocumentId'.",
    generalError:
      'Coś poszło nie tak podczas usuwania raportu. Proszę spróbować ponownie.',
  },

  getInterpretationByDocumentId: {
    paramsRequired: "Wymagany jest 'DocumentId'",
    noDocIdFound: 'Nie znaleziono dokumentu z podanym identyfikatorem',
    success: 'Dokument został pomyślnie pobrany',
    generalError:
      'Wystąpił błąd podczas pobierania interpretacji dla podanego identyfikatora dokumentu',
  },

  getRecentInterpretation: {
    limitRequired: 'Limit musi być liczbą od 1 do 100',
    noInterpretationFound: 'Nie znaleziono interpretacji',
    success: 'Ostatnie interpretacje zostały pomyślnie pobrane!',
    generalError: 'Wystąpił błąd podczas pobierania ostatnich interpretacji',
    generalErrorAdditional: 'Wystąpił wewnętrzny błąd serwera',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Podanie tokenu urządzenia jest obowiązkowe.',
    generalError: 'Błąd podczas przechowywania tokenu urządzenia',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Tytuł i treść powiadomienia są obowiązkowe.',
    generalError: 'Wystąpił błąd podczas przetwarzania powiadomień',
    generalErrorAdditional: 'Nie udało się wysłać globalnego powiadomienia',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'Identyfikator urządzenia jest obowiązkowy',
    languageMandatory: 'Język jest obowiązkowy',
    deviceIdentified: 'Twoje urządzenie zostało pomyślnie zidentyfikowane',
    generalError: 'Wystąpił błąd podczas sprawdzania wersji próbnej urządzenia',
  },

  getUserNotification: {
    generalError: 'Nie udało się pobrać powiadomień użytkownika',
    generalErrorAdditional:
      'Wystąpił błąd podczas pobierania powiadomień użytkownika',
  },

  getScanCategories: {
    noCategoryFound: 'Nie znaleziono kategorii',
    generalError: 'Wystąpił błąd podczas pobierania kategorii skanowania',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Kategorie skanowania zostały pomyślnie przesłane',
    generalError: 'Nie udało się przesłać kategorii skanowania',
  },

  sendUserNotification: {
    noTokenFound:
      'Nie znaleziono prawidłowych tokenów Expo. Nie można wysyłać powiadomień',
    generalError: 'Nie udało się wysłać powiadomienia',
  },

  updateUser: {
    successUpdatedUser: 'Użytkownik został pomyślnie zaktualizowany',
    updateUserError:
      'Nie można zaktualizować rekordu użytkownika. Proszę spróbować ponownie.',
  },

  loginUserAnonymously: {
    mandatoryUsername: 'Wybierz pseudonim i zacznijmy!',
    userLoggedIn: 'Witamy z powrotem! Jesteś zalogowany.',
    accountCreated: 'Jesteś zalogowany! Miłego poznawania!',
    error:
      'Ups! Coś poszło nie tak. Sprawdź swoje połączenie i spróbuj ponownie.',
  },
  continueConversation: {
    messagesLimit:
      'Aria jest na pełnej mocy! Prześlij kolejne skanowanie, aby nadal otrzymywać analizy i spostrzeżenia',
    conversationNotFound: 'Nie można znaleźć konwersacji',
    serviceIssueAi:
      'Wygląda na to, że występuje problem z usługą AI. Spróbuj ponownie.',
    noResponseAiService:
      'Nie udało się uzyskać prawidłowej odpowiedzi z usługi AI. Spróbuj ponownie',
  },
};

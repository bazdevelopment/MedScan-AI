import { ITranslation } from './types';

export const ja: ITranslation = {
  common: {
    welcome: 'ようこそ',
    error: 'エラーが発生しました',
    loading: '読み込み中...',
    noUserFound: 'このリクエストを行う権限がありません。ログインしてください',
    userIdMissing: 'ユーザーIDが不足しています。続行するために提供してください',
    scanLimitReached:
      'スキャンの最大数に達しました。サービスを続けるにはプランをアップグレードしてください',
    mandatoryLanguage: '言語コードは必須です',
  },
  auth: {
    signIn: 'ログイン',
    signUp: '新規登録',
  },
  loginUserViaEmail: {
    mandatoryEmail: '続行するためにメールアドレスを提供してください',
    invalidEmail:
      '入力されたメールアドレスが無効です。確認して再度お試しください',
    accountCreated:
      'アカウントが正常に作成されました！確認コードをメールで確認してください',
    verificationCodeSent:
      '確認コードをメールで送信しました。受信トレイを確認してください',
    internalError:
      'メールによる認証処理中にエラーが発生しました。再度お試しください',
  },
  sendEmailVerification: {
    emailMandatory: '続行するためにメールアドレスが必要です',
    emailUsed:
      'このメールアドレスは既に使用されています。別のメールアドレスを使用してください',
    userNotFound:
      '指定されたユーザーが見つかりませんでした。詳細を確認して再度お試しください',
    verificationCodeSent: '確認コードがメールに正常に送信されました',
    generalError: 'メール確認の開始中にエラーが発生しました',
  },
  getInterpretationByDate: {
    startEndDateRequired: '開始日と終了日が必要です。',
    startDatePriority: '開始日は終了日より後にすることはできません。',
    generalError: '分析を取得できませんでした。',
  },
  verifyAuthenticationCode: {
    authCodeMandatory: '続行するには認証コードが必要です',
    emailAddressMandatory: '続行するにはメールアドレスが必要です',
    userNotFound:
      '指定されたユーザーが見つかりませんでした。詳細を確認して再度お試しください',
    invalidAuthCode:
      'おっと！これは有効な認証コードではありません。確認して再度お試しください！',
    authCodeExpired:
      'おっと！コードの有効期限が切れました。メールアドレスで再度ログインするか、「コードを再送」をクリックしてください',
    authCodeVerified: 'ユーザーが正常に確認されました',
    generalError: 'おっと！コードの確認中にエラーが発生しました',
  },
  analyzeImage: {
    scanLimitReached:
      'スキャンの最大数に達しました。サービスを続けるにはプランをアップグレードしてください',
    imageMissing:
      '画像がありません。続行するために画像を選択してアップロードしてください',
    uploadImageStorageError:
      '画像のアップロード中にエラーが発生しました。接続を確認して再度お試しください',
    interpretationNotSaved:
      '分析結果を保存できませんでした。接続を確認して再度お試しください',
    analysisCompleted: '画像分析が正常に完了しました！',
  },
  analyzeVideo: {
    noVideoFound:
      '動画ファイルがありません。続行するために動画を選択してアップロードしてください',
    uploadVideoStorageError:
      '動画のアップロード中にエラーが発生しました。接続を確認して再度お試しください',
    interpretationNotSaved:
      '分析結果を保存できませんでした。接続を確認して再度お試しください',
    analysisCompleted: '動画分析が正常に完了しました！',
  },
  incrementUsersScans: {
    incrementSuccessScan: 'さらに1回のスキャンが使用されました',
    generalError: 'スキャン数を減らすことができませんでした！',
  },
  decrementUserScans: {
    decrementSuccessScan: '1回のスキャンが減らされました',
    decrementErrorScan:
      'スキャン数の更新中に問題が発生しました。後ほど再度お試しください',
    generalError: 'スキャン数を減らすことができませんでした！',
  },
  updateUserSubscription: {
    subscribeSuccess: '正常に購読されました！',
    updateSubscriptionError: 'ユーザーの購読を更新できませんでした！',
  },
  updateUserLanguage: {
    updateSuccess: '言語が正常に更新されました！',
    updateError:
      '言語の更新中に予期しないエラーが発生しました。後ほど再度お試しください',
  },
  getUserInfo: {
    successGetInfo: 'ユーザー情報が正常に取得されました',
    errorGetInfo:
      'ユーザー情報の取得中に予期しないエラーが発生しました。後ほど再度お試しください',
  },
  getUserInfoById: {
    noUserInfoData: 'ユーザードキュメントは存在しますが、データがありません',
    getUserFetchError: 'ユーザー情報の取得中にエラーが発生しました',
  },
  updateScanInterpretation: {
    success: 'スキャン解釈レコードが正常に更新されました！',
    generalError: 'スキャン解釈の更新中にエラーが発生しました',
    paramsRequired: "'documentId'と'fieldsToUpdate'の両方が必要です",
  },
  deleteScanInterpretation: {
    success: 'レポートが正常に削除されました！',
    documentIdRequired: "続行するには 'DocumentId' が必要です。",
    generalError:
      'レポートの削除中に問題が発生しました。もう一度お試しください。',
  },
  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId'は必須です",
    noDocIdFound: '指定されたIDのドキュメントは見つかりませんでした',
    success: 'ドキュメントが正常に取得されました',
    generalError:
      '指定されたドキュメントIDの解釈を取得中にエラーが発生しました',
  },
  getRecentInterpretation: {
    limitRequired: '制限は1から100の間の数値でなければなりません',
    noInterpretationFound: '解釈が見つかりませんでした',
    success: '最近の解釈が正常に取得されました！',
    generalError: '最近の解釈の取得中にエラーが発生しました',
    generalErrorAdditional: '内部サーバーエラーが発生しました',
  },
  storeDeviceToken: {
    deviceTokenRequired: 'デバイストークンの提供は必須です。',
    generalError: 'デバイストークンの保存中にエラーが発生しました',
  },
  sendGlobalPushNotifications: {
    requiredParams: '通知のタイトルと本文は必須です。',
    generalError: '通知の処理中にエラーが発生しました',
    generalErrorAdditional: 'グローバル通知の送信に失敗しました',
  },
  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'デバイスIDは必須です',
    languageMandatory: '言語は必須です',
    deviceIdentified: 'デバイスが正常に識別されました',
    generalError: 'デバイストライアルの確認中にエラーが発生しました',
  },
  getUserNotification: {
    generalError: 'ユーザー通知の取得に失敗しました',
    generalErrorAdditional: 'ユーザー通知の取得中にエラーが発生しました',
  },
  getScanCategories: {
    noCategoryFound: 'カテゴリが見つかりませんでした',
    generalError: 'スキャンカテゴリの取得中にエラーが発生しました',
  },
  uploadScanCategories: {
    successfullyUploaded: 'スキャンカテゴリが正常にアップロードされました',
    generalError: 'スキャンカテゴリのアップロードに失敗しました',
  },
  sendUserNotification: {
    noTokenFound:
      '有効なExpoトークンが見つかりませんでした。通知を送信できません',
    generalError: '通知の送信に失敗しました',
  },
  updateUser: {
    successUpdatedUser: 'ユーザーが正常に更新されました',
    updateUserError:
      'ユーザーレコードを更新できませんでした。再度お試しください。',
  },
  loginUserAnonymously: {
    mandatoryUsername: 'ニックネームを選んで始めましょう！',
    userLoggedIn: 'おかえりなさい！ログインしました。',
    accountCreated: '参加しました！探索をお楽しみください！',
    error:
      'おっと！問題が発生しました。接続を確認して、もう一度お試しください。',
  },
};

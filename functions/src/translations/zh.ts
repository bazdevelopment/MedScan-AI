import { ITranslation } from './types';

export const zh: ITranslation = {
  common: {
    welcome: '欢迎',
    error: '发生错误',
    loading: '加载中...',
    noUserFound: '您无权进行此请求。请登录',
    userIdMissing: '用户ID缺失。请提供用户ID以继续',
    scanLimitReached:
      '您已达到允许的最大扫描次数。请升级您的计划以继续使用服务',
    mandatoryLanguage: '语言代码是必需的',
  },
  auth: {
    signIn: '登录',
    signUp: '注册',
  },
  loginUserViaEmail: {
    mandatoryEmail: '请提供您的电子邮件地址以继续',
    invalidEmail: '输入的电子邮件地址无效。请检查后重试',
    accountCreated: '您的账户已成功创建！请查看您的电子邮件以获取验证码',
    verificationCodeSent: '我们已向您的电子邮件发送了验证码。请查看您的收件箱',
    internalError: '通过电子邮件进行身份验证时发生错误。请重试',
  },
  sendEmailVerification: {
    emailMandatory: '必须提供电子邮件地址以继续',
    emailUsed: '此电子邮件地址已被使用。请使用其他电子邮件地址',
    userNotFound: '未找到指定的用户。请检查您的详细信息并重试',
    verificationCodeSent: '验证码已成功发送至您的电子邮件',
    generalError: '启动电子邮件验证时发生错误',
  },
  getInterpretationByDate: {
    startEndDateRequired: '开始日期和结束日期是必需的。',
    startDatePriority: '开始日期不能晚于结束日期。',
    generalError: '无法检索分析结果。',
  },
  verifyAuthenticationCode: {
    authCodeMandatory: '必须提供验证码以继续',
    emailAddressMandatory: '必须提供电子邮件地址以继续',
    userNotFound: '未找到指定的用户。请检查您的详细信息并重试',
    invalidAuthCode: '抱歉！这不是有效的验证码。请检查后重试！',
    authCodeExpired:
      '抱歉！您的验证码已过期。请使用您的电子邮件地址重新登录或点击“重新发送验证码”',
    authCodeVerified: '用户已成功验证',
    generalError: '抱歉！验证您的验证码时发生错误',
  },
  analyzeImage: {
    scanLimitReached:
      '您已达到允许的最大扫描次数。请升级您的计划以继续使用服务',
    imageMissing: '缺少图像。请选择并上传图像以继续',
    uploadImageStorageError: '上传图像时发生错误。请检查您的连接并重试',
    interpretationNotSaved: '无法保存分析结果。请检查您的连接并重试',
    analysisCompleted: '图像分析成功完成！',
  },
  analyzeVideo: {
    noVideoFound: '缺少视频文件。请选择并上传视频以继续',
    uploadVideoStorageError: '上传视频时发生错误。请检查您的连接并重试',
    interpretationNotSaved: '无法保存分析结果。请检查您的连接并重试',
    analysisCompleted: '视频分析成功完成！',
  },
  incrementUsersScans: {
    incrementSuccessScan: '已使用一次扫描',
    generalError: '无法减少扫描次数！',
  },
  decrementUserScans: {
    decrementSuccessScan: '已减少一次扫描',
    decrementErrorScan: '更新扫描次数时出现问题。请稍后重试',
    generalError: '无法减少扫描次数！',
  },
  updateUserSubscription: {
    subscribeSuccess: '订阅成功！',
    updateSubscriptionError: '无法更新用户订阅！',
  },
  updateUserLanguage: {
    updateSuccess: '语言已成功更新！',
    updateError: '更新语言时发生意外错误。请稍后重试',
  },
  getUserInfo: {
    successGetInfo: '成功获取用户信息',
    errorGetInfo: '获取用户信息时发生意外错误。请稍后重试',
  },
  getUserInfoById: {
    noUserInfoData: '用户文档存在，但没有可用数据',
    getUserFetchError: '获取用户信息时发生错误',
  },
  updateScanInterpretation: {
    success: '扫描解释记录已成功更新！',
    generalError: '更新扫描解释时发生错误',
    paramsRequired: "'documentId' 和 'fieldsToUpdate' 都是必需的",
  },
  deleteScanInterpretation: {
    success: '报告已成功删除！',
    documentIdRequired: "需要 'DocumentId' 才能继续。",
    generalError: '删除报告时出了点问题。请再试一次。',
  },
  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' 是必需的",
    noDocIdFound: '未找到提供的ID对应的文档',
    success: '文档已成功获取',
    generalError: '获取提供的文档ID的解释时发生错误',
  },
  getRecentInterpretation: {
    limitRequired: '限制必须是1到100之间的数字',
    noInterpretationFound: '未找到解释',
    success: '最近解释已成功获取！',
    generalError: '获取最近解释时发生错误',
    generalErrorAdditional: '发生内部服务器错误',
  },
  storeDeviceToken: {
    deviceTokenRequired: '必须提供设备令牌。',
    generalError: '存储设备令牌时发生错误',
  },
  sendGlobalPushNotifications: {
    requiredParams: '通知标题和正文是必需的。',
    generalError: '处理通知时发生错误',
    generalErrorAdditional: '发送全局通知失败',
  },
  checkDeviceUniqueIdentifier: {
    deviceMandatory: '设备ID是必需的',
    languageMandatory: '语言是必需的',
    deviceIdentified: '您的设备已成功识别',
    generalError: '检查设备试用时发生错误',
  },
  getUserNotification: {
    generalError: '获取用户通知失败',
    generalErrorAdditional: '获取用户通知时发生错误',
  },
  getScanCategories: {
    noCategoryFound: '未找到类别',
    generalError: '获取扫描类别时发生错误',
  },
  uploadScanCategories: {
    successfullyUploaded: '扫描类别已成功上传',
    generalError: '上传扫描类别失败',
  },
  sendUserNotification: {
    noTokenFound: '未找到有效的Expo令牌。无法发送通知',
    generalError: '发送通知失败',
  },
  updateUser: {
    successUpdatedUser: '用户已成功更新',
    updateUserError: '无法更新用户记录。请重试。',
  },
  loginUserAnonymously: {
    mandatoryUsername: '选择一个昵称，让我们开始吧！',
    userLoggedIn: '欢迎回来！您已登录。',
    accountCreated: '您已加入！尽情探索吧！',
    error: '哎呀！出错了。请检查您的连接并重试。',
  },
};

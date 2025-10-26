import { ITranslation } from './types';

export const vi: ITranslation = {
  common: {
    welcome: 'Chào mừng',
    error: 'Đã xảy ra lỗi',
    loading: 'Đang tải...',
    noUserFound:
      'Bạn không được ủy quyền thực hiện yêu cầu này. Vui lòng đăng nhập',
    userIdMissing:
      'Có vẻ như thiếu ID người dùng. Vui lòng cung cấp để tiếp tục',
    scanLimitReached:
      'Bạn đã đạt đến số lần quét tối đa cho phép. Vui lòng nâng cấp gói dịch vụ để tiếp tục sử dụng',
    mandatoryLanguage: 'Mã ngôn ngữ là bắt buộc',
  },
  auth: {
    signIn: 'Đăng nhập',
    signUp: 'Đăng ký',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'Vui lòng cung cấp địa chỉ email của bạn để tiếp tục',
    invalidEmail:
      'Địa chỉ email nhập vào không hợp lệ. Vui lòng kiểm tra và thử lại',
    accountCreated:
      'Tài khoản của bạn đã được tạo thành công! Vui lòng kiểm tra email để lấy mã xác minh',
    verificationCodeSent:
      'Chúng tôi đã gửi mã xác minh đến email của bạn. Vui lòng kiểm tra hộp thư đến',
    internalError: 'Đã xảy ra lỗi khi xác thực qua email. Vui lòng thử lại',
  },

  sendEmailVerification: {
    emailMandatory: 'Địa chỉ email là bắt buộc để tiếp tục',
    emailUsed: 'Địa chỉ email này đã được sử dụng. Vui lòng sử dụng email khác',
    userNotFound:
      'Không tìm thấy người dùng được chỉ định. Vui lòng kiểm tra thông tin và thử lại',
    verificationCodeSent:
      'Mã xác minh đã được gửi thành công đến email của bạn',
    generalError: 'Đã xảy ra lỗi khi bắt đầu xác minh email',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'Ngày bắt đầu và ngày kết thúc là bắt buộc.',
    startDatePriority: 'Ngày bắt đầu không thể sau ngày kết thúc.',
    generalError: 'Không thể truy xuất phân tích.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory: 'Mã xác thực là bắt buộc để tiếp tục',
    emailAddressMandatory: 'Địa chỉ email là bắt buộc để tiếp tục',
    userNotFound:
      'Không tìm thấy người dùng được chỉ định. Vui lòng kiểm tra thông tin và thử lại',
    invalidAuthCode:
      'Rất tiếc! Đây không phải là mã xác thực hợp lệ. Vui lòng kiểm tra và thử lại!',
    authCodeExpired:
      "Rất tiếc! Mã của bạn đã hết hạn. Vui lòng thử lại đăng nhập bằng địa chỉ email của bạn hoặc nhấp vào 'Gửi lại mã'",
    authCodeVerified: 'Người dùng đã được xác minh thành công',
    generalError: 'Rất tiếc! Chúng tôi đã gặp lỗi khi xác minh mã của bạn',
  },

  analyzeImage: {
    scanLimitReached:
      'Bạn đã đạt đến số lần quét tối đa cho phép. Vui lòng nâng cấp gói dịch vụ để tiếp tục sử dụng',
    imageMissing:
      'Thiếu hình ảnh. Vui lòng chọn và tải lên hình ảnh để tiếp tục',
    uploadImageStorageError:
      'Chúng tôi gặp lỗi khi tải lên hình ảnh của bạn. Vui lòng kiểm tra kết nối và thử lại',
    interpretationNotSaved:
      'Không thể lưu kết quả phân tích. Vui lòng kiểm tra kết nối và thử lại',
    analysisCompleted: 'Phân tích hình ảnh hoàn tất thành công!',
  },
  analyzeVideo: {
    noVideoFound: 'Thiếu tệp video. Vui lòng chọn và tải lên video để tiếp tục',
    uploadVideoStorageError:
      'Chúng tôi gặp lỗi khi tải lên video của bạn. Vui lòng kiểm tra kết nối và thử lại',
    interpretationNotSaved:
      'Không thể lưu kết quả phân tích. Vui lòng kiểm tra kết nối và thử lại',
    analysisCompleted: 'Phân tích video hoàn tất thành công!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'Đã sử dụng thêm một lần quét',
    generalError: 'Không thể giảm số lần quét!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Đã giảm một lần quét',
    decrementErrorScan:
      'Có vấn đề khi cập nhật số lần quét. Vui lòng thử lại sau',
    generalError: 'Không thể giảm số lần quét!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Đã đăng ký thành công!',
    updateSubscriptionError: 'Không thể cập nhật gói đăng ký của người dùng!',
  },
  updateUserLanguage: {
    updateSuccess: 'Đã cập nhật ngôn ngữ thành công!',
    updateError:
      'Đã xảy ra lỗi không mong muốn khi cập nhật ngôn ngữ. Vui lòng thử lại sau',
  },

  getUserInfo: {
    successGetInfo: 'Đã lấy dữ liệu userInfo thành công',
    errorGetInfo:
      'Đã xảy ra lỗi không mong muốn khi lấy thông tin người dùng. Vui lòng thử lại sau',
  },
  getUserInfoById: {
    noUserInfoData:
      'Tài liệu người dùng tồn tại, nhưng không có dữ liệu nào khả dụng',
    getUserFetchError: 'Đã xảy ra lỗi khi lấy thông tin người dùng',
  },

  updateScanInterpretation: {
    success: 'Đã cập nhật bản ghi diễn giải quét thành công!',
    generalError: 'Đã xảy ra lỗi khi cập nhật diễn giải quét',
    paramsRequired: "'documentId' và 'fieldsToUpdate' đều là bắt buộc",
  },
  deleteScanInterpretation: {
    success: 'Đã xóa báo cáo thành công!',
    documentIdRequired: "'DocumentId' là bắt buộc để tiếp tục.",
    generalError: 'Đã xảy ra lỗi khi xóa báo cáo. Vui lòng thử lại.',
  },

  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' là bắt buộc",
    noDocIdFound: 'Không tìm thấy tài liệu nào với ID được cung cấp',
    success: 'Đã truy xuất tài liệu thành công',
    generalError:
      'Đã xảy ra lỗi khi lấy diễn giải cho ID tài liệu được cung cấp',
  },

  getRecentInterpretation: {
    limitRequired: 'Giới hạn phải là số từ 1 đến 100',
    noInterpretationFound: 'Không tìm thấy diễn giải nào',
    success: 'Đã lấy diễn giải gần đây thành công!',
    generalError: 'Đã xảy ra lỗi khi truy xuất diễn giải gần đây',
    generalErrorAdditional: 'Đã xảy ra lỗi máy chủ nội bộ',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Việc cung cấp mã thiết bị là bắt buộc.',
    generalError: 'Lỗi khi lưu trữ mã thiết bị',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Tiêu đề và nội dung thông báo là bắt buộc.',
    generalError: 'Đã xảy ra lỗi khi xử lý thông báo',
    generalErrorAdditional: 'Không thể gửi thông báo toàn cầu',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'ID thiết bị là bắt buộc',
    languageMandatory: 'Ngôn ngữ là bắt buộc',
    deviceIdentified: 'Thiết bị của bạn đã được xác định thành công',
    generalError: 'Đã xảy ra lỗi khi kiểm tra dùng thử thiết bị',
  },

  getUserNotification: {
    generalError: 'Không thể lấy thông báo người dùng',
    generalErrorAdditional: 'Đã xảy ra lỗi khi lấy thông báo người dùng',
  },

  getScanCategories: {
    noCategoryFound: 'Không tìm thấy danh mục nào',
    generalError: 'Đã xảy ra lỗi khi truy xuất danh mục quét',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Đã tải lên danh mục quét thành công',
    generalError: 'Không thể tải lên danh mục quét',
  },

  sendUserNotification: {
    noTokenFound: 'Không tìm thấy mã Expo hợp lệ. Không thể gửi thông báo',
    generalError: 'Không thể gửi thông báo',
  },

  updateUser: {
    successUpdatedUser: 'Đã cập nhật người dùng thành công',
    updateUserError: 'Không thể cập nhật bản ghi người dùng. Vui lòng thử lại.',
  },

  loginUserAnonymously: {
    mandatoryUsername: 'Chọn một biệt danh và hãy bắt đầu nào!',
    userLoggedIn: 'Chào mừng trở lại! Bạn đã đăng nhập.',
    accountCreated: 'Bạn đã đăng nhập! Hãy khám phá nào!',
    error: 'Rất tiếc! Đã xảy ra lỗi. Vui lòng kiểm tra kết nối và thử lại.',
  },
  continueConversation: {
    messagesLimit:
      'Aria đã đạt hết công suất! Tải lên một lượt quét khác để tiếp tục nhận phân tích và thông tin chi tiết',
    conversationNotFound: 'Không thể tìm thấy cuộc trò chuyện',
    serviceIssueAi: 'Có vẻ như có vấn đề với dịch vụ AI. Vui lòng thử lại.',
    noResponseAiService:
      'Không nhận được phản hồi hợp lệ từ dịch vụ AI. Vui lòng thử lại',
  },
};

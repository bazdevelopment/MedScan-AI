import { ITranslation } from './types';

export const ko: ITranslation = {
  common: {
    welcome: '환영합니다',
    error: '오류가 발생했습니다',
    loading: '로딩 중...',
    noUserFound: '이 요청을 수행할 권한이 없습니다. 로그인해 주세요',
    userIdMissing:
      '사용자 ID가 누락된 것 같습니다. 계속하려면 ID를 제공해 주세요',
    scanLimitReached:
      '허용된 최대 스캔 횟수에 도달했습니다. 서비스를 계속 사용하려면 요금제를 업그레이드해 주세요',
    mandatoryLanguage: '언어 코드가 필요합니다',
  },
  auth: {
    signIn: '로그인',
    signUp: '회원가입',
  },
  loginUserViaEmail: {
    mandatoryEmail: '계속하려면 이메일 주소를 입력해 주세요',
    invalidEmail:
      '입력한 이메일 주소가 올바르지 않습니다. 확인 후 다시 시도해 주세요',
    accountCreated:
      '계정이 성공적으로 생성되었습니다! 인증 코드를 위해 이메일을 확인해 주세요',
    verificationCodeSent:
      '인증 코드를 이메일로 보냈습니다. 받은 편지함을 확인해 주세요',
    internalError:
      '이메일 인증 처리 중 오류가 발생했습니다. 다시 시도해 주세요',
  },
  sendEmailVerification: {
    emailMandatory: '계속하려면 이메일 주소가 필요합니다',
    emailUsed:
      '이 이메일 주소는 이미 사용 중입니다. 다른 이메일을 사용해 주세요',
    userNotFound:
      '지정된 사용자를 찾을 수 없습니다. 정보를 확인하고 다시 시도해 주세요',
    verificationCodeSent: '인증 코드가 이메일로 성공적으로 전송되었습니다',
    generalError: '이메일 인증을 시작하는 중 오류가 발생했습니다',
  },
  getInterpretationByDate: {
    startEndDateRequired: '시작 날짜와 종료 날짜가 필요합니다.',
    startDatePriority: '시작 날짜는 종료 날짜보다 늦을 수 없습니다.',
    generalError: '분석을 검색할 수 없습니다.',
  },
  verifyAuthenticationCode: {
    authCodeMandatory: '계속하려면 인증 코드가 필요합니다',
    emailAddressMandatory: '계속하려면 이메일 주소가 필요합니다',
    userNotFound:
      '지정된 사용자를 찾을 수 없습니다. 정보를 확인하고 다시 시도해 주세요',
    invalidAuthCode:
      '죄송합니다! 유효하지 않은 인증 코드입니다. 확인 후 다시 시도해 주세요!',
    authCodeExpired:
      "죄송합니다! 코드가 만료되었습니다. 이메일 주소로 다시 로그인을 시도하거나 '코드 재전송'을 클릭해 주세요",
    authCodeVerified: '사용자가 성공적으로 인증되었습니다',
    generalError: '죄송합니다! 코드 확인 중 오류가 발생했습니다',
  },
  analyzeImage: {
    scanLimitReached:
      '허용된 최대 스캔 횟수에 도달했습니다. 서비스를 계속 사용하려면 요금제를 업그레이드해 주세요',
    imageMissing:
      '이미지가 없습니다. 계속하려면 이미지를 선택하고 업로드해 주세요',
    uploadImageStorageError:
      '이미지 업로드 중 오류가 발생했습니다. 연결을 확인하고 다시 시도해 주세요',
    interpretationNotSaved:
      '분석 결과를 저장할 수 없습니다. 연결을 확인하고 다시 시도해 주세요',
    analysisCompleted: '이미지 분석이 성공적으로 완료되었습니다!',
  },
  analyzeVideo: {
    noVideoFound:
      '비디오 파일이 없습니다. 계속하려면 비디오를 선택하고 업로드해 주세요',
    uploadVideoStorageError:
      '비디오 업로드 중 오류가 발생했습니다. 연결을 확인하고 다시 시도해 주세요',
    interpretationNotSaved:
      '분석 결과를 저장할 수 없습니다. 연결을 확인하고 다시 시도해 주세요',
    analysisCompleted: '비디오 분석이 성공적으로 완료되었습니다!',
  },
  incrementUsersScans: {
    incrementSuccessScan: '스캔이 하나 더 사용되었습니다',
    generalError: '스캔 횟수를 감소시킬 수 없습니다!',
  },
  decrementUserScans: {
    decrementSuccessScan: '스캔이 하나 감소되었습니다',
    decrementErrorScan:
      '스캔 횟수 업데이트 중 문제가 발생했습니다. 나중에 다시 시도해 주세요',
    generalError: '스캔 횟수를 감소시킬 수 없습니다!',
  },
  updateUserSubscription: {
    subscribeSuccess: '구독이 성공적으로 완료되었습니다!',
    updateSubscriptionError: '사용자 구독을 업데이트할 수 없습니다!',
  },
  updateUserLanguage: {
    updateSuccess: '언어가 성공적으로 업데이트되었습니다!',
    updateError:
      '언어 업데이트 중 예기치 않은 오류가 발생했습니다. 나중에 다시 시도해 주세요',
  },
  getUserInfo: {
    successGetInfo: '사용자 정보를 성공적으로 가져왔습니다',
    errorGetInfo:
      '사용자 정보를 가져오는 중 예기치 않은 오류가 발생했습니다. 나중에 다시 시도해 주세요',
  },
  getUserInfoById: {
    noUserInfoData: '사용자 문서는 존재하지만 사용 가능한 데이터가 없습니다',
    getUserFetchError: '사용자 정보를 가져오는 중 오류가 발생했습니다',
  },
  updateScanInterpretation: {
    success: '스캔 해석 기록이 성공적으로 업데이트되었습니다!',
    generalError: '스캔 해석 업데이트 중 오류가 발생했습니다',
    paramsRequired: "'documentId'와 'fieldsToUpdate' 모두 필요합니다",
  },
  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId'가 필요합니다",
    noDocIdFound: '제공된 ID로 문서를 찾을 수 없습니다',
    success: '문서를 성공적으로 가져왔습니다',
    generalError:
      '제공된 문서 ID에 대한 해석을 가져오는 중 오류가 발생했습니다',
  },
  getRecentInterpretation: {
    limitRequired: '제한은 1에서 100 사이의 숫자여야 합니다',
    noInterpretationFound: '해석을 찾을 수 없습니다',
    success: '최근 해석을 성공적으로 가져왔습니다!',
    generalError: '최근 해석을 가져오는 중 오류가 발생했습니다',
    generalErrorAdditional: '내부 서버 오류가 발생했습니다',
  },
  storeDeviceToken: {
    deviceTokenRequired: '기기 토큰 제공이 필수입니다.',
    generalError: '기기 토큰 저장 중 오류 발생',
  },
  sendGlobalPushNotifications: {
    requiredParams: '알림 제목과 내용이 필수입니다.',
    generalError: '알림 처리 중 오류가 발생했습니다',
    generalErrorAdditional: '전역 알림 전송에 실패했습니다',
  },
  checkDeviceUniqueIdentifier: {
    deviceMandatory: '기기 ID가 필수입니다',
    languageMandatory: '언어가 필수입니다',
    deviceIdentified: '기기가 성공적으로 식별되었습니다',
    generalError: '기기 시험 확인 중 오류가 발생했습니다',
  },
  getUserNotification: {
    generalError: '사용자 알림을 가져오는데 실패했습니다',
    generalErrorAdditional: '사용자 알림을 가져오는 중 오류가 발생했습니다',
  },
  getScanCategories: {
    noCategoryFound: '카테고리를 찾을 수 없습니다',
    generalError: '스캔 카테고리를 가져오는 중 오류가 발생했습니다',
  },
  uploadScanCategories: {
    successfullyUploaded: '스캔 카테고리가 성공적으로 업로드되었습니다',
    generalError: '스캔 카테고리 업로드에 실패했습니다',
  },
  sendUserNotification: {
    noTokenFound:
      '유효한 Expo 토큰을 찾을 수 없습니다. 알림을 보낼 수 없습니다',
    generalError: '알림 전송에 실패했습니다',
  },
  updateUser: {
    successUpdatedUser: '사용자가 성공적으로 업데이트되었습니다',
    updateUserError:
      '사용자 기록을 업데이트할 수 없습니다. 다시 시도해 주세요.',
  },
};

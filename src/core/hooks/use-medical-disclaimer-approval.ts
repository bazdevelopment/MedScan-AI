import { useMMKVBoolean } from 'react-native-mmkv';

import { storage } from '../storage';

const IS_MEDICAL_DISCLAIMER_APPROVED = 'IS_MEDICAL_DISCLAIMER_APPROVED';

export const useMedicalDisclaimerApproval = () => {
  const [isMedicalDisclaimerApproved, setIsMedicalDisclaimerApproved] =
    useMMKVBoolean(IS_MEDICAL_DISCLAIMER_APPROVED, storage);
  if (isMedicalDisclaimerApproved === undefined) {
    return [false, setIsMedicalDisclaimerApproved] as const;
  }
  return [isMedicalDisclaimerApproved, setIsMedicalDisclaimerApproved] as const;
};

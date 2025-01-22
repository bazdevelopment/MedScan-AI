import { type SlotProps } from 'input-otp-native';

export interface IOtpVerificationInput {
  className: string;
  isLoading: boolean;
  isError: boolean;
  onComplete: (code: string) => void;
}

export interface ISlotProps extends SlotProps {
  isLoading: boolean;
  isError: boolean;
}

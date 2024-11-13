import { StyleSheet } from 'react-native';
import { toast } from 'sonner-native';
import { type ToastProps } from 'sonner-native/lib/typescript/commonjs/src/types';

// Default styles
const styles = StyleSheet.create({
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cancelButtonText: {
    color: '#666666',
  },
});

// Default options that will be applied to all toasts
const defaultOptions = {
  duration: 4000,
  position: 'top-center',
} as ToastProps;

// Helper function to merge options
const mergeOptions = (options?: ToastProps): ToastProps => ({
  ...defaultOptions,
  ...options,
});

// Success toast
export const showSuccess = (message: string, options?: ToastProps) => {
  return toast.success(message, {
    ...mergeOptions(options),
    actionButtonStyle: styles.actionButton,
    actionButtonTextStyle: styles.actionButtonText,
    richColors: true,
  });
};

// Error toast
export const showError = (message: string, options?: ToastProps) => {
  return toast.error(message, {
    ...mergeOptions(options),
    duration: 5000, // Longer duration for errors
    richColors: true,
  });
};

// Warning toast
export const showWarning = (message: string, options?: ToastProps) => {
  return toast.warning(message, {
    ...mergeOptions(options),
    richColors: true,
  });
};

// Info toast
export const showInfo = (message: string, options?: ToastProps) => {
  return toast(message, {
    ...mergeOptions(options),
  });
};

// Loading toast
export const showLoading = (message: string, options?: ToastProps) => {
  return toast.loading(message, {
    ...mergeOptions(options),
    duration: Infinity, // Loading toasts should stay until manually dismissed
  });
};

// Promise toast
export const showPromise = async <T>(
  promise: Promise<T>,
  {
    loading = 'Loading...',
    success = 'Completed successfully!',
    error = 'Something went wrong',
    ...options
  }: {
    loading?: string;
    success?: string | ((data: T) => string);
    error?: string | ((error: any) => string);
  } & ToastProps,
) => {
  return toast.promise(promise, {
    ...mergeOptions(options),
    loading,
    success,
    error,
    richColors: true,
  });
};

// Action toast
export const showWithAction = (
  message: string,
  {
    actionLabel,
    onAction,
    ...options
  }: {
    actionLabel: string;
    onAction: () => void;
  } & ToastProps,
) => {
  return toast(message, {
    ...mergeOptions(options),
    action: {
      label: actionLabel,
      onClick: onAction,
    },
    actionButtonStyle: styles.actionButton,
    actionButtonTextStyle: styles.actionButtonText,
  });
};

// Dismiss specific toast
export const dismiss = (toastId?: string) => {
  toast.dismiss(toastId);
};

// Dismiss all toasts
export const dismissAll = () => {
  toast.dismiss();
};

// Export all functions as a single object for convenience
const Toast = {
  success: showSuccess,
  error: showError,
  warning: showWarning,
  info: showInfo,
  loading: showLoading,
  promise: showPromise,
  withAction: showWithAction,
  dismiss,
  dismissAll,
};

export default Toast;

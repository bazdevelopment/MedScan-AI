import * as Clipboard from 'expo-clipboard';
import { useCallback, useState } from 'react';

interface UseClipboardResult {
  copiedText: string;
  isLoading: boolean;
  error: Error | null;
  copyToClipboard: (text: string) => Promise<void>;
  getClipboardText: () => Promise<void>;
  clearClipboardText: () => void;
}

export const useClipboard = (): UseClipboardResult => {
  const [copiedText, setCopiedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleAsyncOperation = useCallback(
    async (
      operation: () => Promise<any>,
      onSuccess?: (result: any) => void,
    ) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await operation();
        onSuccess?.(result);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const copyToClipboard = (text: string) =>
    handleAsyncOperation(
      () => Clipboard.setStringAsync(text),
      () => setCopiedText(text),
    );

  const getClipboardText = () =>
    handleAsyncOperation(
      () => Clipboard.getStringAsync(),
      (text) => setCopiedText(text),
    );

  const clearClipboardText = useCallback(() => {
    setCopiedText('');
    setError(null);
  }, []);

  return {
    copiedText,
    isLoading,
    error,
    copyToClipboard,
    getClipboardText,
    clearClipboardText,
  };
};

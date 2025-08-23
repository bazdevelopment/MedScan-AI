import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export function getStorageItem<T>(key: string): T {
  const value = storage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

export async function setStorageItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeStorageItem(key: string) {
  storage.delete(key);
}

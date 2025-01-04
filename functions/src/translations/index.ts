import { en } from './en';
import { es } from './es';
import { ITranslation } from './types';

export const translations: Record<string, ITranslation> = {
  en,
  es,
};

export const getTranslation = (lang: string): ITranslation => {
  return translations[lang] || translations['en'];
};

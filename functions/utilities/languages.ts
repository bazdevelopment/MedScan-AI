type LanguageCode =
  | 'en'
  | 'ar'
  | 'zh'
  | 'es'
  | 'hi'
  | 'pt'
  | 'ru'
  | 'ja'
  | 'ko'
  | 'de'
  | 'fr'
  | 'ro';

export type TLanguages = {
  [key in LanguageCode]: string;
};

export const LANGUAGES: TLanguages = {
  en: 'English',
  ar: 'Arabic',
  zh: 'Mandarin Chinese',
  es: 'Spanish',
  hi: 'Hindi',
  pt: 'Portuguese',
  ru: 'Russian',
  ja: 'Japanese',
  ko: 'Korean',
  de: 'German',
  fr: 'French',
  ro: 'Romanian',
};

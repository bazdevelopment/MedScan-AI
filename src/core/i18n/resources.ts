import ar from '@/translations/ar.json';
import de from '@/translations/de.json';
import en from '@/translations/en.json';
import es from '@/translations/es.json';
import fr from '@/translations/fr.json';
import hi from '@/translations/hi.json';
import ja from '@/translations/ja.json';
import ko from '@/translations/ko.json';
import pt from '@/translations/pt.json';
import ro from '@/translations/ro.json';
import ru from '@/translations/ru.json';
import zh from '@/translations/zh.json';

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
  zh: {
    translation: zh,
  },
  hi: {
    translation: hi,
  },
  pt: {
    translation: pt,
  },
  ru: {
    translation: ru,
  },
  ja: {
    translation: ja,
  },
  ko: {
    translation: ko,
  },
  de: {
    translation: de,
  },
  ro: {
    translation: ro,
  },
};

export type Language = keyof typeof resources;

import { ar } from './ar';
import { ca } from './ca';
import { cs } from './cs';
import { da } from './da';
import { de } from './de';
import { el } from './el';
import { en } from './en';
import { es } from './es';
import { fi } from './fi';
import { fr } from './fr';
import { he } from './he';
import { hi } from './hi';
import { hr } from './hr';
import { hu } from './hu';
import { id } from './id';
import { it } from './it';
import { ja } from './ja';
import { ko } from './ko';
import { ms } from './ms';
import { nl } from './nl';
import { no } from './no';
import { pl } from './pl';
import { pt } from './pt';
import { ro } from './ro';
import { ru } from './ru';
import { sk } from './sk';
import { sv } from './sv';
import { th } from './th';
import { tr } from './tr';
import { ITranslation } from './types';
import { uk } from './uk';
import { vi } from './vi';
import { zh } from './zh';

export const translations: Record<string, ITranslation> = {
  en,
  es,
  ar,
  de,
  fr,
  hi,
  ja,
  ko,
  pt,
  ro,
  ru,
  zh,
  ca,
  cs,
  da,
  el,
  fi,
  he,
  hr,
  hu,
  id,
  it,
  ms,
  nl,
  no,
  pl,
  sk,
  sv,
  th,
  tr,
  uk,
  vi,
  'pt-BR': pt,
  'pt-PT': pt,
  'es-ES': es,
  'es-MX': es,
  'fr-CA': fr,
};

export const getTranslation = (lang: string): ITranslation => {
  return translations[lang] || translations['en'];
};

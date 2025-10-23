export type LanguageCode =
  // --- Original List ---
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'it'
  | 'pt'
  | 'ru'
  | 'ja'
  | 'ko'
  | 'zh'
  | 'zh-TW'
  | 'hi'
  | 'ar'
  | 'tr'
  | 'pl'
  | 'nl'
  | 'ro'
  | 'uk'
  | 'sv'
  | 'da'
  | 'fi'
  | 'no'
  | 'cs'
  | 'hu'
  | 'el'
  | 'bg'
  | 'hr'
  | 'sl'
  | 'lt'
  | 'lv'

  // --- Additional European Languages ---
  | 'pt-BR'
  | 'sk'
  | 'et'
  | 'ga'
  | 'is'
  | 'mt'
  | 'ca'
  | 'eu'
  | 'gl'
  | 'sr'
  | 'sq'
  | 'mk'
  | 'be'
  | 'cy'
  | 'la'

  // --- Additional Asian Languages ---
  | 'es-ES'
  | 'es-MX'
  | 'fr-CA'
  | 'pt-PT'
  | 'id'
  | 'ms'
  | 'vi'
  | 'th'
  | 'tl'
  | 'he'
  | 'fa'
  | 'ur'
  | 'bn'
  | 'pa'
  | 'gu'
  | 'ta'
  | 'te'
  | 'kn'
  | 'ml'
  | 'mr'
  | 'ne'
  | 'si'
  | 'km'
  | 'lo'
  | 'my'
  | 'ka'
  | 'hy'
  | 'az'
  | 'uz'
  | 'kk'

  // --- African Languages ---
  | 'af'
  | 'sw'
  | 'ha'
  | 'yo'
  | 'ig'
  | 'zu'
  | 'xh'
  | 'am'
  | 'om'
  | 'so'
  | 'mg';

// --- Constructed Languages ---

export type TLanguages = {
  [key in LanguageCode]: string;
};

export const LANGUAGES: TLanguages = {
  // --- Original List (with consistent naming) ---
  en: 'English 🇺🇸',
  es: 'Español 🇪🇸',
  fr: 'Français 🇫🇷',
  de: 'Deutsch 🇩🇪',
  it: 'Italiano 🇮🇹',
  pt: 'Português 🇵🇹',
  ru: 'Русский 🇷🇺',
  ja: '日本語 🇯🇵',
  ko: '한국어 🇰🇷',
  zh: '中文 (简体) 🇨🇳',
  'es-ES': 'Español (España) 🇪🇸',
  'es-MX': 'Español (México) 🇲🇽',
  'zh-TW': '中文 (繁體) 🇹🇼',
  'fr-CA': 'Français (Canada) 🇨🇦',
  hi: 'हिन्दी 🇮🇳',
  ar: 'العربية 🇸🇦',
  tr: 'Türkçe 🇹🇷',
  pl: 'Polski 🇵🇱',
  nl: 'Dutch (Nederlands) 🇳🇱',
  ro: 'Română 🇷🇴',
  uk: 'Українська 🇺🇦',
  sv: 'Svenska 🇸🇪',
  da: 'Dansk 🇩🇰',
  fi: 'Suomi 🇫🇮',
  no: 'Norsk 🇳🇴',
  cs: 'Čeština 🇨🇿',
  hu: 'Magyar 🇭🇺',
  el: 'Ελληνικά 🇬🇷',
  bg: 'Български 🇧🇬',
  hr: 'Hrvatski 🇭🇷',
  sl: 'Slovenščina 🇸🇮',
  lt: 'Lietuvių 🇱🇹',
  lv: 'Latviešu 🇱🇻',

  // --- Additional European Languages ---
  'pt-BR': 'Português (Brasil) 🇧🇷',
  'pt-PT': 'Português (Portugal) 🇵🇹',
  sk: 'Slovenčina 🇸🇰',
  et: 'Eesti 🇪🇪',
  ga: 'Gaeilge 🇮🇪',
  is: 'Íslenska 🇮🇸',
  mt: 'Malti 🇲🇹',
  ca: 'Català 🇦🇩',
  eu: 'Euskara',
  gl: 'Galego',
  sr: 'Српски 🇷🇸',
  sq: 'Shqip 🇦🇱',
  mk: 'Македонски 🇲🇰',
  be: 'Беларуская 🇧🇾',
  cy: 'Cymraeg 🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  la: 'Latina 🇻🇦',

  // --- Additional Asian Languages ---
  id: 'Bahasa Indonesia 🇮🇩',
  ms: 'Bahasa Melayu 🇲🇾',
  vi: 'Tiếng Việt 🇻🇳',
  th: 'ภาษาไทย 🇹🇭',
  tl: 'Tagalog 🇵🇭',
  he: 'עברית 🇮🇱',
  fa: 'فارسی 🇮🇷',
  ur: 'اردو 🇵🇰',
  bn: 'বাংলা 🇧🇩',
  pa: 'ਪੰਜਾਬੀ 🇮🇳',
  gu: 'ગુજરાતી 🇮🇳',
  ta: 'தமிழ் 🇮🇳',
  te: 'తెలుగు 🇮🇳',
  kn: 'ಕನ್ನಡ 🇮🇳',
  ml: 'മലയാളം 🇮🇳',
  mr: 'मराठी 🇮🇳',
  ne: 'नेपाली 🇳🇵',
  si: 'සිංහල 🇱🇰',
  km: 'ខ្មែរ 🇰🇭',
  lo: 'ພາສາລາວ 🇱🇦',
  my: 'မြန်မာဘာသာ 🇲🇲',
  ka: 'ქართული 🇬🇪',
  hy: 'Հայերեն 🇦🇲',
  az: 'Azərbaycan 🇦🇿',
  uz: 'Oʻzbekcha 🇺🇿',
  kk: 'Қазақша 🇰🇿',

  // --- African Languages ---
  af: 'Afrikaans 🇿🇦',
  sw: 'Swahili 🇰🇪',
  ha: 'Hausa 🇳🇬',
  yo: 'Yorùbá 🇳🇬',
  ig: 'Igbo 🇳🇬',
  zu: 'Zulu 🇿🇦',
  xh: 'Xhosa 🇿🇦',
  am: 'Amharic 🇪🇹',
  om: 'Oromo 🇪🇹',
  so: 'Somali 🇸🇴',
  mg: 'Malagasy 🇲🇬',
};

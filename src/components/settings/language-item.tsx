/* eslint-disable max-lines-per-function */
import * as React from 'react';

import { useUserPreferredLanguage } from '@/api/user/user.hooks';
import { translate, useSelectedLanguage } from '@/core';
import { type Language } from '@/core/i18n/resources';
import type { OptionType } from '@/ui';
import { Options, useModal } from '@/ui';

import { Item } from './item';

export const LanguageItem = () => {
  const { mutateAsync: onSelectPreferredLanguage, isPending } =
    useUserPreferredLanguage();
  const { language, setLanguage } = useSelectedLanguage();
  const modal = useModal();
  const onSelect = async (option: OptionType) => {
    await onSelectPreferredLanguage({
      language: option.value as Language,
    }).then(() => {
      setLanguage(option.value as Language);
      modal.dismiss();
    });
  };

  const langs = React.useMemo(
    () => [
      // English - Most widely used global language, especially in business and internet
      {
        label: `${translate('settings.languages.english')} 🇺🇸 🇬🇧`,
        value: 'en',
      },
      // Mandarin Chinese - Largest number of native speakers
      {
        label: `${translate('settings.languages.mandarin_chinese')} 🇨🇳`,
        value: 'zh',
      },
      // Hindi - Large number of speakers, growing digital presence
      {
        label: `${translate('settings.languages.hindi')} 🇮🇳`,
        value: 'hi',
      },
      // Spanish - Widely spoken across multiple continents
      {
        label: `${translate('settings.languages.spanish_spain')} 🇪🇸`,
        value: 'es-ES',
      },
      {
        label: `${translate('settings.languages.spanish_mexico')} 🇲🇽`,
        value: 'es-MX',
      },
      // Arabic - Widely used in multiple countries
      {
        label: `${translate('settings.languages.arabic')} 🇸🇦`,
        value: 'ar',
      },
      // French - Major international language
      {
        label: `${translate('settings.languages.french')} 🇫🇷`,
        value: 'fr',
      },
      {
        label: `${translate('settings.languages.french_canada')} 🇨🇦`,
        value: 'fr-CA',
      },
      // Portuguese - Significant global presence
      {
        label: `${translate('settings.languages.portuguese_brazil')} 🇧🇷`,
        value: 'pt-BR',
      },
      {
        label: `${translate('settings.languages.portuguese_portugal')} 🇵🇹`,
        value: 'pt-PT',
      },
      // German - Important in business and science
      {
        label: `${translate('settings.languages.german')} 🇩🇪`,
        value: 'de',
      },
      // Japanese - Major economic power
      {
        label: `${translate('settings.languages.japanese')} 🇯🇵`,
        value: 'ja',
      },
      // Russian - Regional importance
      {
        label: `${translate('settings.languages.russian')} 🇷🇺`,
        value: 'ru',
      },
      // Korean - Growing global influence
      {
        label: `${translate('settings.languages.korean')} 🇰🇷`,
        value: 'ko',
      },
      // Italian - Major European language
      {
        label: `${translate('settings.languages.italian')} 🇮🇹`,
        value: 'it',
      },
      // Turkish - Regional significance
      {
        label: `${translate('settings.languages.turkish')} 🇹🇷`,
        value: 'tr',
      },
      // Vietnamese - Growing economy
      {
        label: `${translate('settings.languages.vietnamese')} 🇻🇳`,
        value: 'vi',
      },
      // Polish - EU member state
      {
        label: `${translate('settings.languages.polish')} 🇵🇱`,
        value: 'pl',
      },
      // Ukrainian
      {
        label: `${translate('settings.languages.ukrainian')} 🇺🇦`,
        value: 'uk',
      },
      // Romanian
      {
        label: `${translate('settings.languages.romanian')} 🇷🇴`,
        value: 'ro',
      },
      // Dutch
      {
        label: `${translate('settings.languages.dutch')} 🇳🇱`,
        value: 'nl',
      },
      // Czech
      {
        label: `${translate('settings.languages.czech')} 🇨🇿`,
        value: 'cs',
      },
      // Greek
      {
        label: `${translate('settings.languages.greek')} 🇬🇷`,
        value: 'el',
      },
      // Swedish
      {
        label: `${translate('settings.languages.swedish')} 🇸🇪`,
        value: 'sv',
      },
      // Hungarian
      {
        label: `${translate('settings.languages.hungarian')} 🇭🇺`,
        value: 'hu',
      },
      // Thai
      {
        label: `${translate('settings.languages.thai')} 🇹🇭`,
        value: 'th',
      },
      // Hebrew
      {
        label: `${translate('settings.languages.hebrew')} 🇮🇱`,
        value: 'he',
      },
      // Indonesian
      {
        label: `${translate('settings.languages.indonesian')} 🇮🇩`,
        value: 'id',
      },
      // Malay
      {
        label: `${translate('settings.languages.malay')} 🇲🇾`,
        value: 'ms',
      },
      // Finnish
      {
        label: `${translate('settings.languages.finnish')} 🇫🇮`,
        value: 'fi',
      },
      // Danish
      {
        label: `${translate('settings.languages.danish')} 🇩🇰`,
        value: 'da',
      },
      // Norwegian
      {
        label: `${translate('settings.languages.norwegian')} 🇳🇴`,
        value: 'no',
      },
      // Slovak
      {
        label: `${translate('settings.languages.slovak')} 🇸🇰`,
        value: 'sk',
      },
      // Croatian
      {
        label: `${translate('settings.languages.croatian')} 🇭🇷`,
        value: 'hr',
      },
      // Catalan
      {
        label: `${translate('settings.languages.catalan')} 🏴`,
        value: 'ca',
      },
    ],
    [],
  );

  const selectedLanguage = React.useMemo(
    () => langs.find((lang) => lang.value === language),
    [language, langs],
  );
  return (
    <>
      <Item
        text="settings.language"
        value={selectedLanguage?.label}
        onPress={modal.present}
      />
      <Options
        isPending={isPending}
        ref={modal.ref}
        options={langs}
        onSelect={onSelect}
        value={selectedLanguage?.value}
        heading={translate('settings.language')}
      />
    </>
  );
};

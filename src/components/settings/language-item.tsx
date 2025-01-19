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
        label: `${translate('settings.languages.english')} 🇺🇸`,
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
        label: `${translate('settings.languages.spanish')} 🇪🇸`,
        value: 'es',
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
      // Portuguese - Significant global presence
      {
        label: `${translate('settings.languages.portuguese')} 🇵🇹`,
        value: 'pt',
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
      // Romanian
      {
        label: `${translate('settings.languages.romanian')} 🇷🇴`,
        value: 'ro',
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

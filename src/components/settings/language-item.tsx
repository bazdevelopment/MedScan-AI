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
      { label: translate('settings.languages.english'), value: 'en' },
      { label: translate('settings.languages.mandarin_chinese'), value: 'zh' },
      { label: translate('settings.languages.spanish'), value: 'es' },
      { label: translate('settings.languages.hindi'), value: 'hi' },
      { label: translate('settings.languages.arabic'), value: 'ar' },
      { label: translate('settings.languages.portuguese'), value: 'pt' },
      { label: translate('settings.languages.russian'), value: 'ru' },
      { label: translate('settings.languages.japanese'), value: 'ja' },
      { label: translate('settings.languages.korean'), value: 'ko' },
      { label: translate('settings.languages.german'), value: 'de' },
      { label: translate('settings.languages.french'), value: 'fr' },
      { label: translate('settings.languages.romanian'), value: 'ro' },
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
      />
    </>
  );
};

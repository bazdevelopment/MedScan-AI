import React from 'react';

import type { ColorSchemeType } from '@/core';
import { translate, useSelectedTheme } from '@/core';
import type { OptionType } from '@/ui';
import { Options, useModal } from '@/ui';
import { MoonIcon, PhoneIcon, SunIcon } from '@/ui/assets/icons';

import { Item } from './item';

export const ThemeItem = () => {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const modal = useModal();

  const onSelect = React.useCallback(
    (option: OptionType) => {
      setSelectedTheme(option.value as ColorSchemeType);
      modal.dismiss();
    },
    [setSelectedTheme, modal],
  );

  const themes = React.useMemo(
    () => [
      {
        label: `${translate('settings.theme.light')}`,
        value: 'light',
        icon: <SunIcon />,
      },
      {
        label: `${translate('settings.theme.dark')}`,
        value: 'dark',
        icon: <MoonIcon />,
      },
      {
        label: `${translate('settings.theme.system')}`,
        value: 'system',
        icon: <PhoneIcon />,
      },
    ],
    [],
  );

  const theme = React.useMemo(
    () => themes.find((t) => t.value === selectedTheme),
    [selectedTheme, themes],
  );

  return (
    <>
      <Item
        text="settings.theme.title"
        value={theme?.label}
        onPress={modal.present}
      />
      <Options
        ref={modal.ref}
        options={themes}
        onSelect={onSelect}
        value={theme?.value}
        heading={translate('settings.theme.title')}
      />
    </>
  );
};

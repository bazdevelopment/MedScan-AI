import React from 'react';

import { translate } from '@/core/i18n';
import { Feed as FeedIcon, ReportIcon, Settings } from '@/ui/assets/icons';

import { type ITabsNavigationScreen } from './tabs.interface';
import { ChatIcon } from '@/ui/assets/icons/chat-icon';

export const tabScreens: ITabsNavigationScreen[] = [
  {
    id: 1,
    screenName: 'index',
    title: translate('home.tab'),
    tabBarTestID: 'home-tab',
    icon: (color: string, focused: boolean) => (
      <FeedIcon color={color} focused={focused} />
    ),
    header: false,
  },
  {
    id: 2,
    screenName: 'chat',
    title: translate('chat.tab'),
    tabBarTestID: 'chat-tab',
    icon: (color: string, focused: boolean) => (
      <ChatIcon
        color={color}
        strokeWidth={1.75}
        top={-5}
        width={24}
        height={24}
        focused={focused}
      />
    ),
    header: true,
  },
  {
    id: 3,
    screenName: 'reports',
    title: translate('reports.tab'),
    tabBarTestID: 'reports-tab',
    icon: (color: string, focused: boolean) => (
      <ReportIcon color={color} focused={focused} />
    ),
    header: true,
  },
  {
    id: 4,
    screenName: 'settings',
    title: translate('settings.tab'),
    tabBarTestID: 'settings-tab',
    icon: (color: string, focused: boolean) => (
      <Settings color={color} focused={focused} />
    ),
    header: true,
  },
];

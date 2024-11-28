import React from 'react';

import CustomHeader from '@/components/cusom-header';
import { Feed as FeedIcon, ReportIcon, Settings } from '@/ui/assets/icons';

import { type ITabsNavigationScreen } from './tabs.interface';

export const tabScreens: ITabsNavigationScreen[] = [
  {
    id: 1,
    screenName: 'index',
    title: 'Home',
    tabBarTestID: 'home-tab',
    icon: (color: string, focused: boolean) => (
      <FeedIcon color={color} withLinearGradient={focused} />
    ),
    header: null,
  },
  {
    id: 2,
    screenName: 'reports',
    title: 'Reports',
    tabBarTestID: 'reports-tab',
    icon: (color: string, focused: boolean) => (
      <ReportIcon color={color} withLinearGradient={focused} />
    ),
    header: (props) => <CustomHeader {...props} />,
  },
  {
    id: 3,
    screenName: 'settings',
    title: 'Settings',
    tabBarTestID: 'settings-tab',
    icon: (color: string, focused: boolean) => (
      <Settings color={color} withLinearGradient={focused} />
    ),
    header: (props) => <CustomHeader {...props} />,
  },
];

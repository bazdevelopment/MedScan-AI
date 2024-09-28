import { Stack } from 'expo-router';
import * as React from 'react';

import { Buttons } from '@/components/buttons';
import { Colors } from '@/components/colors';
import { Inputs } from '@/components/inputs';
import { Typography } from '@/components/typography';
import { FocusAwareStatusBar, ScrollView } from '@/ui';

export default function UILibrary() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'UI library',
          headerBackTitleVisible: false,
        }}
      />
      <FocusAwareStatusBar />
      <ScrollView className="px-4">
        <Typography />
        <Colors />
        <Buttons />
        <Inputs />
      </ScrollView>
    </>
  );
}

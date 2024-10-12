import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="upload-file-flow-modal"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

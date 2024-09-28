import React from 'react';

import { FocusAwareStatusBar, View } from '@/ui';

export default function Home() {
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
    </View>
  );
}

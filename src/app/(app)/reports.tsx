import React from 'react';
import { View } from 'react-native';

import { FocusAwareStatusBar, Text } from '@/ui';

const Reports = () => {
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <Text>Reports scren</Text>
    </View>
  );
};

export default Reports;

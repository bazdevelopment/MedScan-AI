import { useScrollToTop } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View } from 'react-native';

import { FocusAwareStatusBar, ScrollView } from '@/ui';

const Reports = () => {
  const scrollViewRef = useRef(null);
  useScrollToTop(scrollViewRef);
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <ScrollView ref={scrollViewRef}>Reports screen</ScrollView>
    </View>
  );
};

export default Reports;

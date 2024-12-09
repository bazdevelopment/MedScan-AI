import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Text } from '@/ui';

const ScanInterpretationDetailsScreen = () => {
  const { id: documentId } = useLocalSearchParams();

  console.log('documentId', documentId);

  return (
    <View>
      <Text>ScanInterpretationScreen</Text>
    </View>
  );
};

export default ScanInterpretationDetailsScreen;

import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { Text } from '@/ui';

const NotificationDetailsScreen = () => {
  const { title, body } = useLocalSearchParams();
  console.log('title, body', title, body);

  return (
    <View>
      <Text>ceva</Text>
    </View>
  );
};

export default NotificationDetailsScreen;

/* eslint-disable max-lines-per-function */
import { Animated, View } from 'react-native';

import { useBouncingMessage } from '@/core/hooks/use-bouncing-message';

const BounceLoader = ({
  loadingMessages,
  className,
}: {
  loadingMessages: string[];
  className?: string;
}) => {
  const { fadeValue, loadingMessage } = useBouncingMessage(loadingMessages);
  return (
    <View className={className}>
      {/* Fading Loading Message */}
      <Animated.Text
        className="text-center mt-4 h-14 font-medium text-white"
        style={{ opacity: fadeValue }}
      >
        {loadingMessage}
      </Animated.Text>
    </View>
  );
};

export default BounceLoader;

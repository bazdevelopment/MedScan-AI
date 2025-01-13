/* eslint-disable max-lines-per-function */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { useHaptic } from '@/core/hooks/use-haptics';
import { colors } from '@/ui';

const REFRESH_THRESHOLD = 80;
const REFRESH_DELAY = 1500; // 1.5 seconds delay for smoother feel

const PullToRefresh = ({
  onRefresh,
  children,
  refreshingComponent,
  shouldRefresh,
  pullThreshold = REFRESH_THRESHOLD,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;
  const addSelectionHapticEffect = useHaptic('selection');

  const isPulling = useRef(false);

  const resetPosition = useCallback(() => {
    Animated.spring(translateY, {
      toValue: 0,
      tension: 30,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);

    // Animate to pulled position
    Animated.spring(translateY, {
      toValue: pullThreshold * 0.4, // Reduced movement for subtler effect
      tension: 40,
      friction: 7,
      useNativeDriver: true,
    }).start();

    try {
      await new Promise((resolve) => setTimeout(resolve, REFRESH_DELAY));
      addSelectionHapticEffect?.();
      if (onRefresh) {
        await onRefresh();
      }
    } finally {
      setRefreshing(false);
      resetPosition();
    }
  }, [translateY, pullThreshold, onRefresh, resetPosition]);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    {
      useNativeDriver: true,
      listener: ({ nativeEvent }) => {
        // Add resistance to pull
        const newY = Math.min(nativeEvent.translationY * 0.5, pullThreshold);
        translateY.setValue(newY);
      },
    },
  );

  const handleStateChange = useCallback(
    ({ nativeEvent }) => {
      if (nativeEvent.state === State.END) {
        if (
          nativeEvent.translationY > pullThreshold &&
          !refreshing &&
          !isPulling.current
        ) {
          isPulling.current = true;
          handleRefresh().finally(() => {
            isPulling.current = false;
          });
        } else {
          resetPosition();
        }
      }
    },
    [pullThreshold, refreshing, handleRefresh, resetPosition],
  );

  const defaultRefreshingComponent = (
    <ActivityIndicator color={colors.danger[400]} />
  );

  useEffect(() => {
    if (shouldRefresh) {
      handleRefresh();
    }
  }, [shouldRefresh, handleRefresh]);

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={handleStateChange}
        enabled={!refreshing}
        activeOffsetY={Platform.OS === 'android' ? [-200, 100] : undefined}
      >
        <Animated.View
          style={[
            styles.content,
            {
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [0, pullThreshold],
                    outputRange: [0, pullThreshold * 1.5],

                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          {refreshing && (refreshingComponent || defaultRefreshingComponent)}
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
});

export default PullToRefresh;

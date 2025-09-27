/* eslint-disable max-lines-per-function */
import React from 'react';
import { useColorScheme } from 'nativewind';
import { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';

import { colors, Text } from '@/ui';

const AnimatedChatQuestions = ({
  questions,
  onSelect,
}: {
  questions: string[];
  onSelect: (q: string) => void;
}) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  // Create a ref for animated values, keyed by question text for stability
  const anims = useRef<{ [key: string]: Animated.Value }>({});

  // Initialize animation values for all current questions
  questions.forEach((q) => {
    if (!anims.current[q]) {
      anims.current[q] = new Animated.Value(0);
    }
  });

  // Trigger animation when questions change
  useEffect(() => {
    const animations = questions.map((q) =>
      Animated.spring(anims.current[q], {
        toValue: 1,
        useNativeDriver: true,
      }),
    );

    Animated.stagger(100, animations).start();
  }, [questions]);

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 16,
      }}
    >
      {questions.map((q) => (
        <Animated.View
          key={q}
          style={{
            opacity: anims.current[q],
            transform: [
              {
                translateY: anims.current[q].interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              },
              {
                scale: anims.current[q].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
            margin: 6,
          }}
        >
          <TouchableOpacity
            onPress={() => onSelect(q)}
            style={{
              backgroundColor: isDark ? '#191A21' : colors.white,
              borderRadius: 20,
              paddingVertical: 10,
              paddingHorizontal: 18,
              borderWidth: 1,
              borderColor: colors.primary[900],
            }}
          >
            <Text className="text-center font-medium-nunito text-base text-black dark:text-white">
              {q}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

export default AnimatedChatQuestions;

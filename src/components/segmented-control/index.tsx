/* eslint-disable max-lines-per-function */
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { DEVICE_DIMENSIONS } from '@/constants/device-dimentions';
import { colors } from '@/ui';

import SegmentedControlTab from './components/segmented-control-tab';
import { type ISegmentedControl } from './segmented-control.interface';
import { styles } from './segmented-control.styles';
/**
 * Custom segmented control component
 */
const SegmentedControl = ({
  options,
  selectedOption,
  onOptionPress,
  tabActiveColor = colors.primary[900],
  tabInactiveColor = colors.white,
  borderColor = colors.primary[900],
  withBorder = false,
  backgroundColor = colors.white,
  spacing = 0,
  checkIsActive,
}: ISegmentedControl) => {
  const internalPadding = 10;
  const segmentedControlWidth =
    DEVICE_DIMENSIONS.DEVICE_WIDTH - spacing * (options.length - 1);
  const itemWidth = (segmentedControlWidth - internalPadding) / options.length;
  const selectedOptionIndex = options.findIndex(
    (option) => option.title === selectedOption?.title,
  );

  const rStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(
        itemWidth * selectedOptionIndex +
          spacing * selectedOptionIndex +
          internalPadding / 2,
      ),
    };
  }, [selectedOption, options, itemWidth]);

  return (
    <View style={{ backgroundColor }}>
      <View
        style={[
          styles.container,
          {
            width: segmentedControlWidth,
            paddingLeft: internalPadding / 2,
            gap: spacing,
          },
        ]}
      >
        {Boolean(selectedOption) && (
          <Animated.View
            style={[
              rStyle,
              {
                ...styles.activeBox,
                width: itemWidth,
                backgroundColor: tabActiveColor,
              },
            ]}
          />
        )}
        {options.map((option) => {
          return (
            <SegmentedControlTab
              onPress={onOptionPress}
              key={option.id}
              isActive={checkIsActive(option.id)}
              option={option}
              tabInactiveColor={tabInactiveColor}
              tabWidth={itemWidth}
              borderColor={borderColor}
              withBorder={withBorder}
            />
          );
        })}
      </View>
    </View>
  );
};

export default SegmentedControl;

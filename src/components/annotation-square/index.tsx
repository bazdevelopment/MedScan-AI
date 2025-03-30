/* eslint-disable max-lines-per-function */
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { type IAnnotationSquare } from './annotation-square.interface';

const AnnotationSquare = ({
  square,
  onDragEnd,
  screenWidth,
  screenHeight,
  deleteZoneActive,
  trashPulse,
}: IAnnotationSquare) => {
  const x = useSharedValue(square.x);
  const y = useSharedValue(square.y);
  const width = useSharedValue(square.width);
  const height = useSharedValue(square.height);
  const activeCorner = useSharedValue(null);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const initialX = useSharedValue(0);
  const initialY = useSharedValue(0);
  const initialWidth = useSharedValue(0);
  const initialHeight = useSharedValue(0);
  const isActive = useSharedValue(false);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const isDraggingCorner = useSharedValue(false);

  // Main drag gesture for moving the entire square
  const dragGesture = Gesture.Pan()
    .onStart((e) => {
      // Skip if already handling a corner drag
      if (isDraggingCorner.value) return;

      initialX.value = x.value;
      initialY.value = y.value;
      startX.value = e.absoluteX;
      startY.value = e.absoluteY;
      isActive.value = true;
    })
    .onUpdate((e) => {
      // Skip if already handling a corner drag
      if (isDraggingCorner.value) return;

      const deltaX = e.absoluteX - startX.value;
      const deltaY = e.absoluteY - startY.value;

      // MOVE LOGIC
      const newX = initialX.value + deltaX;
      const newY = initialY.value + deltaY;
      x.value = Math.max(0, Math.min(newX, screenWidth - width.value));
      y.value = Math.max(0, Math.min(newY, screenHeight - height.value));

      // Delete zone animation (kept from original)
      const distanceToDelete = Math.max(0, screenHeight - 150 - e.absoluteY);
      const normalizedDistance = Math.min(1, distanceToDelete / 150);
      deleteZoneActive.value = withTiming(1 - normalizedDistance, {
        duration: 100,
      });
      trashPulse.value = withTiming((1 - normalizedDistance) * 1.5, {
        duration: 100,
      });

      if (e.absoluteY > screenHeight - 150) {
        scale.value = withTiming(0.9, { duration: 100 });
        opacity.value = withTiming(0.7, { duration: 100 });
      } else {
        scale.value = withTiming(1, { duration: 100 });
        opacity.value = withTiming(1, { duration: 100 });
      }
    })
    .onEnd((e) => {
      // Skip if already handling a corner drag
      if (isDraggingCorner.value) return;

      isActive.value = false;
      scale.value = withTiming(1);
      opacity.value = withTiming(1);
      deleteZoneActive.value = withTiming(0, { duration: 200 });
      trashPulse.value = withTiming(0, { duration: 200 });
      runOnJS(onDragEnd)(e);
    });

  // Combine gestures
  const gesture = Gesture.Exclusive(dragGesture);

  // Styles for the square
  const squareStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x.value,
    top: y.value,
    width: width.value,
    height: height.value,
    borderColor: isActive.value ? '#FFA500' : '#FF0000',
    borderWidth: 3,
    backgroundColor: isActive.value ? 'rgba(255, 0, 0, 0.3)' : 'transparent',
    zIndex: 10,
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  // Styles for each resize handle
  const resizeHandleStyle = (corner) => {
    return useAnimatedStyle(() => {
      const handleSize = 14;
      let left = 0,
        top = 0;

      switch (corner) {
        case 'top-left':
          left = -handleSize / 2;
          top = -handleSize / 2;
          break;
        case 'top-right':
          left = width.value - handleSize / 1.25;
          top = -handleSize / 1.85;
          break;
        case 'bottom-left':
          left = -handleSize / 2;
          top = height.value - handleSize / 1;
          break;
        case 'bottom-right':
          left = width.value - handleSize / 1;
          top = height.value - handleSize / 1;
          break;
      }

      return {
        position: 'absolute',
        left,
        top,
        width: handleSize,
        height: handleSize,
        borderRadius: handleSize / 2,
        backgroundColor: '#FF0000',
        borderWidth: 2,
        borderColor: 'white',
        zIndex: 20,
      };
    });
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={squareStyle}>
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(
          (corner) => (
            <GestureDetector
              key={corner}
              gesture={Gesture.Pan()
                .onStart(() => {
                  activeCorner.value = corner;
                  initialX.value = x.value;
                  initialY.value = y.value;
                  initialWidth.value = width.value;
                  initialHeight.value = height.value;
                  isActive.value = true;
                  isDraggingCorner.value = true;
                })
                .onUpdate((e) => {
                  const deltaX = e.translationX;
                  const deltaY = e.translationY;

                  // Apply specific resize logic based on which handle is being dragged
                  if (corner === 'top-left') {
                    x.value = Math.min(
                      initialX.value + initialWidth.value - 50,
                      initialX.value + deltaX,
                    );
                    y.value = Math.min(
                      initialY.value + initialHeight.value - 50,
                      initialY.value + deltaY,
                    );
                    width.value = initialWidth.value - deltaX;
                    height.value = initialHeight.value - deltaY;
                  } else if (corner === 'top-right') {
                    y.value = Math.min(
                      initialY.value + initialHeight.value - 50,
                      initialY.value + deltaY,
                    );
                    width.value = initialWidth.value + deltaX;
                    height.value = initialHeight.value - deltaY;
                  } else if (corner === 'bottom-left') {
                    x.value = Math.min(
                      initialX.value + initialWidth.value - 50,
                      initialX.value + deltaX,
                    );
                    width.value = initialWidth.value - deltaX;
                    height.value = initialHeight.value + deltaY;
                  } else if (corner === 'bottom-right') {
                    width.value = initialWidth.value + deltaX;
                    height.value = initialHeight.value + deltaY;
                  }

                  // Ensure minimum size
                  width.value = Math.max(50, width.value);
                  height.value = Math.max(50, height.value);

                  // Ensure rectangle stays within screen bounds
                  if (x.value < 0) x.value = 0;
                  if (y.value < 0) y.value = 0;
                  if (x.value + width.value > screenWidth)
                    width.value = screenWidth - x.value;
                  if (y.value + height.value > screenHeight)
                    height.value = screenHeight - y.value;
                })
                .onEnd((e) => {
                  activeCorner.value = null;
                  isActive.value = false;
                  isDraggingCorner.value = false;
                  runOnJS(onDragEnd)(e);
                })}
            >
              <Animated.View style={resizeHandleStyle(corner)} />
            </GestureDetector>
          ),
        )}
      </Animated.View>
    </GestureDetector>
  );
};

export default AnnotationSquare;

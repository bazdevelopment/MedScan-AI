/* eslint-disable max-lines-per-function */
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { captureRef } from 'react-native-view-shot';

import { translate } from '@/core';
import getDeviceSizeCategory from '@/core/utilities/get-device-size-category';
import { colors, Text } from '@/ui';
import { InstructionIcon, TrashIcon } from '@/ui/assets/icons';

import AnnotationSquare from '../annotation-square';
import { type ISquare } from '../annotation-square/annotation-square.interface';
import StudioToolbar from '../studio-toolbar';
import { type IImageAnnotationStudio } from './image-annotation-studio.interface';

const ImageAnnotationStudio = ({
  imageUri,
  closeTool,
  onUpdateImageUrlHighlighted,
  removeSquare,
  addSquare,
  squares,
}: IImageAnnotationStudio) => {
  const viewRef = useRef();
  const deleteZoneActive = useSharedValue(0);
  const trashPulse = useSharedValue(0);
  const { isVerySmallDevice } = getDeviceSizeCategory();

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [modalVisible, setModalVisible] = useState(false);

  // Calculate the displayed dimensions (since resizeMode="contain" is used)

  const handleDrag = (square: ISquare, e) => {
    if (e.absoluteY > screenHeight - 150) {
      runOnJS(removeSquare)(square.id);
      return true;
    }
    return false;
  };

  const handleCaptureAndConfirm = async () => {
    const uri = await captureRef(viewRef, {
      format: 'jpg',
      quality: 1,
      snapshotContentContainer: false, // Don't capture entire content container
      handleGLSurfaceViewOnAndroid: true,
    });
    onUpdateImageUrlHighlighted(uri);
    closeTool();
  };

  const deleteZoneStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(1 + deleteZoneActive.value * 0.1, {
            damping: 10,
            stiffness: 200,
          }),
        },
        {
          translateY: withSpring(deleteZoneActive.value * -10, {
            damping: 10,
            stiffness: 200,
          }),
        },
      ],
      backgroundColor: `rgba(255, 50, 50, ${0.5 + deleteZoneActive.value * 0.3})`,
      borderWidth: 2,
      borderColor: `rgba(255, 255, 255, ${deleteZoneActive.value * 0.8})`,
    };
  });

  const trashIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(1 + trashPulse.value * 0.2, {
            damping: 10,
            stiffness: 200,
          }),
        },
        {
          rotate: `${trashPulse.value * 10}deg`,
        },
      ],
    };
  });

  return (
    <View className="flex-1 bg-black">
      <TouchableOpacity
        className="absolute right-[-10] top-[7%] z-50 flex-row items-center gap-2 rounded-2xl bg-primary-900 px-4 py-3 pr-10 shadow-lg"
        onPress={() => setModalVisible(true)}
      >
        {/* <MaterialIcons name="info-outline" size={20} color="white" /> */}
        <InstructionIcon width={20} height={20} fill={colors.white} />
        <Text className="font-nunito-semibold ml-2 text-white">
          {translate('components.ImageAnnotationStudio.instructions.title')}
        </Text>
      </TouchableOpacity>

      <View
        ref={viewRef}
        collapsable={false}
        style={{
          width: screenWidth,
          height: Platform.isPad ? 800 : isVerySmallDevice ? 350 : 400,
          marginTop: isVerySmallDevice ? '15%' : Platform.isPad ? '25%' : '50%',
        }}
      >
        <Image
          source={{ uri: imageUri }}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="contain" // Fits inside, preserves aspect ratio
        />

        {squares.map((square) => (
          <AnnotationSquare
            key={square.id}
            square={square}
            onDragEnd={(e) => handleDrag(square, e)}
            screenWidth={screenWidth}
            screenHeight={screenHeight}
            deleteZoneActive={deleteZoneActive}
            trashPulse={trashPulse}
          />
        ))}
      </View>

      {/* Delete zone - only visible when there are highlights */}
      {squares.length > 0 && (
        <Animated.View style={[styles.deleteZone, deleteZoneStyle]}>
          <View style={styles.deleteZoneContent}>
            <Animated.View style={trashIconStyle}>
              <TrashIcon width={28} height={28} fill={colors.white} />
            </Animated.View>
            <Text style={styles.deleteZoneText}>Drag here to delete</Text>
          </View>
        </Animated.View>
      )}

      <StudioToolbar
        onClose={closeTool}
        onConfirm={handleCaptureAndConfirm}
        onAdjust={addSquare}
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/50 p-5">
          <View className="w-full max-w-md rounded-xl bg-blackEerie p-6 shadow-lg">
            {/* Modal Header */}
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="font-nunito-bold text-xl text-white">
                {translate(
                  'components.ImageAnnotationStudio.instructions.title',
                )}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              ></TouchableOpacity>
            </View>

            {/* Modal Content */}
            <View className="space-y-4">
              <View className="flex-row items-start gap-3">
                <Text className="font-nunito-semibold flex-1 text-white">
                  {translate(
                    'components.ImageAnnotationStudio.instructions.first',
                  )}
                </Text>
              </View>

              <View className="flex-row items-start gap-3">
                <Text className="font-nunito-semibold flex-1 text-white">
                  {translate(
                    'components.ImageAnnotationStudio.instructions.second',
                  )}
                </Text>
              </View>

              <View className="flex-row items-start gap-3">
                <Text className="font-nunito-semibold flex-1 text-white">
                  {translate(
                    'components.ImageAnnotationStudio.instructions.third',
                  )}
                </Text>
              </View>
            </View>

            {/* Close Button */}
            <TouchableOpacity
              className="mt-6 rounded-lg bg-primary-900 py-3"
              onPress={() => setModalVisible(false)}
            >
              <Text className="font-nunito-bold text-center text-white">
                {translate('general.close')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: Platform.isPad ? '95%' : '100%',
    zIndex: 0,
  },
  deleteZone: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  deleteZoneContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteZoneText: {
    color: 'white',
    marginLeft: 12,
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 16,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  addButton: {
    backgroundColor: '#3B82F6',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    backgroundColor: '#93C5FD',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 16,
  },
});

export default ImageAnnotationStudio;

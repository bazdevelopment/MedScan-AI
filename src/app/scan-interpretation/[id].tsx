/* eslint-disable max-lines-per-function */
import { BlurView } from 'expo-blur';
import { useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { useInterpretationById } from '@/api/interpretation/interpretation.hooks';
import CustomModal from '@/components/custom-modal';
import Icon from '@/components/icon';
import VideoPlayer from '@/components/video';
import { useModal } from '@/core/hooks/use-modal';
import { colors, Image, Text } from '@/ui';
import { CalendarIcon, DocumentIcon, PlayerIcon } from '@/ui/assets/icons';

const ScanInterpretationDetailsScreen = () => {
  const { id: documentId } = useLocalSearchParams();
  const { isVisible: isMediaModalVisible, openModal, closeModal } = useModal();

  const { data, isPending } = useInterpretationById({
    documentId: documentId as string,
  })();

  const isVideo = useMemo(
    () => data?.record?.mimeType === 'video/quicktime',
    [data?.record?.mimeType],
  );

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-500">Loading...</Text>
      </View>
    );
  }

  const renderMediaPreview = () => (
    <TouchableOpacity
      onPress={openModal}
      className="mt-4 overflow-hidden rounded-xl shadow-lg"
    >
      {isVideo ? (
        <View className="h-48 items-center justify-center rounded-xl bg-gray-900">
          <Icon icon={<PlayerIcon />} size={60} color={colors.danger[400]} />
          <Text className="mt-2 text-white">Play Video</Text>
        </View>
      ) : (
        <View className="h-48 w-full overflow-hidden rounded-xl">
          <Image source={{ uri: data.record.url }} className="h-full w-full" />
          <BlurView intensity={60} className="absolute bottom-0 w-full p-2">
            <Text className="text-sm text-white">Tap to view full size</Text>
          </BlurView>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Content */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Media Preview */}
        {data.record.url && renderMediaPreview()}

        {/* Document Info Card */}
        <View className="mt-6 rounded-2xl bg-white p-5 shadow-md">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Icon
                icon={<DocumentIcon color={colors.black} />}
                size={20}
                color={colors.white}
              />
              <Text className="ml-2 text-base font-medium">
                {data.record.mimeType.toUpperCase()}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Icon
                icon={<CalendarIcon color={colors.black} />}
                size={20}
                color={colors.white}
              />
              <Text className="ml-2 text-sm text-gray-500">
                {new Date(data.record.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Text>
            </View>
          </View>

          <View className="my-4 h-px bg-gray-100" />

          <View className="mb-2">
            <Text className="mb-1 text-sm text-gray-500">Document ID</Text>
            <Text className="font-mono text-base">{documentId}</Text>
          </View>
        </View>

        {/* Interpretation Section */}
        <View className="my-6 rounded-2xl bg-white p-5 shadow-md">
          <View className="mb-6">
            <Text className="mb-2 text-lg font-semibold text-indigo-600">
              Question
            </Text>
            <View className="rounded-xl bg-gray-50 p-4">
              <Text className="text-base text-gray-700">
                {data.record.promptMessage || 'No question provided'}
              </Text>
            </View>
          </View>

          <View>
            <Text className="mb-2 text-lg font-semibold text-indigo-600">
              Interpretation
            </Text>
            <View className="rounded-xl bg-gray-50 p-4">
              <Text className="text-base text-gray-700">
                {data.record.interpretationResult}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <CustomModal visible={isMediaModalVisible} onClose={closeModal}>
        {isVideo ? (
          <View className="h-72 w-full">
            <VideoPlayer videoSource={{ uri: data.record.url }} />
          </View>
        ) : (
          <View className="h-96 w-full">
            <Image
              source={{ uri: data.record.url }}
              className="h-full w-full rounded-lg"
            />
          </View>
        )}
      </CustomModal>
    </View>
  );
};

export default ScanInterpretationDetailsScreen;

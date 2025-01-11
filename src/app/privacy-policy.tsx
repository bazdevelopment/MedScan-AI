// src/screens/PrivacyPolicy.js
import React from 'react';
import { ScrollView, View } from 'react-native';

import { usePrivacyPolicy } from '@/api/privacy-policy/privacy-policy.hooks';
import { useSelectedLanguage } from '@/core';
import { Text } from '@/ui'; // Assuming you have a Text component in your app

const PrivacyPolicy = () => {
  const { language } = useSelectedLanguage();
  const { data, isPending, error } = usePrivacyPolicy(language);

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-blue-600">Loading Privacy Policy...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-red-600">{error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text className="mb-4 text-center text-xl font-bold-nunito text-blue-600">
          Privacy Policy for X-Ray Analyzer
        </Text>
        <Text className="mb-6 text-center text-sm text-gray-500">
          Last Updated: {data.record.last_updated}
        </Text>

        {/* Render sections dynamically */}
        {data.record.sections?.map((section, index) => (
          <View key={index} className="mb-6">
            {/* Section Title */}
            <Text className="font-semibold-nunito text-lg text-gray-800">
              {section.title}
            </Text>

            {/* Render section content */}
            {section.content?.map((contentItem, contentIndex) => (
              <Text key={contentIndex} className="mb-2 text-gray-600">
                {contentItem.description}
              </Text>
            ))}

            {/* Render list items if available */}
            {section.content?.some((item) => item.listItems) && (
              <View className="ml-4">
                {section.content?.map((contentItem) =>
                  contentItem.listItems?.map((item, idx) => (
                    <Text key={idx} className="text-gray-600">
                      • {item}
                    </Text>
                  )),
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;

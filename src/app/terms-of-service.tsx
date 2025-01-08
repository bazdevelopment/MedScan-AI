import React from 'react';
import { ScrollView, View } from 'react-native';

import { useTermsOfService } from '@/api/terms-of-service/terms-of-service.hooks';
import { useSelectedLanguage } from '@/core';
import { Text } from '@/ui';

const TermsOfService = () => {
  const { language } = useSelectedLanguage();
  const { data, isPending } = useTermsOfService(language);

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-blue-600">
          Loading Terms of Service...
        </Text>
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
        <Text className="mb-4 text-center text-xl font-bold text-blue-600">
          Terms of Service for X-Ray Analyzer
        </Text>
        <Text className="mb-6 text-center text-sm text-gray-500">
          Last Updated: {data.record.lastUpdated}
        </Text>

        {/* Render sections dynamically */}
        {data.record.terms.map((section, index) => (
          <View key={index}>
            {/* Section Header */}
            <Text className="mb-2 text-lg font-semibold text-gray-800">
              {section.section}
            </Text>

            {/* Section Content */}
            <Text className="mb-4 text-gray-600">{section.content}</Text>

            {/* Render list items if available */}
            {section.listItems && (
              <View className="mb-2 ml-4">
                {section.listItems?.map((item, idx) => (
                  <Text key={idx} className="text-gray-600">
                    • {item}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TermsOfService;

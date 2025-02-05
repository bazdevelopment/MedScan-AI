import { TERMS_AND_CONDITIONS } from '__mocks__/reports/terms-and-conditions';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { useSelectedLanguage } from '@/core';
import { Text } from '@/ui';

const TermsOfService = () => {
  const { language } = useSelectedLanguage();
  // const { data, isPending } = useTermsOfService(language);

  return (
    <View className="flex-1 bg-white p-4 dark:bg-blackEerie">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text className="text-center mb-4 font-bold-nunito text-xl text-blue-600">
          Terms and condition for X-Ray Analyzer App
        </Text>
        <Text className="text-center mb-6 text-sm text-gray-500">
          Last Updated: {TERMS_AND_CONDITIONS.lastUpdated}
        </Text>

        {/* Render sections dynamically */}
        {TERMS_AND_CONDITIONS.terms.map((section, index) => (
          <View key={index}>
            {/* Section Header */}
            <Text className="mb-2 font-semibold-nunito text-xl text-gray-800">
              {section.section}
            </Text>

            {/* Section Content */}
            <Text className="mb-4 text-base text-gray-600">
              {section.content}
            </Text>

            {/* Render list items if available */}
            {section.listItems && (
              <View className="mb-2 ml-4">
                {section.listItems?.map((item, idx) => (
                  <Text key={idx} className="text-base text-gray-600">
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

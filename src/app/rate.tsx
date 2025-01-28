import React from 'react';
import { Linking, View } from 'react-native';

import EdgeCaseTemplate from '@/components/edge-case-template';
import { Button } from '@/ui';
import { RatingIllustration } from '@/ui/assets/illustrations';

const Rate = () => {
  const handleFeedback = (isPositive: boolean) => {
    if (isPositive) {
      // Redirect happy users to the App Store
      const appStoreUrl = 'https://apps.apple.com/app/idYOUR_APP_ID'; // Replace with your App Store link
      Linking.openURL(appStoreUrl).catch((err) =>
        console.error('Error opening URL', err),
      );
    } else {
      // Redirect unhappy users to a Google Form
      const googleFormUrl = 'https://forms.gle/YOUR_GOOGLE_FORM_ID'; // Replace with your Google Form URL
      Linking.openURL(googleFormUrl).catch((err) =>
        console.error('Error opening URL', err),
      );
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-6 dark:bg-blackEerie">
      <EdgeCaseTemplate
        image={<RatingIllustration />}
        title="Are you finding the app valuable and engaging?"
        additionalClassName="top-[-40] px-10"
      />

      <View className="bottom-10 mt-auto flex-row gap-4">
        {/* Positive Feedback Button */}
        <Button
          className="dark: h-[62px] w-[160px] rounded-full bg-danger-500 pl-5 active:bg-red-300 dark:bg-danger-500"
          onPress={() => handleFeedback(true)}
          textClassName="dark:text-white"
          label="Not really..."
        />

        {/* Negative Feedback Button */}
        <Button
          className="h-[62px] w-[160px] rounded-full bg-primary-900 pl-5 active:bg-primary-700 dark:bg-primary-900"
          onPress={() => handleFeedback(false)}
          label="Yes, I love it!"
          textClassName="dark:text-white"
        />
      </View>
    </View>
  );
};

export default Rate;

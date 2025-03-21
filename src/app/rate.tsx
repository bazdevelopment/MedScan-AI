import React from 'react';
import { Linking, View } from 'react-native';

import EdgeCaseTemplate from '@/components/edge-case-template';
import { translate } from '@/core';
import { Button } from '@/ui';
import { RatingIllustration } from '@/ui/assets/illustrations';

const Rate = () => {
  const handleFeedback = (isPositive: boolean) => {
    if (isPositive) {
      // Redirect happy users to the App Store
      const appStoreUrl =
        'https://apps.apple.com/us/app/medscan-ai-imaging-analysis/id6742465790'; // Replace with your App Store link
      Linking.openURL(appStoreUrl).catch((err) =>
        console.error('Error opening URL', err),
      );
    } else {
      // Redirect unhappy users to a Google Form
      const googleFormUrl = 'https://forms.gle/3QfS27ykxEKAPofR7';
      Linking.openURL(googleFormUrl).catch((err) =>
        console.error('Error opening URL', err),
      );
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-6 dark:bg-blackEerie">
      <EdgeCaseTemplate
        image={<RatingIllustration />}
        title={translate('rootLayout.screens.rateAppScreen.heading')}
        additionalClassName="top-[-40] px-10"
      />

      <View className="bottom-10 mt-auto flex-row gap-4">
        {/* Negative Feedback Button */}
        <Button
          className="dark: h-[62px] w-[160px] rounded-full bg-danger-500 pl-5 active:bg-red-300 dark:bg-danger-500"
          onPress={() => handleFeedback(false)}
          textClassName="dark:text-white"
          label={translate('rootLayout.screens.rateAppScreen.dislike')}
        />

        {/* Positive Feedback Button */}
        <Button
          className="h-[62px] w-[160px] rounded-full bg-primary-900 pl-5 active:bg-primary-700 dark:bg-primary-900"
          onPress={() => handleFeedback(true)}
          label={translate('rootLayout.screens.rateAppScreen.like')}
          textClassName="dark:text-white"
        />
      </View>
    </View>
  );
};

export default Rate;

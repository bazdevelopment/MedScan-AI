/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import Branding from '@/components/branding';
import { translate } from '@/core';
import { useMedicalDisclaimerApproval } from '@/core/hooks/use-medical-disclaimer-approval';
import { Button, Checkbox, Text } from '@/ui';

const disclaimerTexts = [
  {
    text: translate('rootLayout.screens.disclaimerScreen.heading'),
    className: 'mb-6 font-bold-nunito text-xl',
  },

  // {
  //   text: translate('rootLayout.screens.disclaimerScreen.subheading'),
  //   className: 'mb-8 text-base',
  // },
  {
    text: translate('rootLayout.screens.disclaimerScreen.firstConsent'),
    className: 'mb-8 text-base',
  },

  {
    text: translate('rootLayout.screens.disclaimerScreen.secondConsent'),
    className: 'mb-8 text-base',
  },
  {
    text: translate('rootLayout.screens.disclaimerScreen.fourthConsent'),
    className: 'mb-8 font-bold-nunito text-base',
  },
  // {
  //   text: translate('rootLayout.screens.disclaimerScreen.thirdConsent'),
  //   className: 'mb-8 text-base',
  // },

  {
    text: translate('rootLayout.screens.disclaimerScreen.fifthConsent'),
    className: 'mb-8 text-base',
  },
];

const MedicalDisclaimerScreen = () => {
  const [checked, setChecked] = useState(false);
  const [isMedicalDisclaimerApproved, setIsMedicalDisclaimerApproved] =
    useMedicalDisclaimerApproval();

  const handleContinue = () => {
    if (checked) {
      // Navigate to the next screen or perform the next action
      setIsMedicalDisclaimerApproved(true);
      router.back();
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 200 }}
        className="bg-white dark:bg-blackEerie"
        showsVerticalScrollIndicator={false}
      >
        <Branding
          isLogoVisible
          invertedColors
          className="mb-10 justify-center"
        />
        {disclaimerTexts.map((item, index) => (
          <Text key={index} className={item.className}>
            {item.text}
          </Text>
        ))}
      </ScrollView>
      {/* <View className="absolute bottom-0 w-full bg-white p-6 dark:bg-black">
        <View className="mb-2 flex-row items-center">
          <Checkbox
            checked={checked}
            testID="checkbox"
            className="pb-2"
            onChange={() => setChecked(!checked)}
            accessibilityLabel="Disclaimer"
            accessibilityHint="toggle Agree"
            label={translate(
              'rootLayout.screens.disclaimerScreen.consentAgreement',
            )}
          />
        </View>
        <Button
          label={translate('general.continue')}
          variant="default"
          className="h-[55px] w-full rounded-xl border-2 border-primary-900 bg-primary-900 pl-5 active:bg-primary-700 dark:bg-primary-900"
          textClassName="text-lg text-center text-white dark:text-white"
          iconPosition="left"
          onPress={handleContinue}
          disabled={!checked}
        />
      </View> */}
    </>
  );
};

export default MedicalDisclaimerScreen;

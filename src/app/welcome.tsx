import { Link, router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import Branding from '@/components/branding';
import { Button, Text } from '@/ui';
import { WelcomeIllustration } from '@/ui/assets/illustrations';

const Welcome = () => {
  return (
    <View className="flex-1 items-center justify-center bg-primary-50 px-6 dark:bg-blackEerie">
      <Branding isLogoVisible invertedColors />
      <Text className="my-10 text-center font-bold-nunito text-[32px] text-primary-900">
        Welcome to X-Ray Analyzer App
      </Text>

      <WelcomeIllustration />
      <View className="mt-10 w-full">
        <Button
          label="Let's get started!"
          variant="default"
          className="h-[55px] w-full rounded-xl bg-primary-900 pl-5 dark:bg-primary-900"
          textClassName="font-semibold-nunito text-lg dark:text-white"
          iconPosition="left"
          onPress={() => router.navigate('/login')}
        />
        <Button
          label="I already have an account"
          variant="default"
          className="h-[55px] w-full rounded-xl border-2 border-primary-900 bg-white pl-5 dark:bg-primary-200"
          textClassName="text-lg text-center text-primary-900"
          iconPosition="left"
          onPress={() => router.navigate('/login')}
        />
      </View>

      <View className="flex-row mt-6 w-full flex-wrap justify-center px-12">
        <Text className="text-sm">By continuing, you agree to our </Text>
        <Link href="/terms-of-service" className="text-sm text-primary-900">
          Terms & Conditions
        </Link>
        <Text className="text-sm"> and </Text>
        <Link href="/privacy-policy" className="text-sm text-primary-900">
          Privacy Policy
        </Link>
      </View>
    </View>
  );
};

export default Welcome;

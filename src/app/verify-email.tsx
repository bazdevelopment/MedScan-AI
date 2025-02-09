import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';

import { useSendVerificationCode } from '@/api/user/user.hooks';
import { translate, useSelectedLanguage } from '@/core';
import { Button, FocusAwareStatusBar, Input, Text, View } from '@/ui';

export default function Login() {
  return (
    <>
      <FocusAwareStatusBar />
      <VerifyEmailForm />
    </>
  );
}

const VerifyEmailForm = () => {
  const [email, setEmail] = useState('');
  const { language } = useSelectedLanguage();
  const handleUpdateEmail = (text: string) => setEmail(text.toLowerCase());

  const { mutate: handleSubmitEmail, isPending } = useSendVerificationCode({
    email,
  })();

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          title: 'Email verification',
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        {isPending && <ActivityIndicator />}
        <View className="flex-1 justify-center p-4">
          <Text testID="form-title" className="pb-6 text-center text-2xl">
            {translate('rootLayout.screens.verifyEmail.heading')}
          </Text>

          <Input
            testID="email"
            label={translate('components.Input.labels.email')}
            value={email}
            onChangeText={handleUpdateEmail}
          />

          <Button
            testID="email-verification"
            label={translate('components.Input.labels.emailVerification')}
            onPress={() => handleSubmitEmail({ email, language })}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

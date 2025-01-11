/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';

import { useLoginWithEmail } from '@/api/user/user.hooks';
import { translate, useSelectedLanguage } from '@/core';
import { Button, FocusAwareStatusBar, Input, Text, View } from '@/ui';

export default function Login() {
  return (
    <>
      <FocusAwareStatusBar />
      <LoginFrm />
    </>
  );
}

const LoginFrm = () => {
  const [email, setEmail] = useState('');
  const { language } = useSelectedLanguage();
  const { mutate: handleLoginViaEmail, isPending: isLoginPending } =
    useLoginWithEmail({ email })();

  const handleUpdateEmail = (text: string) => setEmail(text.toLowerCase());

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        {isLoginPending && <ActivityIndicator />}

        <Text testID="form-title" className="pb-6 text-center text-2xl">
          {`${translate('general.welcome')} 👋`}
        </Text>

        <Text className="mb-4 text-center text-gray-600">
          {translate('auth.loginViaEmailHeading')}
        </Text>
        <Input
          testID="email"
          label={translate('auth.emailAddress')}
          value={email}
          onChangeText={handleUpdateEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Button
          testID="login-button"
          label={translate('general.continue')}
          onPress={() => handleLoginViaEmail({ email, language })}
          disabled={isLoginPending || !email}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

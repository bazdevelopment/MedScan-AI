/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';

import { useLoginWithEmail } from '@/api/user/user.hooks';
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
          Welcome
        </Text>

        <Text className="mb-4 text-center text-gray-600">
          Please enter your email to continue
        </Text>
        <Input
          testID="email"
          label="Email"
          value={email}
          onChangeText={handleUpdateEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Button
          testID="login-button"
          label="Continue"
          onPress={() => handleLoginViaEmail({ email })}
          disabled={isLoginPending || !email}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

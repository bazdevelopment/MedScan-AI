import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';

import { useCreateAnonymousAccount } from '@/api/user/user.hooks';
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
  const { mutate: handleSubmit, isPending } = useCreateAnonymousAccount();

  const [userName, setUserName] = useState('');

  const handleUpdateUserName = (text: string) =>
    setUserName(text.toLowerCase());

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        {isPending && <ActivityIndicator />}
        <Text testID="form-title" className="pb-6 text-center text-2xl">
          Sign In
        </Text>

        <Input
          testID="name"
          label="Name"
          value={userName}
          onChangeText={handleUpdateUserName}
        />

        <Button
          testID="login-button"
          label="Login"
          onPress={() => handleSubmit({ userName })}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

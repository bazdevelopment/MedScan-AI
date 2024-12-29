import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, View } from 'react-native';

import { useValidateAuthCode } from '@/api/user/user.hooks';
import { translate } from '@/core';
import { Button, Input, Text } from '@/ui';

const VerifyAuthCode = () => {
  const { email } = useLocalSearchParams();
  const [authenticationCode, setAuthenticationCode] = useState('123456');
  const { mutate: onVerifyAuthCode, isPending } = useValidateAuthCode();

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          title: translate('auth.authCodeHeading'),
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
            {translate('auth.verifyAuthCode')}
          </Text>

          <Input
            testID="email"
            value={authenticationCode}
            onChangeText={(text) => setAuthenticationCode(text)}
          />

          <Button
            testID="Verify auth code"
            label={translate('auth.verifyAuthCodeButton')}
            onPress={() =>
              onVerifyAuthCode({ authenticationCode, email: email as string })
            }
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default VerifyAuthCode;

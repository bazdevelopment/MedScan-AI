import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from '@/components/icon';
import Toast from '@/components/toast';
import { translate } from '@/core';
import { useClipboard } from '@/core/hooks/use-clipboard';
import { colors, Text } from '@/ui';
import { MailIcon } from '@/ui/assets/icons';
import CopyIcon from '@/ui/assets/icons/copy';

const ContactUs = () => {
  const emailAddress = 'medscanaiapp@gmail.com';
  const { copyToClipboard } = useClipboard();
  const handleCopyEmail = () => {
    copyToClipboard(emailAddress);
    Toast.success(translate('general.copyText.copied'), {
      style: { marginTop: 50 },
      closeButton: true,
    });
  };

  return (
    <View className="flex-1 bg-white p-6 dark:bg-blackEerie">
      <Text className="mb-6 text-charcoal-600">
        {translate('rootLayout.screens.contactUs.heading')}
      </Text>

      <View className="rounded-2xl bg-gray-100 px-4 py-6 shadow-xl shadow-gray-100 dark:bg-black dark:shadow-none">
        <Text className="mb-6 font-semibold-nunito text-lg text-charcoal-600">
          {translate('rootLayout.screens.contactUs.customerSupport')}
        </Text>

        <View className="flex-row items-center gap-3">
          <Icon
            icon={<MailIcon />}
            size={24}
            color={colors.primary[900]}
            containerStyle="bg-primary-200 dark:bg-blackEerie p-3 rounded-full"
          />
          <View className="flex-col">
            <Text className="text-sm text-charcoal-600  dark:text-charcoal-200">
              {translate('rootLayout.screens.contactUs.emailAddress')}
            </Text>
            <Text>{emailAddress}</Text>
          </View>
          <TouchableOpacity
            onPress={handleCopyEmail}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <CopyIcon
              top={8}
              left={4}
              color={colors.primary[900]}
              width={20}
              height={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ContactUs;

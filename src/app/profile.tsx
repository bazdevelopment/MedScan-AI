/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

import { useUpdateUser, useUser } from '@/api/user/user.hooks';
import Avatar from '@/components/avatar';
import { translate } from '@/core';
import { Button, colors, Input, Text } from '@/ui';
import { CloseIcon, EditIcon } from '@/ui/assets/icons';

const Profile = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const { data: userInfo } = useUser(language);
  const [editModeEnabled, setEditModeEnabled] = useState(false);

  const [profileInfo, setProfileInfo] = useState({
    userName: userInfo.userName,
  });

  const { mutate: onUpdateUser, isPending: isPendingUpdateUser } =
    useUpdateUser();

  // Function to handle state changes
  const handleInputChange = (field: string, value: string) => {
    setProfileInfo((prevData) => ({
      ...prevData,
      [field]: value, // Dynamically update the specific field
    }));
  };

  const handleSubmit = () => {
    onUpdateUser({
      language,
      userId: userInfo.userId,
      fieldsToUpdate: profileInfo,
    });
  };

  return (
    <KeyboardStickyView offset={{ opened: 150 }}>
      <ScrollView className="dark:bg-blackEerie">
        <View className="flex-1 bg-white dark:bg-blackEerie">
          <View className="h-[150px] rounded-b-[50px] bg-primary-900 pb-10 pt-12 dark:bg-blackEerie" />
          <Avatar
            image={require('../ui/assets/images/avatar.png')}
            size="xl"
            shape="rounded-xl"
            className="top-[-55px] self-center rounded-3xl border-4 border-primary-300"
            isEditable={false} //!todo: for now upload picture should be disabled due to privacy politics
          />

          <Text className="top-[-30] text-center font-semibold-nunito text-2xl">
            {userInfo.userName}
          </Text>
          <View className="mx-6 gap-6">
            <Input
              className={`flex-1 rounded-xl bg-white px-3.5 py-5 font-primary-nunito dark:border-neutral-700 dark:bg-charcoal-800 dark:text-white ${!editModeEnabled && 'bg-slate-200'}`}
              placeholder={translate(
                'rootLayout.screens.profile.placeholderPreferredName',
              )}
              value={profileInfo.userName || ''}
              onChangeText={(text: string) =>
                handleInputChange('userName', text)
              }
              label={translate('components.Input.labels.nickname')}
              editable={editModeEnabled}
            />
            {userInfo.email && (
              <Input
                className={`flex-1 rounded-xl bg-slate-200 px-3.5 py-5 font-primary-nunito opacity-80 dark:border-neutral-700 dark:bg-charcoal-600 dark:text-white dark:opacity-50`}
                placeholder={translate(
                  'rootLayout.screens.profile.placeholderPreferredName',
                )}
                value={userInfo.email}
                label={translate('components.Input.labels.email')}
                onChangeText={(text: string) =>
                  handleInputChange('email', text)
                }
                editable={false}
              />
            )}
          </View>
          <View className="flex-column mx-6 items-start justify-between">
            {!editModeEnabled && (
              <Button
                label={translate('rootLayout.screens.profile.edit')}
                variant="default"
                icon={<EditIcon fill={colors.white} />}
                className="mt-6 h-[62px] w-full gap-1 rounded-full border-2 border-primary-900 bg-primary-900 pl-5 active:bg-primary-700 dark:bg-primary-900"
                textClassName="text-lg text-center text-white dark:text-white"
                iconPosition="right"
                onPress={() => setEditModeEnabled(!editModeEnabled)}
              />
            )}

            {editModeEnabled && (
              <View className="flex-row gap-10">
                <Button
                  label={translate('general.close')}
                  variant="default"
                  icon={<CloseIcon fill={colors.white} />}
                  className="mt-6 h-[62px] flex-1 gap-1 rounded-xl bg-black pl-5 active:bg-primary-700 dark:bg-charcoal-600 dark:active:bg-charcoal-400"
                  textClassName="text-lg text-center text-white dark:text-white"
                  iconPosition="right"
                  onPress={() => setEditModeEnabled(!editModeEnabled)}
                />
                <Button
                  label={translate('general.update')}
                  variant="default"
                  icon={<EditIcon fill={colors.white} />}
                  className="mt-6 h-[62px] flex-1 gap-1 rounded-xl bg-primary-900 pl-5 active:bg-primary-700 dark:bg-primary-900"
                  textClassName="text-lg text-center text-white dark:text-white"
                  iconPosition="right"
                  onPress={handleSubmit}
                  loading={isPendingUpdateUser}
                  disabled={profileInfo.userName === userInfo.userName}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardStickyView>
  );
};

export default Profile;

/* eslint-disable max-lines-per-function */
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import { useUpdateUser, useUser } from '@/api/user/user.hooks';
import Avatar from '@/components/avatar';
import { Button, colors, Input, Text } from '@/ui';
import { CloseIcon, EditIcon } from '@/ui/assets/icons';

const Profile = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

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
    <ScrollView contentContainerStyle={{ flex: 1 }} scrollEventThrottle={16}>
      <View className="flex-1 bg-primary-50 dark:bg-blackEerie">
        <View className="h-[150px] rounded-b-[50px]  bg-primary-900 pb-10 pt-12 dark:bg-blackEerie"></View>
        <Avatar
          image={require('../ui/assets/images/avatar.png')}
          size="xl"
          shape="rounded-xl"
          className="top-[-55px] self-center rounded-3xl border-4 border-primary-300"
          isEditable={false} //!todo: for now upload picture should be disabled due to privacy politics
        />

        {isPendingUpdateUser && <ActivityIndicator />}

        <Text className="top-[-30] text-center font-semibold-nunito text-2xl">
          {userInfo.userName}
        </Text>
        <View className="mx-6 gap-6">
          <Input
            className={`flex-1 rounded-xl bg-white px-3.5 py-5 font-primary-nunito dark:border-neutral-700 dark:bg-charcoal-800 dark:text-white ${!editModeEnabled && 'bg-slate-200'}`}
            placeholder="E.g., Captain Cool, Queen Bee, or just Alex!"
            value={profileInfo.userName || ''}
            onChangeText={(text: string) => handleInputChange('userName', text)}
            label="Nickname"
            editable={editModeEnabled}
          />
          <Input
            className={`flex-1 rounded-xl bg-slate-300 px-3.5 py-5 font-primary-nunito opacity-60 dark:border-neutral-700 dark:bg-charcoal-600 dark:text-white dark:opacity-50`}
            placeholder="E.g., Captain Cool, Queen Bee, or just Alex!"
            value={userInfo.email}
            label="Email"
            onChangeText={(text: string) => handleInputChange('email', text)}
            editable={false}
          />
        </View>
        <View className="flex-column mx-6 mb-16 mt-auto items-start justify-between">
          {!editModeEnabled && (
            <Button
              label="Edit Profile"
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
                label="Close"
                variant="default"
                icon={<CloseIcon fill={colors.white} />}
                className="mt-6 h-[62px] flex-1 gap-1 rounded-xl bg-black pl-5 active:bg-primary-700 dark:bg-primary-900"
                textClassName="text-lg text-center text-white dark:text-white"
                iconPosition="right"
                onPress={() => setEditModeEnabled(!editModeEnabled)}
              />
              <Button
                label="Update"
                variant="default"
                icon={<EditIcon fill={colors.white} />}
                className="mt-6 h-[62px] flex-1 gap-1 rounded-xl  bg-primary-900 pl-5 active:bg-primary-700 dark:bg-primary-900"
                textClassName="text-lg text-center text-white dark:text-white"
                iconPosition="right"
                onPress={handleSubmit}
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

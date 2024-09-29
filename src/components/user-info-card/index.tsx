import React from 'react';
import { View } from 'react-native';

import { Text } from '@/ui';

import { type IIUserInfoCard } from './user-info-card.interface';

const UserInfoCard = ({
  age = '-',
  gender = '-',
  occupation = '-',
  className = '',
}: IIUserInfoCard) => {
  const userInfo = [
    { label: 'Age', value: age, id: '1' },
    { label: 'Gender', value: gender, id: '2' },
    { label: 'Occupation', value: occupation, id: '3' },
  ];
  return (
    <View className={className}>
      <View className="mb-2 flex-row justify-between gap-6">
        {userInfo.map(
          (item, index) =>
            // Only render the item if its value exists
            Boolean(item.id) && (
              <View key={index}>
                <Text className="text-sm font-bold text-white">
                  {item.label}
                </Text>
                <Text className="ml-px text-sm text-white">{item.value}</Text>
              </View>
            ),
        )}
      </View>
    </View>
  );
};

export default UserInfoCard;

import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';
import { tv } from 'tailwind-variants';

import { Text } from '@/ui';

import { type IAvatar } from './avatar.interface';

const Avatar = ({
  size = 'medium',
  shape = 'circle',
  imageUrl,
  altText = '',
  withBorder = false,
  showInitials = false,
  initials = '',
  textColor = 'text-black',
  className = '',
  style = {},
}: IAvatar) => {
  const styles = React.useMemo(
    () => avatar({ size, shape, withBorder }),
    [size, shape, withBorder],
  );
  return (
    <View className={styles.container({ className })} style={style}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          className={styles.image()}
          accessibilityLabel={altText}
        />
      ) : (
        showInitials && (
          <View className={styles.name()}>
            <Text className={`${textColor} text-lg font-bold`}>{initials}</Text>
          </View>
        )
      )}
    </View>
  );
};

export default Avatar;

const avatar = tv({
  slots: {
    container: 'items-center justify-center',
    image: 'h-full w-full',
    name: 'items-center justify-center',
  },
  variants: {
    size: {
      small: {
        image: 'h-10 w-10',
        name: 'h-10 w-10',
      },
      medium: {
        image: 'h-16 w-16',
        name: 'h-12 w-12',
      },
      large: {
        image: 'h-[75px] w-[75px]',
        name: 'h-14 w-14',
      },
    },
    shape: {
      circle: {
        image: 'rounded-full',
        name: 'rounded-full',
      },
      rounded: {
        image: 'rounded-lg',
        name: 'rounded-lg',
      },
      square: {
        image: 'rounded-none',
        name: 'rounded-none',
      },
    },
    withBorder: {
      true: {
        image: 'border-2 border-neutral-400',
        name: 'border-[1.5px] border-primary-200',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    shape: 'circle',
    withBorder: false,
  },
});

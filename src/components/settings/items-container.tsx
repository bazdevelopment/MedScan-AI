import React from 'react';

import type { TxKeyPath } from '@/core';
import { Text, View } from '@/ui';

type Props = {
  children: React.ReactNode;
  title?: TxKeyPath;
};

export const ItemsContainer = ({ children, title }: Props) => {
  return (
    <>
      {title && (
        <Text
          className="mb-2 mt-8 pb-2 font-semibold-nunito text-lg"
          tx={title}
        />
      )}
      {<View className="gap-3">{children}</View>}
    </>
  );
};

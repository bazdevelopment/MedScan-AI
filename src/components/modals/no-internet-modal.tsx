import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { reloadAppAsync } from 'expo';
import { useColorScheme } from 'nativewind';
import React from 'react';

import { translate } from '@/core';
import { colors, Modal } from '@/ui';
import { RetryIcon } from '@/ui/assets/icons';
import { NoInternetIllustration } from '@/ui/assets/illustrations';

import EdgeCaseTemplate from '../edge-case-template';

export const NoInternetConnectionModal = React.forwardRef<BottomSheetModal>(
  ({}, ref) => {
    const height = 300;
    const snapPoints = React.useMemo(() => [height], [height]);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    return (
      <Modal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: isDark ? colors.neutral[800] : colors.white,
        }}
        enableOverDrag={false}
        enablePanDownToClose={false}
        canBeDismissed={false}
      >
        <EdgeCaseTemplate
          additionalClassName="mt-[-20]"
          image={
            <NoInternetIllustration
              width={100}
              height={100}
              fill={colors.danger[500]}
            />
          }
          title={translate('internet.noConnectionTitle')}
          message={translate('internet.noConnectionMessage')}
          primaryAction={{
            label: translate('general.retry'),
            onPress: () => reloadAppAsync(),
            icon: (
              <RetryIcon
                width={18}
                height={18}
                color={isDark ? colors.black : colors.white}
              />
            ),
          }}
        />
      </Modal>
    );
  },
);

import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';

import DeleteReportAlert from '@/components/alerts/delete-report';
import CustomHeader from '@/components/cusom-header';
import Icon from '@/components/icon';
import Toast from '@/components/toast';
import { DEVICE_TYPE, translate } from '@/core';
import { colors } from '@/ui';
import { TrashIcon } from '@/ui/assets/icons';

export default function Layout() {
  const { id: documentId } = useLocalSearchParams();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const showCustomAlert = () => {
    Toast.showCustomToast(<DeleteReportAlert documentId={documentId} />, {
      position: 'middle', // Place the alert in the middle of the screen
      duration: Infinity, // Keep the alert visible until dismissed
    });
  };
  return (
    <Stack>
      <Stack.Screen
        name="[id]" // Dynamically matches "/scan-interpretation/[id]"
        options={{
          header: (props) => (
            <CustomHeader
              {...props}
              title={translate('rootLayout.screens.scanInterpretation.title')}
              titlePosition="center"
              onGoBack={router.back}
              backIconColor={isDark ? colors.white : colors.black}
              rightContent={
                <Icon
                  size={26}
                  containerStyle={`p-1 mr-6 ${DEVICE_TYPE.IOS ? 'mt-8' : 'mt-2'}`}
                  onPress={showCustomAlert}
                  icon={<TrashIcon />}
                  color={colors.danger[500]}
                />
              }
            />
          ),
        }}
      />
    </Stack>
  );
}

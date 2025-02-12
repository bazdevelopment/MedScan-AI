import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import { useDeleteScanReportById } from '@/api/interpretation/interpretation.hooks';
import CustomAlert from '@/components/custom-alert';
import Toast from '@/components/toast';
import { translate, useSelectedLanguage } from '@/core';

const DeleteReportAlert = () => {
  const { id: documentId } = useLocalSearchParams();
  const { language } = useSelectedLanguage();

  const { mutate: onDeleteReport } = useDeleteScanReportById();

  return (
    <CustomAlert
      visible
      title={translate('general.attention')}
      subtitle={translate('alerts.deleteScanReportQuestion')}
      buttons={[
        {
          label: translate('general.close'),
          variant: 'default',
          onPress: () => Toast.dismiss(),
          className: 'flex-1 rounded-xl h-[48] bg-slate-100 active:opacity-80',
          buttonTextClassName: 'text-black',
        },
        {
          label: translate('general.delete'),
          variant: 'destructive',
          onPress: () =>
            onDeleteReport({ documentId: documentId as string, language }),
          className: 'flex-1 rounded-xl h-[48] active:opacity-80',
        },
      ]}
    />
  );
};

export default DeleteReportAlert;

import { firebaseCloudFunctionsInstance } from 'firebase/config';

import { type IInterpretationRecord } from '@/types/interpretation-report';

export const getInterpretationByDate = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}): Promise<IInterpretationRecord> => {
  try {
    const onGetInterpretation = firebaseCloudFunctionsInstance.httpsCallable(
      'getInterpretationByDate',
    );
    const { data } = await onGetInterpretation({
      startDate,
      endDate,
    });

    return data as IInterpretationRecord;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

import { firebaseCloudFunctionsInstance } from 'firebase/config';

import { type IInterpretationRecord } from '@/types/interpretation-report';

export const getInterpretationByDate = async ({
  startDate,
  endDate,
  language,
}: {
  startDate: string;
  endDate: string;
  language: string;
}): Promise<IInterpretationRecord> => {
  try {
    const onGetInterpretation = firebaseCloudFunctionsInstance.httpsCallable(
      'getInterpretationByDate',
    );
    const { data } = await onGetInterpretation({
      startDate,
      endDate,
      language,
    });

    return data as IInterpretationRecord;
  } catch (error) {
    throw error;
  }
};

export const updateInterpretationFields = async (fields: any) => {
  try {
    const onUpdateInterpretationFields =
      firebaseCloudFunctionsInstance.httpsCallable('updateInterpretation');
    const { data } = await onUpdateInterpretationFields(fields);

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteReportById = async (fields: {
  language: string;
  documentId: string;
}) => {
  try {
    const onUpdateInterpretationFields =
      firebaseCloudFunctionsInstance.httpsCallable('deleteScanReportById');
    const { data } = await onUpdateInterpretationFields(fields);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getInterpretationByDocumentId = async (
  documentId: string,
  language: string,
) => {
  try {
    const onGetInterpretationById =
      firebaseCloudFunctionsInstance.httpsCallable('getInterpretationById');
    const { data } = await onGetInterpretationById({ documentId, language });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getRecentReports = async (limit: number, language: string) => {
  try {
    const onGetRecentReportInterpretations =
      firebaseCloudFunctionsInstance.httpsCallable('getRecentInterpretations');
    const { data } = await onGetRecentReportInterpretations({
      limit,
      language,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

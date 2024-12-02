import { type AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { type IInterpretationRecord } from '@/types/interpretation-report';

import { getInterpretationByDate } from './interpretation.requests';
type IPayload = {
  startDate: string;
  endDate: string;
  weekNumber: number;
};
export const useInterpretationByDate = (variables: IPayload) =>
  createQuery<IInterpretationRecord, IPayload, AxiosError>({
    queryKey: ['interpretations-by-date', variables.weekNumber],
    fetcher: () => getInterpretationByDate(variables),
  });

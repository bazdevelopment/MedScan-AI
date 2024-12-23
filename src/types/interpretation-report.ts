export interface IInterpretationResult {
  createdAt: string;
  id: string;
  interpretationResult: string;
  mimeType: string;
  url: string;
  promptMessage: string;
  title: string;
  docId: string;
}
export interface IInterpretationResultRecords {
  records: IInterpretationResult[];
}

export interface IInterpretationRecord {
  [date: string]: IInterpretationResult[] | null;
}
export interface IInterpretationResponse {
  record: IInterpretationRecord;
  success: boolean;
}

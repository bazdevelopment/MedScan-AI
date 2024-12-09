export interface IInterpretationResult {
  createdAt: string;
  id: string;
  interpretation: string;
  mimeType: string;
  url: string;
  promptMessage: string;
  title: string;
  docId: string;
}

export interface IInterpretationRecord {
  [date: string]: IInterpretationResult[] | null;
}
export interface IInterpretationResponse {
  record: IInterpretationRecord;
  success: boolean;
}

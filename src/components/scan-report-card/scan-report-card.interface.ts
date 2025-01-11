export interface IScanReportCard {
  createdAt: string;
  interpretation: string;
  mimeType: string;
  url: string;
  promptMessage: string;
  title: string;
  onEditTitle: (updatedTitle: string, documentId: string) => void;
  isUpdateTitlePending: boolean;
  docId: string;
  language: string;
}

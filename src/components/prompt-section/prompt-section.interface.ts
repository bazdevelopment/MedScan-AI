export interface IPromptSection {
  promptMessage: string;
  additionalInfo: string;
  onUpdatePromptMessage: (message: string) => void;
  onUpdateAdditionalInfo: (message: string) => void;
}

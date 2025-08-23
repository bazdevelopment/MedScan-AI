export const createFormDataVidePayload = ({
  fileUri,
  fileName,
  fileMimeType,
  userId,
  promptMessage,
}: {
  fileUri: string;
  fileName: string;
  fileMimeType: string;
  userId: string;
  promptMessage: string;
}) => {
  const formData = new FormData();
  formData.append('video', {
    uri: fileUri,
    name: fileName ?? fileUri.split('/').pop(),
    type: fileMimeType,
  } as any);

  formData.append('userId', userId);
  formData.append('promptMessage', promptMessage);

  return formData;
};

export const createFormDataImagePayload = ({
  fileUri,
  fileName,
  fileMimeType,
  userId,
  promptMessage,
  highlightedRegions,
}: {
  fileUri: string;
  fileName: string;
  fileMimeType: string;
  userId: string;
  highlightedRegions: string;
  promptMessage: string;
}) => {
  const formData = new FormData();
  formData.append('image', {
    uri: fileUri,
    name: fileName ?? fileUri.split('/').pop(),
    type: fileMimeType,
  } as any);

  formData.append('userId', userId);
  formData.append('promptMessage', promptMessage);
  formData.append('highlightedRegions', highlightedRegions);

  return formData;
};

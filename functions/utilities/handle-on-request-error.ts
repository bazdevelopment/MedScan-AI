import * as logger from 'firebase-functions/logger';

const logError = (context: string, errorDetails: any) => {
  // Use Firebase's logger to log structured errors
  logger.error(`[${context}]`, errorDetails);
};
export const handleOnRequestError = ({
  error,
  res,
  context = 'Global Error Handler',
}: {
  error: any;
  res: any;
  context?: string;
}) => {
  logError(context, {
    name: error?.name || '',
    message: error.message || '',
    stack: error?.stack || '',
    statusCode: error?.statusCode || 500,
    statusMessage: error?.statusMessage || 'Internal Server Error',
  });

  res.status(500).json({
    success: false,
    message: error.message || 'Internal Server Error',
    errorBody: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || 'Internal Server Error',
    },
  });
};

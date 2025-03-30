import { admin } from '../src/common';

export const checkDailyScanLimit = async ({
  userId,
  lastScanDate,
  scansToday,
  dailyLimit,
}: {
  userId: string;
  lastScanDate: string;
  scansToday: number;
  dailyLimit: number;
}) => {
  const today = new Date().toISOString().split('T')[0];
  const db = admin.firestore();

  // If it's a new day, reset the counter immediately
  if (lastScanDate !== today) {
    await db.collection('users').doc(userId).update({
      scansToday: 0,
      lastScanDate: today,
    });
    return { canScan: true };
  }

  // Check daily limit
  if ((scansToday || 0) >= dailyLimit) {
    return { canScan: false };
  }

  return {
    canScan: true,
  };
};

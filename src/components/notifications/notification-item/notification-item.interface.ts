export interface INotificationItem {
  body: string;
  createdAt: Date;
  id: string;
  isRead: boolean;
  sender: string;
  title: string;
  type: string;
  userId: string;
  docId: string;
}

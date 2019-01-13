import { Notification } from './model';
export const message = {
  id: "1",
  uid: "1",
  name: "TDCT, LLC",
  face: "assets/img/tdct.png",
  description: "TDCT, LLC sent a message",
  read: false,
  collection: "users",
  docId: "2",
  receiverUid: "2",
  pin: false,
  message: true,
  pinLike: false,
  statementLike: false,
  goalLike: false,
  comment: false,
  commentLike: false,
  reminder: false,
  displayTimestamp: "APR 4 2018",
  timestamp: 14323535,
}
export const mockNotifications: Notification[] = [message];       
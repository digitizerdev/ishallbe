import { Notification } from './model';
export const freshNotification = {
  id: "1",
  opened: false,
  content: {
    subject: "Your mock notification subject",
    message: "Your mock notification message"
  },
  doc: {
    type: "Post",
    id: "1"
  },
  user: {
    uid: "Fresh Statement User ID",
    name: "Fresh Statement User Name",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180205,
    displayDate: "FEB 5 2018",
    rawTime: 121212,
    displayTime: "12:12pm"
  }
}
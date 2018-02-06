import { Statement } from './model';
export const freshStatement = {
  id: "1",
  title: "Fresh Statement Title", 
  content: "Fresh Statement Content",
  image: "assets/img/logo.png",
  flagged: false,
  liked: true,
  likeCount: 0,
  commentCount: 0,
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
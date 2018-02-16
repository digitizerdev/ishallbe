import { Post } from './model';
export const statement = { 
  id: "1",
  title: "Mock Statement",
  content: "Mock Statement Content",
  commentCount: 0,
  likeCount: 0,
  liked: false,
  statement: true,
  pin: false,
  goal: false,
  reflection: false,
  result: false,
  image: true,
  audio: false,
  video: false,
  mediaUrl: "assets/img/logo.png",
  externalUrl: "",
  day: "",
  dateDue: "",
  user: {
    uid: "1",
    name: "Test Contributor",
    photo: "assets/img/default-profile.png"
  },
  timestamp: {
    rawDate: 20180216,
    displayDate: "FEB 16 2018",
    rawTime: 20180216153100,
    displayTime: "3:31pm"
  }
};
export const pin = { 
  id: "2",
  title: "Mock Pin",
  content: "Mock Pin Content",
  commentCount: 0,
  likeCount: 0,
  liked: false,
  statement: false,
  pin: true,
  goal: false,
  reflection: false,
  result: false,
  image: true,
  audio: false,
  video: false,
  mediaUrl: "assets/img/logo.png",
  externalUrl: "https://youtube.com",
  day: "Monday",
  dateDue: "",
  user: {
    uid: "2",
    name: "Test Editor",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180216,
    displayDate: "FEB 16 2018",
    rawTime: 20180216153100,
    displayTime: "3:31pm"
  }
}
export const mockPosts: Post[] = [statement, pin];       
import { Pin } from './model';
export const fresh = {
  id: "1",
  title: "Fresh Pin",
  content: "This is the fresh pin",
  liked: false,
  likeCount: 0,
  commentCount: 0,
  image: false,
  audio: false,
  video: false,
  media: {
    imageUrl: "",
    audioUrl: "",
    videoUrl: ""
  },
  user: {
    uid: "1",
    name: "Shelby Tinsley",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180215,
    displayDate: "FEB 15 2018",
    rawTime: 92701,
    displayTime: "9:27am"
  },
  comments: [{
    id: "1",
    pinId: "1",
    content: "First Comment",
    liked: false,
    likeCount: 0,
    user: {
      uid: "2",
      name: "Shelby",
      photo: "assets/img/headshot.png"
    },
    timestamp: {
      rawDate: 20180215,
      displayDate: "FEB 15 2018",
      rawTime: 92701,
      displayTime: "9:27am"
    },
  }],
  likers: [{
    id: "1",
    pinId: "1",
    user: {
      uid: "2",
      name: "Shelby",
      photo: "assets/img/headshot.png"
    },
    timestamp: {
      rawDate: 20180215,
      displayDate: "FEB 15 2018",
      rawTime: 92701,
      displayTime: "9:27am"
    }
  }]
}
export const mockPins: Pin[] = [fresh];       
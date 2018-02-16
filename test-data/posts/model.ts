export interface Post {
  id: string,
  title: string,
  content: string,
  commentCount: number,
  likeCount: number,
  liked: boolean,
  statement: boolean,
  pin: boolean,
  goal: boolean,
  reflection: boolean,
  result: boolean,
  image: boolean,
  audio: boolean,
  video: boolean,
  mediaUrl: string,
  externalUrl: string,
  day: string,
  dateDue: string,
  user: {
    uid: string,
    name: string,
    photo: string,
  },
  timestamp: {
    rawDate: number,
    displayDate: string,
    rawTime: number,
    displayTime: string,
  }
}


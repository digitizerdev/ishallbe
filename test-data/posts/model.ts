export interface Post {
  id: string,
  title: string,
  description: string,
  commentCount: number,
  likeCount: number,
  private: boolean,
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
  rawDateDue: number,
  displayDateDue: string,
  complete: boolean,
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


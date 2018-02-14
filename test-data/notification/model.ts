export interface Notification {
  id: string,
  read: boolean,
  like: boolean,
  comment: boolean,
  commentLike: boolean,
  reminder: boolean,
  message: string,
  post: {
    id: string,
    type: string,
    owner: string
  }
  user: {
    uid: string,
    name: string,
    photo: string
  },
  timestamp: {
    rawDate: number,
    displayDate: string,
    rawTime: number,
    displayTime: string
  }
}


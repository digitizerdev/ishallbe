export interface Notification {
  id: string,
  read: boolean,
  like: boolean,
  comment: boolean,
  commentLike: boolean,
  reminder: boolean,
  message: string,
  displayTimestamp: string,
  timestamp: number,
  post: {
    id: string,
    type: string,
    owner: string
  }
  user: {
    uid: string,
    name: string,
    photo: string
  }
}


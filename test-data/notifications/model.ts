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
  postId: string,
  postType: string,
  owner: string
  uid: string,
  name: string,
  face: string
}


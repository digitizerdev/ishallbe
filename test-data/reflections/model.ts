export interface Reflection {
  id: string,
  title: string,
  description: string,
  commentCount: number,
  likeCount: number,
  private: boolean,
  contentUrl: string,
  displayTimestamp: string,
  timestamp: number,
  user: {
    uid: string,
    name: string,
    photo: string,
  }
}


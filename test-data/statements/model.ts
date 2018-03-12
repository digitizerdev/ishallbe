export interface Statement {
  id: string,
  title: string,
  description: string,
  commentCount: number,
  likeCount: number,
  private: boolean,
  url: string,
  filename: string,
  displayTimestamp: string,
  timestamp: number,
  user: {
    uid: string,
    name: string,
    photo: string,
  }
}


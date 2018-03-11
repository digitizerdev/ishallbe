export interface Goal {
  id: string,
  title: string,
  description: string,
  commentCount: number,
  likeCount: number,
  private: boolean,
  complete: boolean,
  contentUrl: string,
  displayDueDate: string;
  dueDate: number,
  displayTimestamp: string;
  timestamp: number,
  user: {
    uid: string,
    name: string,
    photo: string,
  }
}


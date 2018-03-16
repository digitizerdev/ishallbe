export interface Goal {
  id: string,
  title: string,
  description: string,
  commentCount: number,
  likeCount: number,
  private: boolean,
  complete: boolean,
  url: string,
  filename: string,
  displayDueDate: string;
  dueDate: number,
  displayTimestamp: string;
  timestamp: number,
  uid: string,
  name: string,
  face: string,
}


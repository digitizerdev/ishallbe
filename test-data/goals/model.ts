export interface Goal {
  id: string,
  title: string,
  description: string,
  commentCount: number,
  likeCount: number,
  reported: boolean,
  private: boolean,
  complete: boolean,
  url: string,
  filename: string,
  displayDueDate: string;
  dueDate: number,
  collection: string,
  displayTimestamp: string;
  timestamp: number,
  uid: string,
  name: string,
  face: string,
}


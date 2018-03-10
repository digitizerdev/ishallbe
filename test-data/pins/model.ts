export interface Pin {
  id: string,
  title: string,
  description: string,
  commentCount: number,
  likeCount: number,
  contentUrl: string,
  externalUrl: string,
  affirmationDate: number,
  timestamp: number,
  day: string,
  user: {
    uid: string,
    name: string,
    photo: string,
  }
}


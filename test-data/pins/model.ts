export interface Pin {
  id: string,
  title: string,
  description: string,
  commentCount: number,
  likeCount: number,
  contentUrl: string,
  externalUrl: string,
  displayAffirmationDate: string,
  affirmationDate: number,
  displayTimestamp: string,
  timestamp: number,
  day: string,
  user: {
    uid: string,
    name: string,
    photo: string,
  }
}


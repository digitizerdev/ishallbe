export interface Pin {
  id: string,
  title: string,
  description: string,
  commentCount: number,
  likeCount: number,
  url: string,
  link: string,
  filename: string,
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


export interface Statement {
  comments: [{
    id: string,
    statementId: string,
    content: string,
    liked: boolean,
    likeCount: number
    user: {
      uid: string,
      name: string,
      photo: string
    },
    timestamp: {
      rawdate: number,
      displayDate: string,
      rawTime: number,
      displayTime: string
    }
  }],
  likers: [{
    id: string,
    statementId: string,
    user: {
      uid: string,
      name: string,
      photo: string,
    },
    timestamp: {
      rawdate: number,
      displayDate: string,
      rawTime: number,
      displayTime: string,
    }
  }],
  id: string,
  title: string,
  image: string,
  flagged: boolean,
  liked: boolean,
  likeCount: number,
  commentCount: number,
  mediaUrl: string,
  media: {
    image: boolean,
    audio: boolean,
    video: boolean
  },
  user: {
    uid: string,
    name: string,
    photo: string
  },
  timestamp: {
    rawDate: number,
    displayDate: string,
    rawTime: number,
    displayTime: string
  }
}


export interface Goal {
  comments: [{
    id: string,
    goalId: string,
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
  partner: [{
    id: string,
    goalId: string,
    user: {
      uid: string,
      name: string,
      photo: string,
    },
    timestamp: {
      rawDate: number,
      displayDate: string,
      rawTime: number,
      displayTime: string,
    }
  }],
  id: string,
  title: string,
  content: string,
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


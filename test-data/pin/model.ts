export interface Pin {
  id: string,
  title: string,
  content: string,
  liked: boolean,
  likeCount: number,
  commentCount: number,
  image: boolean,
  audio: boolean,
  video: boolean
  media: {
    imageUrl: string,
    audioUrl: string,
    videoUrl: string
  },
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
  },
  comments: [{
    id: string,
    pinId: string,
    content: string,
    liked: boolean,
    likeCount: number,
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
  likers: [{
    id: string,
    pinId: string,
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
  }],
}


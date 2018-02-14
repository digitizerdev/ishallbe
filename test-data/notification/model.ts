export interface Notification {
  id: string,
  opened: boolean,
  content: {
    subject: string,
    message: string,
  }
  doc: {
    type: string,
    id: string
  }
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


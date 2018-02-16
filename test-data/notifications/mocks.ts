import { Notification } from './model';
export const likedStatement = {
  id: "1",
  read: false,
  like: true,
  comment: false,
  commentLike: false,
  reminder: false,
  message: "liked your statement",
  post: {
    id: "1",
    type: "statement",
    owner: "Troy Thompson"
  },
  user: {
    uid: "1",
    name: "Shelby Tinsley",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180215,
    displayDate: "FEB 15 2018",
    rawTime: 2018021592701,
    displayTime: "9:27am"
  }
}
export const commentedOnStatement = {
  id: "2",
  read: true,
  like: false,
  comment: true,
  commentLike: false,
  reminder: false,
  message: "commented on your statement",
  post: {
    id: "1",
    type: "statement",
    owner: "Troy Thompson"
  },
  user: {
    uid: "1",
    name: "Shelby Tinsley",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180214,
    displayDate: "FEB 14 2018",
    rawTime: 20180214162400,
    displayTime: "4:24pm"
  }
}
export const likedCommentOnStatement = {
  id: "3",
  read: false,
  like: false,
  comment: false,
  commentLike: true,
  reminder: false,
  message: "liked your comment on Troy's statement",
  post: {
    id: "1",
    type: "statement",
    owner: "Troy Thompson"
  },
  user: {
    uid: "1",
    name: "Shelby Tinsley",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180213,
    displayDate: "FEB 13 2018",
    rawTime: 20180213162400,
    displayTime: "4:24pm"
  }
}
export const likedPin = {
  id: "4",
  read: true,
  like: true,
  comment: false,
  commentLike: false,
  reminder: false,
  message: "liked your pin",
  post: {
    id: "1",
    type: "pin",
    owner: "Troy Thompson"
  },
  user: {
    uid: "1",
    name: "Shelby Tinsley",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180215,
    displayDate: "FEB 15 2018",
    rawTime: 20180215084800,
    displayTime: "8:48am"
  }
}
export const commentedOnPin = {
  id: "5",
  read: false,
  like: false,
  comment: true,
  commentLike: false,
  reminder: false,
  message: "commented on your pin",
  post: {
    id: "1",
    type: "pin",
    owner: "Troy Thompson"
  },
  user: {
    uid: "1",
    name: "Shelby Tinsley",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180214,
    displayDate: "FEB 14 2018",
    rawTime: 20180214162400,
    displayTime: "4:24pm"
  }
}
export const likedCommentOnPin = {
  id: "6",
  read: false,
  like: false,
  comment: false,
  commentLike: true,
  reminder: false,
  message: "liked your comment on iShallBe's pin",
  post: {
    id: "1",
    type: "pin",
    owner: "Troy Thompson"
  },
  user: {
    uid: "1",
    name: "Shelby Tinsley",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180213,
    displayDate: "FEB 13 2018",
    rawTime: 20180213162400,
    displayTime: "4:24pm"
  }
}
export const goalReminder = {
  id: "7",
  read: true,
  like: false,
  comment: false,
  commentLike: false,
  reminder: true,
  message: "Don't forget to record results on your September Goal",
  post: {
    id: "1",
    type: "statement",
    owner: "Troy Thompson"
  },
  user: {
    uid: "1",
    name: "Reminder: ",
    photo: "assets/img/logo-square.png"
  },
  timestamp: {
    rawDate: 20180205,
    displayDate: "FEB 5 2018",
    rawTime: 20180205121212,
    displayTime: "12:12pm"
  }
}
export const mockNotifications: Notification[] = [likedStatement, commentedOnStatement, likedCommentOnStatement, likedPin, commentedOnPin, likedCommentOnPin, goalReminder];       
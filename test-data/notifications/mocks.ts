import { Notification } from './model';
export const likedStatement = {
  id: "1",
  read: false,
  like: true,
  comment: false,
  commentLike: false,
  reminder: false,
  message: "liked your statement",
  displayTimestamp: "FEB 19 2018 6:27PM",
  timestamp: 20180219182701,
  post: {
    id: "1",
    type: "statement",
    owner: "Troy Thompson"
  },
  user: {
    uid: "1",
    name: "Shelby Tinsley",
    photo: "assets/img/headshot.png"
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
  displayTimestamp: "FEB 19 2018 4:24PM",
  timestamp: 20180219162400,
  post: {
    id: "1",
    type: "statement",
    owner: "Troy Thompson"
  },
  user: {
    uid: "1",
    name: "Shelby Tinsley",
    photo: "assets/img/headshot.png"
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
  displayTimestamp: "FEB 17 2018 4:24PM",
  timestamp: 20180217162400,
  post: {
    id: "1",
    type: "statement",
    owner: "Troy Thompson"
  },
  user: {
    uid: "1",
    name: "Shelby Tinsley",
    photo: "assets/img/headshot.png"
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
  displayTimestamp: "FEB 15 2018 8:48AM",
  timestamp: 20180215084800,
  post: {
    id: "1",
    type: "pin",
    owner: "Troy Thompson"
  },
  user: {
    uid: "1",
    name: "Shelby Tinsley",
    photo: "assets/img/headshot.png"
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
  displayTimestamp: "FEB 14 2018 4:24PM",
  timestamp: 20180214162400, 
  post: {
    id: "1",
    type: "pin",
    owner: "Troy Thompson"
  },
  user: {
    uid: "1",
    name: "Shelby Tinsley",
    photo: "assets/img/headshot.png"
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
  displayTimestamp: "FEB 13 2018 4:24PM",
  timestamp: 20180213162400,
  post: {
    id: "1",
    type: "pin",
    owner: "Troy Thompson"
  },
  user: {
    uid: "1",
    name: "Shelby Tinsley",
    photo: "assets/img/headshot.png"
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
  displayTimestamp: "FEB 05 2018 12:12PM",
  timestamp: 20180205121212,
  post: {
    id: "1",
    type: "statement",
    owner: "Troy Thompson"
  },
  user: {
    uid: "1",
    name: "Reminder: ",
    photo: "assets/img/logo-square.png"
  }
}
export const mockNotifications: Notification[] = [likedStatement, commentedOnStatement, likedCommentOnStatement, likedPin, commentedOnPin, likedCommentOnPin, goalReminder];       
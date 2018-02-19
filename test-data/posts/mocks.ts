import { Post } from './model';
export const statement = {
  id: "1",
  title: "Mock Statement",
  content: "Mock Statement Content",
  commentCount: 0,
  likeCount: 0,
  private: false,
  statement: true,
  pin: false,
  goal: false,
  reflection: false,
  result: false,
  image: true,
  audio: false,
  video: false,
  mediaUrl: "assets/img/logo.png",
  externalUrl: "",
  day: "",
  dateDue: "",
  complete: false,
  user: {
    uid: "1",
    name: "Test Contributor",
    photo: "assets/img/default-profile.png"
  },
  timestamp: {
    rawDate: 20180216,
    displayDate: "FEB 16 2018",
    rawTime: 20180216153100,
    displayTime: "3:31pm"
  }
};
export const mondayPin = {
  id: "2",
  title: "Motivational Monday",
  content: "",
  commentCount: 10,
  likeCount: 10,
  private: false,
  statement: false,
  pin: true,
  goal: false,
  reflection: false,
  result: false,
  image: true,
  audio: false,
  video: false,
  mediaUrl: "https://newevolutiondesigns.com/images/freebies/philadelphia-downtown.jpg",
  externalUrl: "",
  day: "Monday",
  dateDue: "",
  complete: false,
  user: {
    uid: "2",
    name: "Test Editor",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180219,
    displayDate: "FEB 19 2018",
    rawTime: 20180219000000,
    displayTime: "12:00am"
  }
}
export const tuesdayPin = {
  id: "3",
  title: "Tuesday's Tune of the Day",
  content: "Sometimes you just have to let it go, Leaving all your fears to burn down, Push them all away so you can move on - Goapele: CLoser",
  commentCount: 0,
  likeCount: 2,
  private: false,
  statement: false,
  pin: true,
  goal: false,
  reflection: false,
  result: false,
  image: true,
  audio: false,
  video: false,
  mediaUrl: "",
  externalUrl: "https://youtube.com",
  day: "Tuesday",
  dateDue: "",
  complete: false,
  user: {
    uid: "2",
    name: "Test Editor",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180220,
    displayDate: "FEB 20 2018",
    rawTime: 20180220000000,
    displayTime: "12:00am"
  }
}
export const wednesdayPin = {
  id: "4",
  title: "Wise Words Wednesday",
  content: "There will be times in life when we will be faced with struggles, setbacks, challenges, disappointments, and dark days. Part of sustaining and making through is maintaining hope.",
  commentCount: 3,
  likeCount: 0,
  private: false,
  statement: false,
  pin: true,
  goal: false,
  reflection: false,
  result: false,
  image: true,
  audio: false,
  video: false,
  mediaUrl: "",
  externalUrl: "",
  day: "Wednesday",
  dateDue: "",
  complete: false,
  user: {
    uid: "2",
    name: "Test Editor",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180221,
    displayDate: "FEB 21 2018",
    rawTime: 20180221000000,
    displayTime: "12:00am"
  }
}
export const thursdayPin = {
  id: "5",
  title: "Treat Yourself Thursday",
  content: "Just because it has not happen does not mean it is not going to happen. ",
  commentCount: 0,
  likeCount: 1,
  private: false,
  statement: false,
  pin: true,
  goal: false,
  reflection: false,
  result: false,
  image: true,
  audio: false,
  video: false,
  mediaUrl: "",
  externalUrl: "",
  day: "Thursday",
  dateDue: "",
  complete: false,
  user: {
    uid: "2",
    name: "Test Editor",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180222,
    displayDate: "FEB 22 2018",
    rawTime: 20180222000000,
    displayTime: "12:00am"
  }
}
export const fridayPin = {
  id: "6",
  title: "Faith Over Fear Fridays",
  content: "Failure is the most powerful tool you can use, it just depends on how you use it.",
  commentCount: 1,
  likeCount: 0,
  private: false,
  statement: false,
  pin: true,
  goal: false,
  reflection: false,
  result: false,
  image: true,
  audio: false,
  video: false,
  mediaUrl: "",
  externalUrl: "",
  day: "Friday",
  dateDue: "",
  complete: false,
  user: {
    uid: "2",
    name: "Test Editor",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180223,
    displayDate: "FEB 23 2018",
    rawTime: 20180232000000,
    displayTime: "12:00am"
  }
}
export const saturdayPin = {
  id: "7",
  title: "Happy Saturday!",
  content: "Recap this week’s motivational bar before it is permanently deleted. Have a great Saturday! Get your iShallBe Statement ready for iShallBe Sundays.",
  commentCount: 0,
  likeCount: 0,
  private: false,
  statement: false,
  pin: true,
  goal: false,
  reflection: false,
  result: false,
  image: true,
  audio: false,
  video: false,
  mediaUrl: "",
  externalUrl: "",
  day: "Saturday",
  dateDue: "",
  complete: false,
  user: {
    uid: "2",
    name: "Test Editor",
    photo: "assets/img/headshot.png"
  },
  timestamp: {
    rawDate: 20180224,
    displayDate: "FEB 24 2018",
    rawTime: 20180242000000,
    displayTime: "12:00am"
  }
}
export const mockPosts: Post[] = [statement, mondayPin, tuesdayPin, wednesdayPin, thursdayPin, fridayPin, saturdayPin];       
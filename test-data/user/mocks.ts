import { User } from "./model";
export const freshUser: User = {
  uid: "1",
  name: "Test Contributor",
  bio: "I contribute statement and goal affirmations",
  email: "ishallbe-contributor@tdct.io",
  blocked: false,
  photo: "assets/img/default-profile.png",
  social: {
    instagram: null,
    linkedin: null,
    twitter: null
  },
  roles: {
    contributor: true,
    editor: false
  },
  timestamp: {
    rawDate: 20180116,
    displayDate: "Jan 16 2018",
    rawTime: 20180116121212,
    displayTime: "12:12pm"
  }
}
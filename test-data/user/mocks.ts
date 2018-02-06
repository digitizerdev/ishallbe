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
    joinDate: 20180116,
    displayJoinDate: "January 16th, 2018",
    lastActiveDate: 20180116,
    displayLastActiveDate: "January 16th, 2018"
  }

}
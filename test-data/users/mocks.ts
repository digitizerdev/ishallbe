import { User } from "./model";
export const contributor = { 
  uid: "1",
  name: "Test Contributor",
  bio: "I contribute statement and goal affirmations",
  email: "contributor@ishallbe.co",
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
export const editor = { 
  uid: "2",
  name: "Test Editor",
  bio: "I contribute and edit pin, statements and goal affirmations",
  email: "editor@ishallbe.co",
  blocked: false,
  photo: "assets/img/headshot.png",
  social: {
    instagram: "ishallbe__",
    linkedin: null,
    twitter: "ishallbe__"
  },
  roles: {
    contributor: true,
    editor: true
  },
  timestamp: {
    rawDate: 20180116,
    displayDate: "Jan 16 2018",
    rawTime: 20180116121212,
    displayTime: "12:12pm"
  }
}
export const mockUsers: User[] = [contributor, editor];       
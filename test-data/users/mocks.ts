import { User } from "./model";
export const contributor = { 
  uid: "1",
  name: "Test Contributor",
  bio: "I contribute statement and goal affirmations",
  email: "contributor@ishallbe.co",
  blocked: false,
  photo: "assets/img/default-profile.png",
  displayTimestamp: "",
  timestamp: 2018030321212,
  social: {
    instagram: null,
    linkedin: null,
    twitter: null
  },
  roles: {
    contributor: true,
    editor: false
  }
}
export const editor = { 
  uid: "2",
  name: "Test Editor",
  bio: "I contribute and edit pin, statements and goal affirmations",
  email: "editor@ishallbe.co",
  blocked: false,
  photo: "assets/img/headshot.png",
  displayTimestamp: "",
  timestamp: 20180116121212,
  social: {
    instagram: "ishallbe__",
    linkedin: null,
    twitter: "ishallbe__"
  },
  roles: {
    contributor: true,
    editor: true
  }
}
export const mockUsers: User[] = [contributor, editor];       
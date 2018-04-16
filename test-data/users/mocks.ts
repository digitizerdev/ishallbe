import { User } from "./model";
export const contributor = {
  uid: "1",
  fcmToken: "1",
  name: "Test Contributor",
  bio: "I contribute statement and goal affirmations",
  email: "contributor@ishallbe.co",
  blocked: false,
  photo: "assets/img/default-profile.png",
  displayTimestamp: "MAR 03 2018 12:12PM",
  timestamp: 20180303121212,
  instagram: null,
  linkedin: null,
  twitter: null,
  contributor: true,
  editor: false
}
export const editor = {
  uid: "2",
  fcmToken: "2",
  name: "Test Editor",
  bio: "I contribute and edit pin, statements and goal affirmations",
  email: "editor@ishallbe.co",
  blocked: false,
  photo: "assets/img/headshot.png",
  displayTimestamp: "JAN 16 2018 12:12PM",
  timestamp: 20180116121212,
  instagram: "ishallbe__",
  linkedin: null,
  twitter: "ishallbe__",
  contributor: true,
  editor: true
}
export const mockUsers: User[] = [contributor, editor];       
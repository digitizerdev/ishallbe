import { User } from "./model";
export const freshSubscriber: User = {
  uid: "1",
  name: "Stratton",
  bio: "The King Stratton",
  email: "sccthompson@tdct.io",
  blocked: false,
  photo: "assets/img/default-profile.png",
  social: {
    instagram: null,
    linkedin: null,
    twitter: null
  },
  roles: {
    subscriber: true,
    partner: false,
    contractor: false
  },
  timestamp: {
    joinDate: 20180116,
    displayJoinDate: "January 16th, 2018",
    lastActiveDate: 20180116,
    displayLastActiveDate: "January 16th, 2018"
  }
};
export const matureSubscriber: User = {
  uid: "2",
  name: "Ashanti",
  bio: "J Kids Unite!",
  email: "ajcthompson@tdct.io",
  blocked: false,
  photo: "assets/img/default-profile.png",
  social: {
    instagram: "ajcthompson",
    linkedin: "ajcthompson",
    twitter: "ajcthompson"
  },
  roles: {
    subscriber: true,
    partner: false,
    contractor: false
  },
  timestamp: {
    joinDate: 20180116,
    displayJoinDate: "January 16th, 2018",
    lastActiveDate: 20180116,
    displayLastActiveDate: "January 16th, 2018"
  }
};
export const freshPartner: User = {
  uid: "3",
  name: "Troy",
  bio: null,
  email: "tdthompson@tdct.io",
  blocked: false,
  photo: "assets/img/default-profile.png",
  social: {
    instagram: null,
    linkedin: null,
    twitter: null
  },
  roles: {
    subscriber: true,
    partner: true,
    contractor: false
  },
  timestamp: {
    joinDate: 20180116,
    displayJoinDate: "January 16th, 2018",
    lastActiveDate: 20180116,
    displayLastActiveDate: "January 16th, 2018"
  }
};
export const maturePartner: User = {
  uid: "4",
  name: "Michelle",
  bio: "Team Thompson Chair",
  email: "mthompson@tdct.io",
  blocked: false,
  photo: "assets/img/default-profile.png",
  social: {
    instagram: null,
    linkedin: null,
    twitter: null
  },
  roles: {
    subscriber: true,
    partner: true,
    contractor: false
  },
  timestamp: {
    joinDate: 20180116,
    displayJoinDate: "January 16th, 2018",
    lastActiveDate: 20180116,
    displayLastActiveDate: "January 16th, 2018"
  }
};
export const freshContractor: User = {
  uid: "5",
  name: "Peter",
  bio: null,
  email: "pdaum@tdct.io",
  blocked: false,
  photo: "assets/img/default-profile.png",
  social: {
    instagram: null,
    linkedin: null,
    twitter: null
  },
  roles: {
    subscriber: true,
    partner: false,
    contractor: true
  },
  timestamp: {
    joinDate: 20180116,
    displayJoinDate: "January 16th, 2018",
    lastActiveDate: 20180116,
    displayLastActiveDate: "January 16th, 2018"
  }
};
export const matureContractor: User = {
  uid: "6",
  name: "Michael",
  bio: "BNorBeOut",
  email: "mjenkins@tdct.io",
  blocked: false,
  photo: "assets/img/default-profile.png",
  social: {
    instagram: null,
    linkedin: null,
    twitter: null
  },
  roles: {
    subscriber: true,
    partner: false,
    contractor: true
  },
  timestamp: {
    joinDate: 20180116,
    displayJoinDate: "January 16th, 2018",
    lastActiveDate: 20180116,
    displayLastActiveDate: "January 16th, 2018"
  }
};
export const mockUsers: User[] = [freshSubscriber, matureSubscriber, freshPartner, maturePartner, freshContractor, matureContractor];
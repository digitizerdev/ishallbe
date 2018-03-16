import { Reported } from './model';
export const reportedStatement = {
    id: "1",
    pin: false,
    statement: true,
    goal: false,
    comment: false,
    collectionId: "1",
    description: "Test Reported Statement",
    displayTimestamp: "FEB 16 2018",
    timestamp: 20180216121212,
    uid: "2",
    name: "Test Editor",
    face: "assets/img/headshot.png"
}
export const reportedPin = {
    id: "2",
    pin: true,
    statement: false,
    goal: false,
    comment: false,
    collectionId: "2",
    description: "Test Reported Pin",
    displayTimestamp: "FEB 16 2018",
    timestamp: 20180216121212,
    uid: "1",
    name: "Test Contributor",
    face: "assets/img/default-face.png"
}
export const reportedGoal = {
    id: "3",
    pin: false,
    statement: false,
    goal: true,
    comment: false,
    collectionId: "3",
    description: "Test Reported Goal",
    displayTimestamp: "FEB 16 2018",
    timestamp: 20180216121212,
    uid: "1",
    name: "Test Contributor",
    face: "assets/img/default-face.png"
}
export const reportedComment = {
    id: "4",
    pin: false,
    statement: false,
    goal: false,
    comment: true,
    collectionId: "4",
    description: "Test Reported Comment",
    displayTimestamp: "FEB 16 2018",
    timestamp: 20180216121212,
    uid: "1",
    name: "Test Contributor",
    face: "assets/img/default-face.png"
}
export const mockReported: Reported[] = [reportedStatement, reportedPin, reportedGoal, reportedComment]; 
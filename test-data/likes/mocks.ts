import { Likes } from './model';
export const statementLike = {
    id: "1",
    collectionId: "1",
    pin: false,
    statement: true,
    goal: false,
    displayTimestamp: "FEB 16 2018 12:12PM",
    timestamp: 20180216121212,
    uid: "1",
    name: "Test Contributor",
    face: "assets/img/default-face.png"
}
export const pinLike = {
    id: "2",
    collectionId: "2",
    pin: true,
    statement: false,
    goal: false,
    displayTimestamp: "FEB 16 2018 12:12PM",
    timestamp: 20180216121212,
    uid: "1",
    name: "Test Contributor",
    face: "assets/img/default-face.png"
}
export const goalLike = {
    id: "3",
    collectionId: "3",
    pin: false,
    statement: false,
    goal: true,
    displayTimestamp: "FEB 16 2018 12:12PM",
    timestamp: 20180216121212,
    uid: "1",
    name: "Test Contributor",
    face: "assets/img/default-face.png"
}
export const mockLikes: Likes[] = [statementLike, pinLike]; 
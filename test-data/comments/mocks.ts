import { Comment } from './model';
export const statementComment = {
    id: "1",
    collectionId: "1",
    pin: false,
    statement: true,
    goal: false,
    description: "Test Statement Comment",
    liked: false,
    likeCount: 0,
    displayTimestamp: "FEB 16 2018",
    timestamp: 20180216121212,
    uid: "2",
    name: "Test Editor",
    face: "assets/img/headshot.png"
}
export const pinComment = {
    id: "2",
    collectionId: "2",
    pin: true,
    statement: false,
    goal: false,
    description: "Test Pin Comment",
    liked: false,
    likeCount: 0,
    displayTimestamp: "FEB 16 2018",
    timestamp: 20180216121212,
    uid: "1",
    name: "Test Contributor",
    face: "assets/img/default-face.png"
}
export const goalComment = {
    id: "3",
    collectionId: "3",
    pin: false,
    statement: false,
    goal: true,
    description: "Test Goal Comment",
    liked: false,
    likeCount: 0,
    displayTimestamp: "FEB 16 2018",
    timestamp: 20180216121212,
    uid: "1",
    name: "Test Contributor",
    face: "assets/img/default-face.png"
}
export const mockComments: Comment[] = [statementComment, pinComment, goalComment]; 
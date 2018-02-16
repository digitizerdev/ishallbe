import { Comment } from './model';
export const postComment = {
    id: "1",
    collectionId: "1",
    content: "Test Comment",
    liked: false,
    likeCount: 0,
    user: {
        uid: "2",
        name: "Test Editor",
        photo: "assets/img/headshot.png"
    },
    timestamp: {
        rawDate: 20180216,
        displayDate: "FEB 16 2018",
        rawTime: 20180216121212,
        displayTime: "12:12pm"
    }
}
export const pinComment = {
    id: "2",
    collectionId: "2",
    content: "Test Comment",
    liked: false,
    likeCount: 0,
    user: {
        uid: "1",
        name: "Test Contributor",
        photo: "assets/img/default-photo.png"
    },
    timestamp: {
        rawDate: 20180216,
        displayDate: "FEB 16 2018",
        rawTime: 20180216121212,
        displayTime: "12:12pm"
    }
}
export const mockComments: Comment[] = [postComment, pinComment]; 
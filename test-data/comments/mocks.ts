import { Comment } from './model';
export const statementComment = {
    id: "1",
    collectionId: "1",
    content: "Test Comment",
    liked: false,
    likeCount: 0,
    timestamp: 20180216121212,
    user: {
        uid: "2",
        name: "Test Editor",
        photo: "assets/img/headshot.png"
    }
}
export const pinComment = {
    id: "2",
    collectionId: "2",
    content: "Test Comment",
    liked: false,
    likeCount: 0,
    timestamp: 20180216121212,
    user: {
        uid: "1",
        name: "Test Contributor",
        photo: "assets/img/default-photo.png"
    }
}
export const mockComments: Comment[] = [statementComment, pinComment]; 
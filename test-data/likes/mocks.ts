import { Likes } from './model';
export const statementLike = {
    id: "1",
    collectionId: "1",
    timestamp: 20180216121212,
    user: {
        uid: "1",
        name: "Test Contributor",
        photo: "assets/img/default-photo.png"
    },
}
export const pinLike = {
    id: "2",
    collectionId: "2",
    timestamp: 20180216121212,
    user: {
        uid: "1",
        name: "Test Contributor",
        photo: "assets/img/default-photo.png"
    }
}
export const mockLikes: Likes[] = [statementLike, pinLike]; 
import { Liker } from './model';
export const postLiker = {
    id: "1",
    collectionId: "1",
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
export const pinLiker = {
    id: "2",
    collectionId: "2",
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
export const mockLikers: Liker[] = [postLiker, pinLiker]; 
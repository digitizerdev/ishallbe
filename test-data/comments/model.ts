export interface Comment {
    id: string,
    collectionId: string,
    content: string,
    liked: boolean,
    likeCount: number,
    user: {
        uid: string,
        name: string,
        photo: string,
    },
    timestamp: {
        rawDate: number,
        displayDate: string,
        rawTime: number,
        displayTime: string,
    }
}
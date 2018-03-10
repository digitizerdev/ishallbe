export interface Comment {
    id: string,
    collectionId: string,
    content: string,
    liked: boolean,
    likeCount: number,
    timestamp: number,
    user: {
        uid: string,
        name: string,
        photo: string,
    }
}
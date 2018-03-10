export interface Likes {
    id: string,
    collectionId: string,
    timestamp: number,
    user: {
        uid: string,
        name: string,
        photo: string
    }
}


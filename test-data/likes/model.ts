export interface Likes {
    id: string,
    collectionId: string,
    displayTimestamp: string,
    timestamp: number,
    user: {
        uid: string,
        name: string,
        photo: string
    }
}


export interface Liker {
    id: string,
    collectionId: string,
    user: {
        uid: string,
        name: string,
        photo: string
    },
    timestamp: {
        rawDate: number,
        displayDate: string,
        rawTime: number,
        displayTime: string
    }
}


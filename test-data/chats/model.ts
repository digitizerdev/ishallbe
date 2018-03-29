export interface Chat {
    id: string,
    name: string,
    face: string,
    description: string,
    lastMessageText: boolean,
    lastMessageAudio: boolean,
    lastMessageImage: boolean,
    lastMessageTimestamp: number,
    lastMessageDisplayTimestamp: string,
    newMessages: boolean
}
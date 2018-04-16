export interface Message {
    id: string,
    received: boolean,
    sent: boolean,
    face: string,
    name: string,
    description: string,
    displayTimestamp: string,
    timestamp: number,
}
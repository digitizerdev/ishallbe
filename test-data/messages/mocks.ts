import { Message } from './model';
export const textMessage = {
    id: "1",
    received: true,
    sent: false,
    face: "assets/img/default-profile.png",
    name: "Brittanie Russell",
    description: "Test Text Message",
    displayTimestamp: "FEB 16 2018",
    timestamp: 20180216121212,
}
export const imageMessage = {
    id: "2",
    received: false,
    sent: true,
    face: "assets/img/default-profile.png",
    name: "Troy Thompson",
    description: "Test Image Message",
    displayTimestamp: "FEB 16 2018",
    timestamp: 20180216121212,
}
export const audioMessage = {
    id: "3",
    received: true,
    sent: false,
    face: "assets/img/default-profile.png",
    name: "Brittanie Russell",
    description: "Test Audio Message",
    displayTimestamp: "FEB 16 2018",
    timestamp: 20180216121212,
}
export const mockMessages: Message[] = [textMessage, imageMessage, audioMessage]; 
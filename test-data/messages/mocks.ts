import { Message } from './model';
export const textMessage = {
    id: "1",
    image: false,
    audio: false,
    url: "",
    filename: "",
    description: "Test Text Message",
    displayTimestamp: "FEB 16 2018",
    timestamp: 20180216121212,
    uid: "2",
    name: "Test Editor",
    face: "assets/img/headshot.png"
}
export const imageMessage = {
    id: "2",
    image: true,
    audio: false,
    url: "image.png",
    filename: "image.png",
    description: "Test Image Message",
    displayTimestamp: "FEB 16 2018",
    timestamp: 20180216121212,
    uid: "2",
    name: "Test Editor",
    face: "assets/img/headshot.png"
}
export const audioMessage = {
    id: "3",
    image: false,
    audio: true,
    url: "message.m4a",
    filename: "message.m4a",
    description: "Test Audio Message",
    displayTimestamp: "FEB 16 2018",
    timestamp: 20180216121212,
    uid: "2",
    name: "Test Editor",
    face: "assets/img/headshot.png"
}
export const mockMessages: Message[] = [textMessage, imageMessage, audioMessage]; 
import { Chat } from './model';
export const firstChat = {
    id: "1",
    name: "Test Editor",
    face: "assets/img/headshot.png",
    description: "Yooo",
    lastMessageText: true,
    lastMessageAudio: false,
    lastMessageImage: false,
    lastMessageTimestamp: 23523323,
    lastMessageDisplayTimestamp: "Mar 3rd",
    newMessages: true
}
export const secondChat = {
    id: "2",
    name: "Test Contributor",
    face: "assets/img/headshot.png",
    description: "Hey",
    lastMessageText: false,
    lastMessageAudio: true,
    lastMessageImage: false,
    lastMessageTimestamp: 23523323,
    lastMessageDisplayTimestamp: "Mar 3rd",
    newMessages: true
}
export const thirdChat = {
    id: "3",
    name: "Yo Mama",
    face: "assets/img/headshot.png",
    description: "OKAY!",
    lastMessageText: false,
    lastMessageAudio: false,
    lastMessageImage: true,
    lastMessageTimestamp: 23523323,
    lastMessageDisplayTimestamp: "Mar 3rd",
    newMessages: false
}
export const mockChats: Chat[] = [firstChat, secondChat, thirdChat]; 
export interface User {
    uid: string,
    fcmToken: string;
    name: string,
    bio: string,
    email: string,
    blocked: boolean,
    photo: string,
    displayTimestamp: string,
    timestamp: number,
    instagram: string,
    linkedin: string,
    twitter: string
    contributor: boolean,
    editor: boolean,
    admin: boolean
}

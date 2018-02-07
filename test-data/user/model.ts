export interface User {
    uid: string,
    name: string,
    bio: string,
    email: string,
    blocked: boolean,
    photo: string,
    social: {
        instagram: string,
        linkedin: string,
        twitter: string
    },
    roles: {
        contributor: boolean,
        editor: boolean
    },
    timestamp: {
        rawDate: number,
        displayDate: string,
        rawTime: number,
        displayTime: string,
    }
}

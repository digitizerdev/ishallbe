export interface User {
    uid: string,
    name: string,
    bio: string,
    email: string,
    blocked: boolean,
    photo: string,
    displayTimestamp: string,
    timestamp: number,
    social: {
        instagram: string,
        linkedin: string,
        twitter: string
    },
    roles: {
        contributor: boolean,
        editor: boolean
    }
}

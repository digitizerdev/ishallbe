export interface User {
    uid: string;
    name: string;
    bio: string;
    email: string;
    blocked: boolean;
    photo: string;
    social: {
        instagram: string;
        linkedin: string;
        twitter: string;
    };
    roles: {
        subscriber: boolean,
        partner: boolean,
        contractor: boolean
    };
    timestamp: {
        joinDate: number;
        displayJoinDate: string;
        lastActiveDate: number;
        displayLastActiveDate: string;
    };
    
}

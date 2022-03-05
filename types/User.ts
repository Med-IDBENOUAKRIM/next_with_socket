

export type User = {
    name: string;
    email: string;
    username: string;
    avatar: string;
    newMessagePopUp: boolean;
    unreadMessage: boolean;
    unreadNotification: boolean;
    role: {
        type: string;
    };
}
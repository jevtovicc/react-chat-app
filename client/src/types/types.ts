export interface User {
    firstName: string,
    lastName: string,
    username: string,
    password: string
};

export interface Message {
    id: number,
    user: User
    content: string,
}

export interface MessageThread {
    threadId: number,
    threadPhotoUrl: string
    threadTitle: string,
    messages: Message[]
}


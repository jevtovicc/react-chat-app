export interface User {
    firstName: string,
    lastName: string,
    username: string,
    password: string
};

export interface Message {
    id: number,
    user: User,
    sentAt?: Date,
    content: string,
    messageThreadId: number
}

export interface MessageThread {
    id: number,
    name: string,
    createdAt?: Date,
    messages: Message[]
}


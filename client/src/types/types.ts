export interface User {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    messageThreads: MessageThread[],
    following: User[],
    followedBy: User[]
};

export interface Message {
    id?: number,
    user: User,
    sentAt?: Date,
    content: string,
    messageThreadId: number
}

export interface MessageThread {
    id: number,
    name: string,
    createdAt: Date,
    messages: Message[],
    users: User[]
}


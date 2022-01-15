export interface Message {
    id: number,
    sender: User
    content: string,
}

export interface MessageThread {
    threadId: number,
    threadPhotoUrl: string
    threadTitle: string,
    messages: Message[]
}


export interface User {
    firstName: string,
    lastName: string,
    username: string,
    password: string
    photoUrl: string,
};

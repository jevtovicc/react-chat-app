export interface Message {
    id: number,
    sender: string
    content: string,
    photoSrc: string,
}

export interface MessageThread {
    threadId: number,
    threadPhotoSrc: string
    threadTitle: string,
    messages: Message[]
}


export interface User {
    firstName: string,
    lastName: string,
    username: string,
    password: string
};

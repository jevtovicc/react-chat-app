import Message from "./Message";

export default interface MessageThread {
    threadId: number,
    threadPhotoUrl: string
    threadTitle: string,
    messages: Message[]
}

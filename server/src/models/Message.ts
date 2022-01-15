import User from "./User";

export default interface Message {
    id: number,
    sender: User
    content: string,
}

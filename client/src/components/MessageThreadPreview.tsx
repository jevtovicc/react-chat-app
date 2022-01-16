import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Message } from "../types/types";

interface Props {
    threadId: number,
    name: string,
    lastMessage: Message,
}

function MessageThreadPreview({ threadId, name, lastMessage }: Props) {
    const navigate = useNavigate();

    return (
        <li
            onClick={() => navigate(`/threads/${threadId}`)}
            className="flex place-items-start space-x-3 border-y border-gray-800 py-4 px-2 cursor-pointer hover:bg-gray-800 transition-colors">
            <img
                src='https://www.w3schools.com/howto/img_avatar.png'
                alt='thread-avatar'
                className="rounded-full h-14 w-14" />
            <div className="flex flex-col">
                <div>
                    <strong>{name}</strong>
                    <span className="text-sm"> &#8226;</span>
                    <small className="text-gray-400"> {dayjs(lastMessage.sentAt?.toString()).format('HH:mm')}</small>
                </div>
                <small className="text-gray-400">{lastMessage.content}</small>
            </div>
        </li>
    )
}

export default MessageThreadPreview

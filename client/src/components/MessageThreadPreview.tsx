import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { MessageThread } from "../types/types";

interface Props {
    messageThread: MessageThread
}

function MessageThreadPreview({ messageThread }: Props) {
    const navigate = useNavigate();
    const lastMessage = messageThread.messages[messageThread.messages.length - 1];

    return (
        <li
            onClick={() => navigate(`/threads/${messageThread.id}`)}
            className="flex place-items-start space-x-3 border-y border-gray-800 py-4 px-2 cursor-pointer hover:bg-gray-800 transition-colors">
            <img
                src='https://www.w3schools.com/howto/img_avatar.png'
                alt='thread-avatar'
                className="rounded-full h-14 w-14" />
            <div className="flex flex-col">
                <div>
                    <strong>{messageThread.name}</strong>
                    <span className="text-sm"> &#8226;</span>
                    <small className="text-gray-400"> {dayjs(lastMessage?.sentAt?.toString() || messageThread.createdAt).format('HH:mm')}</small>
                </div>
                <small className="text-gray-400">{lastMessage?.content || 'New group created...'}</small>
            </div>
        </li>
    )
}

export default MessageThreadPreview

import { useNavigate } from "react-router-dom";

interface Props {
    threadId: number,
    threadPhotoUrl: string
    threadTitle: string,
    lastMessage: string,
}

function MessageThreadPreview({ threadId, threadPhotoUrl, threadTitle, lastMessage }: Props) {
    const navigate = useNavigate();

    return (
        <li
            onClick={() => navigate(`/threads/${threadId}`)}
            className="flex place-items-start space-x-3 border-y border-gray-800 py-4 px-2 cursor-pointer hover:bg-gray-800 transition-colors">
            <img
                src={threadPhotoUrl}
                alt='thread-avatar'
                className="rounded-full h-14 w-14" />
            <div className="flex flex-col">
                <strong>{threadTitle}</strong>
                <small className="text-gray-400">{lastMessage}</small>
            </div>
        </li>
    )
}

export default MessageThreadPreview

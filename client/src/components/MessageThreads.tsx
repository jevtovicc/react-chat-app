import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import MessageThreadPreview from "./MessageThreadPreview"
import { setMessageThreads } from "../store/features/MessagesSlice";
import { fetchMessages } from "../store/features/SocketSlice";
import { MessageThread } from "../types/types";

function MessageThreadPreviews() {
    const messageThreads = useAppSelector(state => state.messages.messageThreads)
    const socket = useAppSelector(state => state.socket.socket)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMessages())
        socket.on('message threads', (messageThreads: MessageThread[]) => {
            dispatch(setMessageThreads(messageThreads))
        })
    }, []);

    return (
        <div className="bg-gray-900 text-gray-100">
            <ul>
                {messageThreads.map(mt => (
                    <MessageThreadPreview
                        key={mt.threadId}
                        threadId={mt.threadId}
                        threadPhotoSrc={mt.threadPhotoSrc}
                        threadTitle={mt.threadTitle}
                        lastMessage={mt.messages[mt.messages.length - 1].content}
                    />
                ))}
            </ul>
        </div>
    )
}

export default MessageThreadPreviews

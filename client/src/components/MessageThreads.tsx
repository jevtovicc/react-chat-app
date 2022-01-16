import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import MessageThreadPreview from "./MessageThreadPreview"
import { MessageThread } from "../types/types";
import { fetchMessageThreads } from "../store/features/MessagesSlice";

function MessageThreadPreviews() {
    const messageThreads = useAppSelector(state => state.messages.messageThreads)
    const dispatch = useAppDispatch();

    useEffect(() => {
        // TODO: fix empty object
        dispatch(fetchMessageThreads({}))
    }, []);

    return (
        <div className="bg-gray-900 text-gray-100">
            <ul>
                {messageThreads.map(mt => (
                    <MessageThreadPreview
                        key={mt.id}
                        messageThread={mt}
                    />
                ))}
            </ul>
        </div>
    )
}

export default MessageThreadPreviews

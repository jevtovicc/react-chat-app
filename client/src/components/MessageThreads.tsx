import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import MessageThreadPreview from "./MessageThreadPreview"
import { MessageThread } from "../types/types";
import { fetchMessageThreads } from "../store/features/MessagesSlice";
import dayjs from "dayjs";

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
                {/* Sort message threads by most recent */}
                {[...messageThreads]
                    .sort((mt1, mt2) => {
                        // if there is no last message, take creation date of message thread instead
                        const mt1Time = dayjs((mt1.messages[mt1.messages.length - 1]?.sentAt || mt1.createdAt)?.toString());
                        const mt2Time = dayjs((mt2.messages[mt2.messages.length - 1]?.sentAt || mt2.createdAt)?.toString());
                        return -1 * mt1Time.diff(mt2Time)
                    })
                    .map(mt => (
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

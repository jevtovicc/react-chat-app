import dayjs from "dayjs";
import { useAppSelector } from "../store/hooks";
import MessageThreadPreview from "./MessageThreadPreview";

function MessageThreads() {
    const user = useAppSelector(state => state.auth.user)

    return (
        <div className="bg-gray-900 text-gray-100">
            <ul>
                {/* Sort message threads by most recent */}
                {[...user?.messageThreads!]
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

export default MessageThreads

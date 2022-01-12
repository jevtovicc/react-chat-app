import { useAppSelector } from "../store/hooks"
import MessageThreadPreview from "./MessageThreadPreview"

function MessageThreadPreviews() {
    const messageThreads = useAppSelector(state => state.messages.messageThreads)

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

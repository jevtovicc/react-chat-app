interface Props {
    threadPhotoSrc: string
    threadTitle: string,
    lastMessage: string,
}

function MessageThreadPreview({ threadPhotoSrc, threadTitle, lastMessage }: Props) {
    return (
        <li className="flex place-items-start space-x-3 border border-gray-800 py-4 px-2">
            <img
                src={threadPhotoSrc}
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

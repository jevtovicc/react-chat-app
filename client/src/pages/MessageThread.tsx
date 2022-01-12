import { useParams } from 'react-router-dom'

function MessageThread() {
    const params = useParams()

    return (
        <div>
            <h1>Message Thread: {params.threadId}</h1>
        </div>
    )
}

export default MessageThread

import { Message } from "../types/types"

interface Props {
    message: Message
}

function ChatMessage({ message }: Props) {
    return (
        <li className='mt-6 flex place-items-start space-x-3'>
            <img
                src={message.sender.photoUrl}
                alt='thread-avatar'
                className="rounded-full h-14 w-14" />
            <div className='text-gray-300'>
                <p className='bg-gray-800 p-3 rounded-md'>{message.content}</p>
                <small className='p-3 text-gray-300 font-bold'>15:27</small>
            </div>
        </li>
    )
}

export default ChatMessage

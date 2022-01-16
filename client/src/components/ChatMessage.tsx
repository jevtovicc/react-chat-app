import { useAppSelector } from "../store/hooks"
import { Message } from "../types/types"
import dayjs from 'dayjs'

interface Props {
    message: Message
}

function ChatMessage({ message }: Props) {
    const user = useAppSelector(state => state.auth.user)

    return (
        <li className={`my-6 flex place-items-start ${user?.id === message.user?.id ? 'justify-end' : 'justify-start'}`}>
            <img
                src='https://www.w3schools.com/howto/img_avatar.png'
                alt='thread-avatar'
                className={`rounded-full h-14 w-14 ${user?.id === message.user?.id ? 'order-1 ml-3' : 'order-none mr-3'}`} />
            <div className='text-gray-300 bg-gray-800 p-3 rounded-md'>
                <strong>{message.user.username}</strong>
                <span className="text-lg"> &#8226;</span>
                <small> {dayjs(message.sentAt?.toString()).format('HH:mm')}</small>
                <p>
                    {message.content}
                </p>
            </div>
        </li>
    )
}

export default ChatMessage;

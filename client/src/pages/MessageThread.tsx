import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import AddUserForm from '../components/AddUserForm';
import ChatMessage from '../components/ChatMessage';
import { addMessage, addUserToMessageThread } from '../store/features/MessagesSlice';
import { sendMessage, userTyped } from '../store/features/SocketSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Message, User } from '../types/types';
import Modal from '../ui/Modal';

// TODO: change input for sending message to text are which automatically resizes when message gets long (up to the certaion point)
function MessageThread() {
    const params = useParams<{ threadId: string }>()
    const navigate = useNavigate();
    // TODO: strongly type params to have id
    const messageThread = useAppSelector(state => state.messages.messageThreads.find(mt => mt.id === +params.threadId!))
    const user = useAppSelector(state => state.auth.user);
    const socket = useAppSelector(state => state.socket.socket)
    const dispatch = useAppDispatch();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState("");
    const [typingUser, setTypingUser] = useState<User | null>(null);
    const [addUserModalOpen, setAddUserModalOpen] = useState(false);

    useEffect(() => {
        if (!messageThread) {
            navigate('/');
        }
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

        socket.on('chat message', (message: Message) => {
            dispatch(addMessage(message))
        });

        socket.on('user typing', (user: User) => {
            setTypingUser(user)
            const timeout = setTimeout(() => setTypingUser(null), 3000)
        })

        return () => {
            socket.off('chat message');
        }
    }, [messageThread, navigate])

    // TODO: fix nullish value
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        dispatch(sendMessage({
            user: user!, // TODO: fix !
            content: inputValue,
            messageThreadId: messageThread?.id!
        }))

        setInputValue('');
    }

    function handleInputValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(userTyped(user!))
        setInputValue(e.target.value)
    }

    function handleAddUserToMessageThread(username: string) {
        dispatch(addUserToMessageThread({ messageThreadId: messageThread?.id!, username: username }))
        setAddUserModalOpen(false)
    }

    return (
        <main className='bg-gray-900 text-gray-100 py-4 px-8 h-screen flex flex-col justify-between'>
            <div className="h-full overflow-auto">
                <header className="flex place-items-center justify-between border-b-2 border-gray-800 py-2 sticky top-0 z-10 bg-gray-900">
                    <div className='flex place-items-center space-x-3'>
                        <img
                            src='https://www.w3schools.com/howto/img_avatar.png'
                            alt='thread-avatar'
                            className="rounded-full h-14 w-14" />
                        <strong>{typingUser ? `${typingUser.username} is typing...` : messageThread?.name}</strong>
                    </div>
                    <div className="space-x-3">
                        <button
                            onClick={() => setAddUserModalOpen(true)}
                            className="text-gray-200 p-2 rounded-full hover:bg-blue-700 transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg></button>
                        <button className='p-3 border-2 border-gray-800 rounded-full hover:border-green-700 hover:text-green-700 transition-colors'><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                    </div>
                </header>
                <ul>
                    {messageThread?.messages.map(msg => (<ChatMessage key={msg.id} message={msg} />))}
                </ul>
                {/* This div is used for purposes of auto-scrolling to bottom (last message) when opening message thread */}
                <div ref={messagesEndRef}></div>
            </div>

            <form className="flex py-4" onSubmit={handleSubmit}>
                <input type="text" value={inputValue} onChange={handleInputValueChange} className="w-full bg-transparent text-gray-300 border border-gray-700 border-r-0 rounded-tl-lg rounded-bl-lg py-3 px-3 outline-none focus:border-blue-700" />
                <button disabled={inputValue.trim().length === 0} type="submit" className="bg-blue-700 border border-blue-700 py-3 px-2 rounded-tr-lg rounded-br-lg disabled:cursor-not-allowed">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                </button>

            </form>

            {addUserModalOpen && <Modal onClose={() => setAddUserModalOpen(false)}><AddUserForm onSubmit={handleAddUserToMessageThread} /></Modal>}
        </main>
    )
}

export default MessageThread

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import ChatMessage from '../components/ChatMessage';
import { sendMessage } from '../store/features/MessagesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks'

// TODO: change input for sending message to text are which automatically resizes when message gets long (up to the certaion point)
function MessageThread() {
    const params = useParams<{ threadId: string }>()
    const navigate = useNavigate();
    // TODO: strongly type params to have threadId
    const messageThread = useAppSelector(state => state.messages.messageThreads.find(mt => mt.threadId === +params.threadId!))
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (!messageThread) {
            navigate('/');
        }
    }, [messageThread, navigate])

    // TODO: fix nullish value
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(sendMessage({ messageThreadId: messageThread?.threadId || -1, messageContent: inputValue }))
        setInputValue('');
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
                        <strong>Elon Musk</strong>
                    </div>
                    <button className='p-3 border-2 border-gray-800 rounded-full'><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                </header>
                <ul >
                    {messageThread?.messages.map(msg => (<ChatMessage key={msg.id} message={msg} />))}
                </ul>
            </div>

            <form className="flex" onSubmit={handleSubmit}>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full bg-transparent text-gray-300 border border-gray-700 border-r-0 rounded-tl-lg rounded-bl-lg py-3 px-3 outline-none focus:border-blue-700" />
                <button type="submit" className="bg-blue-700 border border-blue-700 py-3 px-2 rounded-tr-lg rounded-br-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                </button>

            </form>
        </main>
    )
}

export default MessageThread

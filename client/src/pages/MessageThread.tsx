import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import ChatMessage from '../components/ChatMessage';
import { useAppSelector } from '../store/hooks'

function MessageThread() {
    const params = useParams<{ threadId: string }>()
    const navigate = useNavigate();
    // TODO: strongly type params to have threadId
    const messageThread = useAppSelector(state => state.messages.messageThreads.find(mt => mt.threadId === +params.threadId!))

    useEffect(() => {
        if (!messageThread) {
            navigate('/');
        }
    }, [messageThread, navigate])

    return (
        <main className='bg-gray-900 text-gray-100 py-4 px-3 h-screen'>
            <header className="flex place-items-center justify-between border-b-2 border-gray-800 py-2">
                <div className='flex place-items-center space-x-3'>
                    <img
                        src='https://www.w3schools.com/howto/img_avatar.png'
                        alt='thread-avatar'
                        className="rounded-full h-14 w-14" />
                    <strong>Elon Musk</strong>
                </div>
                <button className='p-3 border-2 border-gray-800 rounded-full'><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
            </header>
            <ul>
                {messageThread?.messages.map(msg => (<ChatMessage key={msg.id} message={msg} />))}
            </ul>
        </main>
    )
}

export default MessageThread

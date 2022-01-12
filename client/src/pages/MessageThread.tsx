import { useParams } from 'react-router-dom'

function MessageThread() {
    const params = useParams()

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
                <li className='mt-6 flex place-items-start space-x-3'>
                    <img
                        src='https://www.w3schools.com/howto/img_avatar.png'
                        alt='thread-avatar'
                        className="rounded-full h-14 w-14" />
                    <div className='text-gray-300'>
                        <p className='bg-gray-800 p-3 rounded-md'>Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.</p>
                        <small className='p-3 text-gray-300 font-bold'>15:27</small>
                    </div>
                </li>
                <li className='mt-6 flex place-items-start space-x-3'>
                    <div className='text-gray-300'>
                        <p className='bg-gray-800 p-3 rounded-md'>Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.Some people don't like change, but you need to embrace change if the alternative is disaster.</p>
                        <small className='block text-right p-3 font-bold'>15:27</small>
                    </div>
                    <img
                        src='https://www.w3schools.com/howto/img_avatar.png'
                        alt='thread-avatar'
                        className="rounded-full h-14 w-14" />
                </li>
            </ul>
        </main>
    )
}

export default MessageThread

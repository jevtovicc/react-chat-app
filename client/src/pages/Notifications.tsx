import { Link } from "react-router-dom";

function Notifications() {
    return (
        <main className="h-screen bg-gray-900 text-gray-100">
            <header className="bg-gray-900 text-gray-100 py-4 px-3">
                <Link to="/">
                    <button className="border border-blue-700 hover:bg-blue-700 transition-colors p-3 rounded-md">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                </Link>
            </header>
            <h1 className="p-4 text-lg text-center">All notifications</h1>
            <ul>
                <li className="p-4 border-t border-gray-800">Elon Musk added you to group Scala</li>
                <li className="p-4 border-t border-gray-800 flex justify-between items-center">
                    <h1>Jeff Bezos sent you a friend request</h1>
                    <div className="space-x-3 flex">
                        <button className="border border-blue-800 p-2 rounded-md text-sm">Accept</button>
                        <button className="border border-red-800 p-2 rounded-md text-sm">Decline</button>
                    </div>
                </li>
                <li className="p-4 border-y border-gray-800 flex justify-between items-center">
                    <h1>Bill Gates sent you a friend request</h1>
                    <div className="space-x-3 flex">
                        <button className="border border-blue-800 p-2 rounded-md text-sm">Accept</button>
                        <button className="border border-red-800 p-2 rounded-md text-sm">Decline</button>
                    </div>
                </li>
            </ul>
        </main >
    )
}

export default Notifications;

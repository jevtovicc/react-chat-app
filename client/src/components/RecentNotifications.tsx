import { Link } from "react-router-dom";

function RecentNotifications() {
    return (
        <div className="text-gray-400">
            <h1 className="p-4 text-lg text-center">Recent notifications</h1>
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
            <div className="p-4 text-center">
                <Link to="/notifications" className="underline text-sm text-gray-500  hover:text-gray-400 transition-colors cursor-pointer">View all notifications</Link>
            </div>
        </div >
    )
}

export default RecentNotifications;

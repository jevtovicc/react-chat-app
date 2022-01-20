import { useState } from "react";
import { useAppSelector } from "../store/hooks";

interface Props {
    onSubmit: (username: string) => void
}

function AddFriendForm({ onSubmit }: Props) {
    const error = useAppSelector(state => state.auth.error)
    const [inputValue, setInputValue] = useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit(inputValue);
    }

    return (
        <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {error && <p className="text-center bg-red-900 text-gray-300 mb-4 p-4 rounded-sm shadow-xl">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full">
                    <label className="text-gray-400 text-sm mb-2">Username or Email</label>
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        className="px-3 py-2 rounded-md bg-transparent text-gray-300 border border-gray-700"
                        placeholder="Search..." />
                </div>
                <div className="text-right">
                    <button
                        className="bg-blue-800 hover:bg-blue-700 transition-colors text-gray-200 py-2 w-full rounded-md mt-5">Send Friend Request</button>
                </div>
            </form>
        </div>
    )
}

export default AddFriendForm;

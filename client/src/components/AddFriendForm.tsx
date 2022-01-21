import { useState } from "react";
import { findUserByUsername, resetSearchedUser, sendFriendRequest } from "../store/features/AuthSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function AddFriendForm() {
    const { error, searchedUser } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(findUserByUsername({ username: inputValue }))
        setInputValue('')
    }

    function handleConfirm() {
        dispatch(sendFriendRequest({ friendUsername: searchedUser!.username }))
    }

    function handleCancel() {
        dispatch(resetSearchedUser())
    }

    return (
        <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {error && <p className="text-center bg-red-900 text-gray-300 mb-4 p-4 rounded-sm shadow-xl">{error}</p>}
            {searchedUser ?
                <div className="text-gray-200 text-center">
                    <h1>Send friend request to user <strong>{searchedUser.username}</strong> ?</h1>
                    <div className="mt-4 space-x-4">
                        <button onClick={handleCancel} className="border border-red-800 p-2 rounded-md text-sm hover:bg-red-700 transition-colors">Cancel</button>
                        <button onClick={handleConfirm} className="border border-blue-800 p-2 rounded-md text-sm hover:bg-blue-700 transition-colors">Confirm</button>
                    </div>
                </div>
                :
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
                            className="bg-blue-800 hover:bg-blue-700 transition-colors text-gray-200 py-2 w-full rounded-md mt-5">Search</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default AddFriendForm;

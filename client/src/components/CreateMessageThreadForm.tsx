import { useState } from "react";
import { createMessageThread } from "../store/features/MessagesSlice";
import { useAppDispatch } from "../store/hooks";
import { MessageThread } from "../types/types";

function CreateMessageThreadForm() {
    const dispatch = useAppDispatch();
    const [groupName, setGroupName] = useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(createMessageThread(groupName))
    }

    return (
        <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full">
                    <label className="text-gray-400 text-sm mb-1">Group name</label>
                    <input
                        type="text"
                        value={groupName} onChange={(e) => setGroupName(e.target.value)}
                        className="px-3 py-2 rounded-md bg-transparent text-gray-300 border border-gray-700" />
                </div>
                <button className="bg-blue-700 text-gray-200 w-full rounded-md py-2 mt-4">Create</button>
            </form>
        </div>
    )

}

export default CreateMessageThreadForm;

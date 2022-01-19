import { useState } from "react";
import { createMessageThread } from "../store/features/AuthSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { User } from "../types/types";

function CreateMessageThreadForm() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user)
    const [groupName, setGroupName] = useState('');

    const friends = useAppSelector(state => state.auth.user?.following)
    const [participants, setParticipants] = useState<User[]>([])

    function addParticipant(participant: User) {
        setParticipants(participants => [...participants, participant])
    }

    function removeParticipant(participantId: number) {
        setParticipants(participants => participants.filter(p => p.id !== participantId))
    }

    function handleCreateMessageThread() {
        dispatch(createMessageThread({
            username: user?.username!,
            messageThreadName: groupName,
            participants: participants
        }))
    }

    return (
        <div className="bg-gray-900 text-gray-200 pt-5 pb-4 sm:p-6 sm:pb-4">
            <form className="mx-4">
                <div className="flex flex-col w-full">
                    <label className="text-gray-400 text-sm mb-1">Group name</label>
                    <input
                        type="text"
                        value={groupName} onChange={(e) => setGroupName(e.target.value)}
                        className="px-3 py-2 rounded-md bg-transparent text-gray-300 border border-gray-700" />
                </div>
            </form>

            <div className="bg-gray-900 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center px-4 mb-4">
                    <h1 className="text-center text-lg">Add participants</h1>
                    <h5 className="text-center text-sm text-gray-400">{participants.length}/{friends?.length}</h5>
                </div>
                <ul className="max-h-52 overflow-auto">
                    {friends?.map(friend => (
                        <li key={friend.id} className="flex items-center justify-between border-y border-gray-800 py-2 px-4 hover:bg-gray-800 transition-colors">
                            <div className="flex items-center space-x-5">
                                <img
                                    src='https://www.w3schools.com/howto/img_avatar.png'
                                    alt='thread-avatar'
                                    className="rounded-full h-14 w-14" />
                                <strong>
                                    {friend.username}
                                </strong>
                            </div>
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    // e.target.checked is current state so if it is not checked -> remove participant
                                    if (!e.target.checked) {
                                        console.log('Removing')
                                        removeParticipant(friend.id)
                                    } else {
                                        addParticipant(friend)
                                    }
                                }} />
                        </li>
                    ))}
                </ul>
                <div className="mx-4 mt-5">
                    <button
                        onClick={handleCreateMessageThread}
                        className="bg-blue-800 hover:bg-blue-700 transition-colors text-gray-200 py-2 w-full rounded-md">Create</button>
                </div>

            </div>
        </div>
    )

}

export default CreateMessageThreadForm;

import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { MessageThread, User } from "../types/types";

interface Props {
    onSubmit: (participants: User[]) => void,
    messageThread: MessageThread
}

function AddUserForm({ onSubmit, messageThread }: Props) {
    // Only show friends who are not already in the message thread
    const friends = useAppSelector(state =>
        state.auth.user?.following
            .filter(friend => messageThread.users.findIndex(u => u.id === friend.id) === -1)
    )
    const [participants, setParticipants] = useState<User[]>([])

    function addParticipant(participant: User) {
        setParticipants(participants => [...participants, participant])
    }

    function removeParticipant(participantId: number) {
        setParticipants(participants => participants.filter(p => p.id !== participantId))
    }

    return (
        <div className="bg-gray-900 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h1 className="text-center text-xl">Add participants</h1>
            <h5 className="text-center mb-4 text-sm text-gray-400">{participants.length}/{friends?.length}</h5>
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
            <div className="mx-2 mt-5">
                <button
                    onClick={() => onSubmit(participants)}
                    className="bg-blue-800 hover:bg-blue-700 transition-colors text-gray-200 py-2 w-full rounded-md">Confirm</button>
            </div>

        </div>
    )
}

export default AddUserForm;

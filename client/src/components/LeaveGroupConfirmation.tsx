import { useNavigate } from "react-router-dom";
import { leaveMessageThread } from "../store/features/AuthSlice";
import { useAppDispatch } from "../store/hooks";
import { MessageThread } from "../types/types";

interface Props {
    messageThread: MessageThread
}

function LeaveGroupConfirmation({ messageThread }: Props) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    function handleConfirm() {
        navigate('/')
        dispatch(leaveMessageThread({ messageThreadId: messageThread.id }))
    }
    return (
        <div className="bg-gray-900 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h1 className="px-3 text-center">Are you sure you want to leave group <strong>{messageThread.name}</strong> ?</h1>
            <div className="mt-4 text-right space-x-3 px-3">
                <button className="p-2 bg-red-700 rounded-sm">Cancel</button>
                <button
                    onClick={handleConfirm}
                    className="p-2 bg-blue-700 rounded-sm">Confirm</button>
            </div>

        </div>
    )
}

export default LeaveGroupConfirmation;

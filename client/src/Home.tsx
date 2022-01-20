import { useState } from "react"
import AddFriendForm from "./components/AddFriendForm";
import CreateMessageThreadForm from "./components/CreateMessageThreadForm";
import MessageThreads from "./components/MessageThreads"
import Navbar from "./components/Navbar"
import RecentNotifications from "./components/RecentNotifications";
import { clearError, sendFriendRequest } from "./store/features/AuthSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Modal from "./ui/Modal"

function Home() {
    const { user, error } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const [addFriendModalOpen, setAddFriendModalOpen] = useState(false);
    const [createMessageThreadModalOpen, setCreateMessageThreadModalOpen] = useState(false);
    const [recentNotificationsModalOpen, setRecentNotificationsModalOpen] = useState(false);


    return (
        <main className="bg-gray-900 h-screen">
            <Navbar
                openNotificationsModal={() => setRecentNotificationsModalOpen(true)}
                openCreateMessageThreadModal={() => setCreateMessageThreadModalOpen(true)}
                openAddFriendModal={() => setAddFriendModalOpen(true)}
            />
            <MessageThreads />
            {addFriendModalOpen && (
                <Modal onClose={() => {
                    if (error) {
                        dispatch(clearError())
                    }
                    setAddFriendModalOpen(false)
                }}>
                    <AddFriendForm
                        onSubmit={(username) =>
                            dispatch(sendFriendRequest({ senderUsername: user!.username, friendUsername: username }))
                        }
                    />
                </Modal>
            )}
            {createMessageThreadModalOpen && (
                <Modal onClose={() => {
                    if (error) {
                        dispatch(clearError())
                    }
                    setCreateMessageThreadModalOpen(false)
                }}>
                    <CreateMessageThreadForm />
                </Modal>
            )}

            {recentNotificationsModalOpen && (
                <Modal onClose={() => {
                    if (error) {
                        dispatch(clearError())
                    }
                    setRecentNotificationsModalOpen(false);
                }}>
                    <RecentNotifications />
                </Modal>
            )}
        </main>
    );
}

export default Home

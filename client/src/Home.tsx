import { useState } from "react"
import AddFriendForm from "./components/AddFriendForm";
import CreateMessageThreadForm from "./components/CreateMessageThreadForm";
import MessageThreads from "./components/MessageThreads"
import Navbar from "./components/Navbar"
import RecentNotifications from "./components/RecentNotifications";
import { sendFriendRequest } from "./store/features/AuthSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Modal from "./ui/Modal"

function Home() {
    const user = useAppSelector(state => state.auth.user)
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
                <Modal onClose={() => setAddFriendModalOpen(false)}>
                    <AddFriendForm
                        onSubmit={(username) =>
                            dispatch(sendFriendRequest({ senderUsername: user!.username, friendUsername: username }))
                        }
                    />
                </Modal>
            )}
            {createMessageThreadModalOpen && (
                <Modal onClose={() => setCreateMessageThreadModalOpen(false)}>
                    <CreateMessageThreadForm />
                </Modal>
            )}

            {recentNotificationsModalOpen && (
                <Modal onClose={() => setRecentNotificationsModalOpen(false)}>
                    <RecentNotifications />
                </Modal>
            )}
        </main>
    );
}

export default Home

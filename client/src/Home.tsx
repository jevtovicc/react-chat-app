import { useState } from "react"
import AddFriendForm from "./components/AddFriendForm";
import CreateMessageThreadForm from "./components/CreateMessageThreadForm";
import MessageThreads from "./components/MessageThreads"
import Navbar from "./components/Navbar"
import { sendFriendRequest } from "./store/features/AuthSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import Modal from "./ui/Modal"

function Home() {
    const user = useAppSelector(state => state.auth.user)
    const dispatch = useAppDispatch();
    const [addFriendModalOpen, setAddFriendModalOpen] = useState(false);
    const [createMessageThreadModalOpen, setCreateMessageThreadModalOpen] = useState(false);

    return (
        <main className="bg-gray-900 h-screen">
            <Navbar
                openCreateMessageThreadModal={() =>
                    setCreateMessageThreadModalOpen(true)
                }
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
        </main>
    );
}

export default Home

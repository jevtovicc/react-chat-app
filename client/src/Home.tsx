import { useState } from "react"
import AddUserForm from "./components/AddUserForm";
import CreateMessageThreadForm from "./components/CreateMessageThreadForm";
import MessageThreads from "./components/MessageThreads"
import Navbar from "./components/Navbar"
import Modal from "./ui/Modal"

function Home() {
    const [addUserModalOpen, setAddUserModalOpen] = useState(false);
    const [createMessageThreadModalOpen, setCreateMessageThreadModalOpen] = useState(true);

    return (
        <main className="bg-gray-900 h-screen">
            <Navbar onClick={() => setAddUserModalOpen(true)} />
            <MessageThreads />
            {addUserModalOpen && <Modal onClose={() => setAddUserModalOpen(false)}><AddUserForm /></Modal>}
            {createMessageThreadModalOpen && <Modal onClose={() => setCreateMessageThreadModalOpen(false)}><CreateMessageThreadForm /></Modal>}
        </main>
    )
}

export default Home

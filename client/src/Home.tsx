import { useState } from "react"
import AddUserForm from "./components/AddUserForm";
import MessageThreads from "./components/MessageThreads"
import Navbar from "./components/Navbar"
import Modal from "./ui/Modal"

function Home() {
    const [addUserModalOpen, setAddUserModalOpen] = useState(false);

    return (
        <main className="bg-gray-900 h-screen">
            <Navbar onClick={() => setAddUserModalOpen(true)} />
            <MessageThreads />
            {addUserModalOpen && <Modal onClose={() => setAddUserModalOpen(false)}><AddUserForm /></Modal>}
        </main>
    )
}

export default Home

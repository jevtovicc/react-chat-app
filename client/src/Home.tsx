import MessageThreads from "./components/MessageThreads"
import Navbar from "./components/Navbar"

function Home() {
    return (
        <main className="bg-gray-900 h-screen">
            <Navbar />
            <MessageThreads />
        </main>
    )
}

export default Home

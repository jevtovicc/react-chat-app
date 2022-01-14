import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Auth from "./pages/Auth";
import MessageThread from "./pages/MessageThread";
import { useAppSelector } from "./store/hooks";
import socketIOClient from 'socket.io-client'
import { useEffect } from "react";

const ENDPOINT = "http://127.0.0.1:9000";

function App() {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT)
    }, []);

    return (
        // isAuthenticated ? <Home /> : <Auth />
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/threads/:threadId' element={<MessageThread />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
}

export default App;

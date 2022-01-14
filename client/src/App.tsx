import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Auth from "./pages/Auth";
import MessageThreadPage from "./pages/MessageThread";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import socketIOClient from 'socket.io-client'
import { useEffect } from "react";
import { setMessageThreads } from "./store/features/MessagesSlice";
import { MessageThread } from "./types/types";

const ENDPOINT = "http://127.0.0.1:9000";

function App() {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT)
        socket.on('message threads', (messageThreads: MessageThread[]) => {
            dispatch(setMessageThreads(messageThreads))
        })
    }, []);

    return (
        // isAuthenticated ? <Home /> : <Auth />
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/threads/:threadId' element={<MessageThreadPage />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
}

export default App;

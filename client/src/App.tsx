import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Auth from "./pages/Auth";
import MessageThreadPage from "./pages/MessageThread";
import { useAppSelector } from "./store/hooks";

function App() {
    const user = useAppSelector(state => state.auth.user)

    return (
        <Routes>
            <Route path='/' element={user ? <Home /> : <Auth />}></Route>
            <Route path='/threads/:threadId' element={user ? <MessageThreadPage /> : <Auth />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
}

export default App;

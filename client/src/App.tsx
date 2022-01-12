import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Auth from "./pages/Auth";
import MessageThread from "./pages/MessageThread";
import { useAppSelector } from "./store/hooks";

function App() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

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

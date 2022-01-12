import Home from "./Home";
import Auth from "./pages/Auth";
import { useAppSelector } from "./store/hooks";

function App() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  return (
    // isAuthenticated ? <Home /> : <Auth />
    <Home />
  );
}

export default App;

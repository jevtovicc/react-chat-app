import { useState } from "react";
import Login from "../components/Login"
import Signup from "../components/Signup";

function Auth() {

    const [isLogin, setIsLogin] = useState(true);

    return (
        isLogin ? <Login toggleAuthState={() => setIsLogin(false)} /> : <Signup toggleAuthState={() => setIsLogin(true)} />
    )
}

export default Auth

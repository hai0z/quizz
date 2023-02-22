import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";

function Login() {
    const { handleLogin } = useAuthContext();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.authSlice.auth);
    if (auth.isLogin) {
        navigate("/");
        return;
    }
    return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <div className="text-center">
                <h3 className="font-mono text-4xl pb-10 text-primary">Quizzzzz</h3>
                <button className="btn btn-outline btn-primary" onClick={handleLogin}>
                    Login with google
                </button>
            </div>
        </div>
    );
}

export default Login;

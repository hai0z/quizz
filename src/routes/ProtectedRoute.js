import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.authSlice.auth);
    if (!auth.isLogin) {
        navigate("/login");
        return;
    }
    return <Outlet />;
}

export default ProtectedRoute;

import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

export function ProtectedRoute() {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.authSlice.auth);
    if (!auth.isLogin) {
        navigate("/login");
        return;
    }

    return <Outlet />;
}

export function AdminProtectedRoute() {
    const navigate = useNavigate();
    const { loading } = useAuthContext();
    const auth = useSelector((state) => state.authSlice.auth);
    const user = useSelector((state) => state.authSlice.user);

    if (loading) {
        return <progress className="progress w-56"></progress>;
    } else {
        if (!auth.isLogin || user.role !== "ADMIN") {
            navigate("/login");
            return;
        }
    }

    return <Outlet />;
}

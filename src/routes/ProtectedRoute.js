import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

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
    const auth = useSelector((state) => state.authSlice.auth);
    if (!auth.isLogin || auth.role !== "ADMIN") {
        navigate("/login");
        return;
    }

    return <Outlet />;
}

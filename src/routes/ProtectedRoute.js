import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import CardLoading from "../components/Sketon/CardLoading";
import { useAuthContext } from "../context/AuthProvider";

export function ProtectedRoute() {
    const navigate = useNavigate();
    const { loading } = useAuthContext();
    const auth = useSelector((state) => state.authSlice.auth);

    if (loading) {
        return (
            <div className="container  flex flex-row flex-wrap gap-8 justify-center md:justify-around p-8">
                {Array.from({ length: 6 }).map((_, index) => (
                    <CardLoading key={index} />
                ))}
            </div>
        );
    } else if (!auth.isLogin) {
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
        return (
            <div className="container p-8 flex flex-row gap-8 flex-wrap justify-center md:justify-start">
                {Array.from({ length: 2 }).map((_, index) => (
                    <CardLoading key={index} />
                ))}
            </div>
        );
    } else {
        if (!auth.isLogin || user.role !== "ADMIN") {
            navigate("/login");
            return;
        }
    }

    return <Outlet />;
}

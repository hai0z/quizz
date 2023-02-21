import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AuthProvider from "../../context/AuthProvider";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";

const UserDrawer = ({ location }) => (
    <ul className="menu menu-compact p-4 bg-base-200 text-base-content sticky">
        <li>
            <Link to="/" className={`${location.pathname === "/" && "active"} `}>
                Trang chủ
            </Link>
        </li>
        <li>
            <Link to="/history" className={`${location.pathname === "/history" && "active"} `}>
                Lịch sử làm bài
            </Link>
        </li>
    </ul>
);
const AdminDrawer = ({ location }) => (
    <ul className="menu menu-compact p-4 bg-base-200 text-base-content sticky">
        <li>
            <Link to="/admin" className={`${location.pathname === "/admin" && "active"} `}>
                Trang chủ
            </Link>
        </li>
        <li>
            <Link
                to="/account-manager"
                className={`${location.pathname === "/Quản lý tài khoản" && "active"} `}
            >
                Lịch sử làm bài
            </Link>
        </li>
    </ul>
);
function Drawer({ children }) {
    const location = useLocation();
    const user = useSelector((state) => state.authSlice.user);

    return (
        <AuthProvider>
            <div className="drawer drawer-mobile">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Navbar />
                    {children}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <div className="bg-base-200 w-80 overflow-x-hidden">
                        <div className="hidden lg:flex h-16 p-4 items-center">
                            <Link to="/" className="btn btn-ghost">
                                <span className="text-primary font-bold text-2xl capitalize font-mono ">
                                    Quizz{" "}
                                    <span className="text-4xl text-base-content font-serif">
                                        {" "}
                                        App
                                    </span>
                                </span>
                            </Link>
                        </div>
                        {user.role === "ADMIN" ? (
                            <AdminDrawer location={location} />
                        ) : (
                            <UserDrawer location={location} />
                        )}
                    </div>
                </div>
            </div>
        </AuthProvider>
    );
}

export default Drawer;

import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AuthProvider from "../../context/AuthProvider";
import Navbar from "../Navbar";

function Drawer({ children }) {
    const location = useLocation();

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
                            <Link to="/admin" className="btn btn-ghost">
                                <span className="text-primary font-bold text-2xl capitalize font-mono ">
                                    Quizz{" "}
                                    <span className="text-4xl text-base-content font-serif">
                                        {" "}
                                        App
                                    </span>
                                </span>
                            </Link>
                        </div>
                        <ul className="menu menu-compact p-4 bg-base-200 text-base-content sticky">
                            <li>
                                <Link
                                    to="/admin"
                                    className={`${location.pathname === "/admin" && "active"} `}
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/account-manager"
                                    className={`${
                                        location.pathname === "/admin/account-manager" && "active"
                                    } `}
                                >
                                    Quản Lý
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthProvider>
    );
}

export default Drawer;

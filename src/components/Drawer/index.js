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
                    <ul className="menu p-4 w-80 bg-base-200 text-base-content sticky">
                        <li>
                            <Link
                                to="/test"
                                className={`${location.pathname === "/test" && "active"} `}
                            >
                                Start Quizz
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </AuthProvider>
    );
}

export default Drawer;

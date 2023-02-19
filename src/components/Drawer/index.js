import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Drawer({ children }) {
    const location = useLocation();
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">{children}</div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-200 text-base-content">
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
    );
}

export default Drawer;

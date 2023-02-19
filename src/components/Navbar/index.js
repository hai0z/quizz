import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const changeTheme = (themeName) => {
        const html = document.getElementById("html");
        html.setAttribute("data-theme", themeName);
    };
    return (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <label htmlFor="my-drawer" className="drawer-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </label>
                <Link className="btn btn-ghost normal-case text-xl" to="/">
                    Quizz
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn m-1 btn-ghost ">
                        <span className="mr-2">Theme</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li onClick={() => changeTheme("light")}>
                            <span>Light</span>
                        </li>
                        <li onClick={() => changeTheme("dark")}>
                            <span>Dark</span>
                        </li>
                        <li onClick={() => changeTheme("valentine")}>
                            <span>Valentine</span>
                        </li>
                        <li onClick={() => changeTheme("cyberpunk")}>
                            <span>Cyberpunk</span>
                        </li>
                        <li onClick={() => changeTheme("lofi")}>
                            <span>Lofi</span>
                        </li>
                        <li onClick={() => changeTheme("synthwave")}>
                            <span>Synthwave</span>
                        </li>
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                src="https://symbols.vn/wp-content/uploads/2021/11/Hinh-nen-Anime-cute.jpg"
                                alt="heheh"
                            />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li>
                            <Link>Settings</Link>
                        </li>
                        <li>
                            <Link>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;

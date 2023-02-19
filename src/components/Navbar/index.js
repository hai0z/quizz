import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");

        if (currentTheme) {
            setTheme(currentTheme);
        }
        const html = document.getElementById("html");
        html.setAttribute("data-theme", currentTheme);
    }, [theme]);

    const changeTheme = (themeName) => {
        setTheme(themeName);
        localStorage.setItem("theme", themeName);
        const html = document.getElementById("html");
        html.setAttribute("data-theme", themeName);
    };
    return (
        <div className="navbar bg-base-300 sticky top-0  bg-opacity-90 backdrop-blur z-30 w-full">
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
                <div className="dropdown dropdown-end ">
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
                        className="dropdown-content menu p-2 shadow bg-base-100  w-52 max-h-96 overflow-y-auto rounded-t-sm mt-4"
                    >
                        <div className="grid grid-cols-1 gap-3 p-3">
                            <li onClick={() => changeTheme("light")}>
                                <span className={`${theme === "light" && "active"}`}>Light</span>
                            </li>
                            <li onClick={() => changeTheme("dark")}>
                                <span className={`${theme === "dark" && "active"}`}>Dark</span>
                            </li>
                            <li onClick={() => changeTheme("valentine")}>
                                <span className={`${theme === "valentine" && "active"}`}>
                                    Valentine
                                </span>
                            </li>
                            <li onClick={() => changeTheme("cyberpunk")}>
                                <span className={`${theme === "cyberpunk" && "active"}`}>
                                    Cyberpunk
                                </span>
                            </li>
                            <li onClick={() => changeTheme("lofi")}>
                                <span className={`${theme === "lofi" && "active"}`}>Lofi</span>
                            </li>
                            <li onClick={() => changeTheme("synthwave")}>
                                <span className={`${theme === "synthwave" && "active"}`}>
                                    Synthwave
                                </span>
                            </li>
                            <li onClick={() => changeTheme("cupcake")}>
                                <span className={`${theme === "cupcake" && "active"}`}>
                                    Cupcake
                                </span>
                            </li>
                        </div>
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

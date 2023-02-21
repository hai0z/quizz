import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import { useAppContext } from "../../context/AppProvider";

function Navbar() {
    const theme = useSelector((state) => state.themeSlice.theme);
    const { handleChangeTheme } = useAppContext();
    const { handleLogout } = useAuthContext();
    const user = useSelector((state) => state.authSlice.user);

    return (
        <div className="navbar bg-base-100 sticky top-0  bg-opacity-90 backdrop-blur z-30 w-full text-base shadow-md transition-all duration-150">
            <div className="flex-1">
                <label htmlFor="my-drawer" className="lg:hidden p-4 btn btn-ghost">
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
                <Link
                    className="btn btn-ghost normal-case text-xl lg:-translate-x-96 transition-all duration-1000 translate-x-0 text-primary font-mono"
                    to="/"
                >
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
                            <li onClick={() => handleChangeTheme("light")}>
                                <span className={`${theme === "light" && "active"}`}>Light</span>
                            </li>
                            <li onClick={() => handleChangeTheme("dark")}>
                                <span className={`${theme === "dark" && "active"}`}>Dark</span>
                            </li>
                            <li onClick={() => handleChangeTheme("valentine")}>
                                <span className={`${theme === "valentine" && "active"}`}>
                                    Valentine
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("lemonade")}>
                                <span className={`${theme === "lemonade" && "active"}`}>
                                    Lemonade
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("lofi")}>
                                <span className={`${theme === "lofi" && "active"}`}>Lofi</span>
                            </li>
                            <li onClick={() => handleChangeTheme("synthwave")}>
                                <span className={`${theme === "synthwave" && "active"}`}>
                                    Synthwave
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("cupcake")}>
                                <span className={`${theme === "cupcake" && "active"}`}>
                                    Cupcake
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("bumblebee")}>
                                <span className={`${theme === "bumblebee" && "active"}`}>
                                    Bumblebee
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("wireframe")}>
                                <span className={`${theme === "wireframe" && "active"}`}>
                                    Wrireframe
                                </span>
                            </li>
                        </div>
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user.photoURL} alt="heheh" />
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
                            <Link onClick={handleLogout}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Navbar);

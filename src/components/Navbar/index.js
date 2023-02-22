import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import { useAppContext } from "../../context/AppProvider";

function Navbar() {
    const theme = useSelector((state) => state.themeSlice.theme);
    const { handleChangeTheme, getTitle } = useAppContext();
    console.log(getTitle());
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
                    className="btn btn-ghost normal-case text-xl transition-all duration-1000 translate-x-0 text-primary font-mono"
                    to="/"
                >
                    {getTitle()}
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end ">
                    <label tabIndex={0} className="btn m-1 btn-ghost ">
                        <svg
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                            ></path>
                        </svg>
                        <span className="mx-2">Theme</span>
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
                                <span className={`${theme === "light" && "active"} lowercase`}>
                                    Light
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("dark")}>
                                <span className={`${theme === "dark" && "active"} lowercase`}>
                                    Dark
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("valentine")}>
                                <span className={`${theme === "valentine" && "active"} lowercase`}>
                                    Valentine
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("lemonade")}>
                                <span className={`${theme === "lemonade" && "active"} lowercase`}>
                                    Lemonade
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("fantasy")}>
                                <span className={`${theme === "fantasy" && "active"} lowercase`}>
                                    fantasy
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("lofi")}>
                                <span className={`${theme === "lofi" && "active"} lowercase`}>
                                    Lofi
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("corporate")}>
                                <span className={`${theme === "corporate" && "active"} lowercase`}>
                                    Corporate
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("cupcake")}>
                                <span className={`${theme === "cupcake" && "active"} lowercase`}>
                                    Cupcake
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("bumblebee")}>
                                <span className={`${theme === "bumblebee" && "active"} lowercase`}>
                                    Bumblebee
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("wireframe")}>
                                <span className={`${theme === "wireframe" && "active"} lowercase`}>
                                    Wrireframe
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("night")}>
                                <span className={`${theme === "night" && "active"} lowercase`}>
                                    Night
                                </span>
                            </li>
                            <li onClick={() => handleChangeTheme("garden")}>
                                <span className={`${theme === "garden" && "active"} lowercase`}>
                                    Gardent
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
                            <Link className="justify-between" to="/profile">
                                Profile
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

import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import { useAppContext } from "../../context/AppProvider";
import { BsCoin } from "react-icons/bs";

function Navbar() {
    const location = useLocation();
    const { handleChangeTheme, navBarTitle } = useAppContext();
    const theme = useSelector((state) => state.themeSlice.theme);
    const user = useSelector((state) => state.authSlice.user);

    const themeList = [
        "light",
        "dark",
        "valentine",
        "cupcake",
        "lemonade",
        "garden",
        "lofi",
        "bumblebee",
        "winter",
        "autumn",
        "cmyk",
    ];
    const { handleLogout } = useAuthContext();
    const swapTheme = () => {
        if (theme === "dark") {
            handleChangeTheme([...themeList.filter((theme) => theme !== "dark")][Math.floor(Math.random() * 9)]);
        } else {
            handleChangeTheme("dark");
        }
    };
    return (
        <div className="navbar bg-secondary sticky top-0  bg-opacity-90 backdrop-blur z-30 w-full text-base shadow-sm transition-all duration-150">
            <div className="flex-1">
                <label htmlFor="my-drawer" className="lg:hidden p-4 btn btn-ghost text-secondary-content">
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
                <Link className="normal-case text-xs md:text-xl ml-1 transition-all duration-1000 translate-x-0 text-secondary-content font-mono text-ellipsis">
                    {navBarTitle}
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="dropdown dropdown-end ">
                    <label className="swap swap-rotate md:mr-8 m-1">
                        <input type="checkbox" checked={theme === "dark"} onChange={swapTheme} />
                        <svg
                            className="swap-on fill-current w-6 text-secondary-content h-6 md:w-10 md:h-10"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        <svg
                            className="swap-off fill-current w-6 h-6 text-secondary-content md:w-10 md:h-10"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                </div>
                <Link
                    to="/addcoin"
                    className="dropdown tooltip-bottom dropdown-end flex flex-row items-center cursor-pointer tooltip "
                    data-tip="add coin"
                >
                    <span className="text-secondary-content text-xs md:text-xl  transition-all duration-500">
                        {user.coin}
                    </span>
                    <BsCoin className="text-yellow-500  text-sm md:text-2xl ml-2 transition-all duration-500" />
                </Link>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user.photoURL} alt="user-img" />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link
                                className="justify-between"
                                to={location.pathname.includes("/admin") ? "/admin/profile" : "/profile"}
                            >
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

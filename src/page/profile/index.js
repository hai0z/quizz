import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import UserDrawer from "../../components/Drawer/UserDrawer";
import { useAppContext } from "../../context/AppProvider";
import { useAuthContext } from "../../context/AuthProvider";
function Profile() {
    const user = useSelector((state) => state.authSlice.user);
    const { setTitle } = useAppContext();
    const { handleLogout } = useAuthContext();
    useEffect(() => {
        setTitle("Thông tin cá nhân");
    });

    return (
        <UserDrawer>
            <div className="container min-h-screen flex flex-col">
                <div className="flex items-center justify-center mt-4 flex-col">
                    <div className="w-10/12 bg-gradient-to-r from-primary to-secondary h-56 rounded-md relative">
                        <div className="avatar absolute -bottom-14 left-6">
                            <div className="w-36 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                <img src={user.photoURL} alt="user_img" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="justify-center items-center flex mt-20">
                    <div className="w-10/12">
                        <p className="lg:text-3xl text-lg font-bold text-primary">
                            {user.displayName}
                        </p>
                        <p className="text-base md:text-lg mt-10 text-secondary">
                            Email:{user.email}
                        </p>
                        <button className="mt-10 btn btn-primary" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </UserDrawer>
    );
}

export default Profile;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppProvider";
import { useAuthContext } from "../../context/AuthProvider";
import { BsCoin } from "react-icons/bs";
import { db } from "../../firebase";
import { query, collection, getDocs } from "firebase/firestore";

const GetCardModal = ({ open, close, card }) => {
    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className={`modal ${open && "modal-open"}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Get Card</h3>
                    <p className="py-4">seri: {card.seri}</p>
                    <p className="py-4">code: {card.code}</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn" onClick={close}>
                            Đóng
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};
function Profile() {
    const user = useSelector((state) => state.authSlice.user);
    const { setTitle } = useAppContext();
    const { handleLogout } = useAuthContext();
    const [card, setCard] = useState({
        seri: "",
        code: "",
    });
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        setTitle("Thông tin cá nhân");
    });

    const getCard = async () => {
        const q = query(collection(db, "card"));
        const snapdata = await getDocs(q);
        console.log(snapdata.docs[0].data());
        setCard({
            seri: snapdata.docs[0].data().seri,
            code: snapdata.docs[0].data().code,
        });
        setOpenModal(true);
    };
    return (
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
                    <p className="lg:text-3xl text-lg font-bold text-primary">{user.displayName}</p>

                    <p className="text-base md:text-lg mt-10">Email:{user.email}</p>
                    <p className="text-base md:text-lg mt-10 flex flex-row items-center">
                        Coin: {user.coin} <BsCoin className="text-yellow-400 text-xl ml-3" />
                    </p>
                    <p className="text-base md:text-lg mt-10">Chức vụ: {user.role}</p>
                    {user.role === "ADMIN" && (
                        <Link className="mt-10 btn btn-primary mr-3" to="/admin">
                            Go to admin page
                        </Link>
                    )}
                    {user.role !== "ADMIN" && (
                        <Link className="mt-10 btn btn-primary mr-3" to="/addcoin">
                            Nạp coin
                        </Link>
                    )}
                    <label htmlFor="my-modal" onClick={getCard} className="mt-10 btn btn-primary mr-3">
                        Get Card
                    </label>
                    <button className="mt-10 btn btn-primary" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            <GetCardModal open={openModal} close={() => setOpenModal(false)} card={card} />
        </div>
    );
}

export default Profile;

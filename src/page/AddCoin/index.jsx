import {
    collection,
    where,
    getDocs,
    query,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase";
import { setUser } from "../../redux/authSlice";
import AddCoinModal from "../../components/modal/AddCoin";

function AddCoin() {
    const [seri, setSeri] = useState("");
    const [code, setCode] = useState("");
    const user = useSelector((state) => state.authSlice.user);
    const userRef = doc(db, "users", user.uid);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: "1",
        descriptions: "",
    });
    const closeModal = useCallback(() => setIsOpenModal(false), []);

    const nap_coin = async () => {
        setLoading(true);
        const q = query(
            collection(db, "card"),
            where("seri", "==", seri),
            where("code", "==", code)
        );
        const snapdata = await getDocs(q);
        if (snapdata.docs.length > 0) {
            const data = snapdata.docs[0];
            await updateDoc(userRef, {
                coin: +user.coin + data.data().value,
            });
            await deleteDoc(doc(db, "card", data.id));
            dispatch(
                setUser({ ...user, coin: +user.coin + +data.data().value })
            );
            setModalContent({
                title: "Nạp coin Thành công",
                descriptions: `Bạn vừa nạp thành công: ${
                    data.data().value
                } coin`,
            });
            setIsOpenModal(true);
        } else {
            setModalContent({
                title: "Nạp coin thất bại",
                descriptions:
                    "Mã thẻ không hợp lệ hoặc đã được sử dụng vui lòng kiểm tra lại",
            });
            setIsOpenModal(true);
        }
        setLoading(false);
    };

    return (
        <div className="container p-8">
            <div className="flex flex-col">
                <div className="form-control p-2">
                    <input
                        value={seri}
                        onChange={(e) => setSeri(e.target.value)}
                        type="text"
                        placeholder="Seri"
                        className="input w-full max-w-xs input-bordered input-primary"
                    />
                </div>
                <div className="form-control p-2">
                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        type="text"
                        placeholder="code"
                        className="input w-full max-w-xs input-bordered input-primary"
                    />
                </div>
            </div>
            <button
                className={`btn btn-primary ml-2 ${loading && "loading"}`}
                onClick={nap_coin}
            >
                {loading ? "Đang xử lý" : "Nạp"}
            </button>
            <AddCoinModal
                isOpen={isOpenModal}
                closeModal={closeModal}
                content={modalContent}
            />
        </div>
    );
}

export default AddCoin;

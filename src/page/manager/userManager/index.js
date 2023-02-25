import { getDocs, collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth, db } from "../../../firebase/";
import { Link, useLoaderData } from "react-router-dom";
import { useAppContext } from "../../../context/AppProvider";
import UserInfoModal from "../../../components/modal/userInfoModal";

export const historyLoader = async () => {
    const arr = [];
    const querySnapshot = await getDocs(collection(db, `histories/${auth.currentUser.uid}/exam`));
    querySnapshot.forEach((doc) => {
        arr.push(doc.data());
    });
    return arr;
};

function UserManager() {
    const [listUser, setListUser] = useState([]);

    const { setTitle } = useAppContext();

    useEffect(() => {
        setTitle("Quản lý tài khoản");
    });
    function timestampToDate(timestamp) {
        const date = new Date(timestamp);
        const day = `0${date.getDate()}`.slice(-2);
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const year = date.getFullYear();
        const hour = `0${date.getHours()}`.slice(-2);
        const minute = `0${date.getMinutes()}`.slice(-2);
        return `${day}/${month}/${year} ${hour}:${minute}`;
    }

    useEffect(() => {
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userArr = [];
            querySnapshot.forEach((doc) => {
                userArr.push(doc.data());
            });
            setListUser(userArr);
        });
        return () => unsubscribe();
    }, []);

    const [userSelected, setUserSelected] = useState();
    return (
        <div>
            <div className="container p-8">
                <div className="overflow-x-auto">
                    <table className="table w-full table-compact">
                        <thead className="text-left">
                            <tr>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-left">
                            {listUser?.map((item) => (
                                <tr key={item?.uid}>
                                    <th className="text-left flex items-center">
                                        <div className={`avatar `}>
                                            <img
                                                src={item.photoURL}
                                                alt="user_img"
                                                className="rounded-full"
                                            />
                                        </div>
                                        <span className="ml-2">{item?.displayName}</span>
                                    </th>
                                    <th>{item?.email}</th>
                                    <td>
                                        <span
                                            className={`${
                                                item?.status === "online"
                                                    ? "badge badge-primary"
                                                    : "badge badge-secondary"
                                            }`}
                                        >
                                            {item?.status ?? "offline"}
                                        </span>
                                    </td>

                                    <td>
                                        <label
                                            onClick={() => setUserSelected(item)}
                                            htmlFor="my-modal"
                                            className="btn btn-ghost text-primary"
                                        >
                                            Xem chi tiết
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <UserInfoModal user={userSelected} />
        </div>
    );
}

export default UserManager;

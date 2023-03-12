/* eslint-disable react-hooks/exhaustive-deps */
import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppProvider";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../redux/authSlice";

function timestampToDate(timestamp) {
    const date = new Date(timestamp);
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    const hour = `0${date.getHours()}`.slice(-2);
    const minute = `0${date.getMinutes()}`.slice(-2);
    return `${day}/${month}/${year} ${hour}:${minute}`;
}

function ExamHistory() {
    const [examHistory, setExamHistory] = useState([]);

    const { setTitle } = useAppContext();

    useEffect(() => {
        setTitle("Lịch sử làm bài");
    }, []);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageLoading(10));
        const historyLoader = async () => {
            const arr = [];
            const querySnapshot = await getDocs(collection(db, `histories/${auth.currentUser.uid}/exam`));
            dispatch(setPageLoading(50));
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
            setExamHistory(arr);
            dispatch(setPageLoading(100));
        };

        historyLoader();
    }, []);
    return (
        <div>
            <div className="p-8 flex flex-row justify-center">
                <div className="overflow-x-auto">
                    <table className="table w-full table-compact">
                        <thead className="text-center">
                            <tr>
                                <th>Tên bài thi</th>
                                <th>Thời gian</th>
                                <th>Số câu hỏi</th>
                                <th>Số câu trả lời đúng</th>
                                <th>Điểm</th>
                                <th>Ngày</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {examHistory
                                .sort((a, b) => b.startAt - a.startAt)
                                ?.map((item) => (
                                    <tr key={item.id}>
                                        <th className="text-left">{item.examName}</th>
                                        <th>{item.time} phút</th>
                                        <td>{item?.questions.length}</td>
                                        <td>{item?.correctAnswer}</td>
                                        <td>{item?.score}</td>
                                        <td>{timestampToDate(item.startAt * 1000)}</td>
                                        <td>
                                            {!item.isDone ? (
                                                <p className="badge badge-secondary hover:">Đang làm</p>
                                            ) : (
                                                <Link
                                                    className="btn btn-ghost text-primary"
                                                    to={`/descriptions/${item.id}`}
                                                >
                                                    Xem chi tiết
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ExamHistory;

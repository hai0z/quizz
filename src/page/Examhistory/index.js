import { getDocs, collection } from "firebase/firestore";
import React, { useEffect } from "react";
import { auth, db } from "../../firebase";
import { Link, useLoaderData } from "react-router-dom";
import { useAppContext } from "../../context/AppProvider";

export const historyLoader = async () => {
    const arr = [];
    const querySnapshot = await getDocs(collection(db, `histories/${auth.currentUser.uid}/exam`));
    querySnapshot.forEach((doc) => {
        arr.push(doc.data());
    });
    return arr;
};

function ExamHistory() {
    const examHistory = useLoaderData();

    const { setTitle } = useAppContext();

    useEffect(() => {
        setTitle("Lịch sử làm bài");
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

    return (
        <div>
            <div className="container p-8">
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
                            {examHistory?.map((item) => (
                                <tr key={item.id}>
                                    <th className="text-left">{item.examName}</th>
                                    <th>{item.time} phút</th>
                                    <td>{item?.questions.length}</td>
                                    <td>{item?.correctAnswer}</td>
                                    <td>{item?.score}</td>
                                    <td>{timestampToDate(item.startAt * 1000)}</td>
                                    <td>
                                        <Link
                                            className="btn btn-ghost text-primary"
                                            to={`/descriptions/${item.id}`}
                                        >
                                            Xem chi tiết
                                        </Link>
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

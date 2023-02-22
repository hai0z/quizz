import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Drawer from "../../components/Drawer/UserDrawer";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
function ExamHistory() {
    const user = useSelector((state) => state.authSlice.user);
    const [examHistory, setExamHistory] = useState();

    useEffect(() => {
        const getData = async () => {
            const arr = [];
            const querySnapshot = await getDocs(collection(db, `histories/${user.uid}/exam`));
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
            setExamHistory(arr);
        };
        getData();
    }, [user.uid]);

    return (
        <div>
            <Drawer>
                <div className="container p-8">
                    <div className="overflow-x-auto">
                        <table className="table w-full table-compact">
                            <thead className="text-center">
                                <tr>
                                    <th>Tên bài thi</th>
                                    <th>Số câu hỏi</th>
                                    <th>Số câu trả lời đúng</th>
                                    <th>Điểm</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {examHistory?.map((item) => (
                                    <tr key={item.id}>
                                        <th className="text-left">{item.examName}</th>
                                        <td>{item?.questions.length}</td>
                                        <td>{item?.correctAnswer}</td>
                                        <td>{item?.score}</td>
                                        <td>
                                            <Link
                                                className="btn btn-ghost"
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
            </Drawer>
        </div>
    );
}

export default ExamHistory;

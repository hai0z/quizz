import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ExamResult() {
    const [examRs, setExamRs] = useState();
    const user = useSelector((state) => state.authSlice.user);
    const { id } = useParams();

    useEffect(() => {
        const getResult = async () => {
            const examRef = doc(db, "histories", `${user.uid}/exam/${id}`);
            const docSnap = await getDoc(examRef);
            if (docSnap.exists()) {
                setExamRs(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };
        getResult();
    }, [id, user.uid]);
    return (
        <div>
            <div className="container p-8">
                <div className="overflow-x-auto">
                    <table className="table w-full">
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
                            <tr>
                                <th>{examRs?.examName}</th>
                                <td>{examRs?.questions.length}</td>
                                <td>{examRs?.correctAnswer}</td>
                                <td>{examRs?.score}</td>
                                <td>
                                    <Link to={`/descriptions/${id}`}>Xem chi tiết</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ExamResult;

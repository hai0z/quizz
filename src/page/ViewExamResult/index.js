import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Drawer from "../../components/Drawer/UserDrawer";
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
            <Drawer>
                <div className="container p-8">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="text-center">
                                <tr>
                                    <th>Name</th>
                                    <th>Number of questions</th>
                                    <th>Correct answers</th>
                                    <th>Score</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                <tr>
                                    <th>Exam1</th>
                                    <td>{examRs?.questions.length}</td>
                                    <td>{examRs?.correctAnswer}</td>
                                    <td>{examRs?.score}</td>
                                    <td>
                                        <Link to={`/descriptions/${id}`}>View</Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default ExamResult;

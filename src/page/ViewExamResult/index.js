import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Drawer from "../../components/Drawer";
import Navbar from "../../components/Navbar";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
function ExamResult() {
    const [examRs, setExamRs] = useState();
    useEffect(() => {
        const getResult = async () => {
            const examRef = doc(db, "histories", "user1/exam/exam1");
            const docSnap = await getDoc(examRef);
            if (docSnap.exists()) {
                setExamRs(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };
        getResult();
    }, []);
    console.log(examRs);
    return (
        <div className="bg-white ">
            <Navbar />
            <Drawer>
                <div className="flex justify-center items-center mt-20">
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
                                        <Link to="/">View</Link>
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

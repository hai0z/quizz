import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { db } from "../../firebase";
function RandomExam() {
    const [examName, setExamName] = useState();
    const [numberQuestion, setNumberQuestion] = useState();
    const [time, setTime] = useState();

    const examRef = collection(db, "exams");

    const makeExam = async () => {
        try {
            const arr = [];
            const querySnapshot = await getDocs(collection(db, "questions"));
            querySnapshot.forEach((doc) => {
                arr.push({ ...doc.data(), id: doc.id });
            });
            await addDoc(examRef, {
                time,
                examName,
                questions: [...arr].sort(() => -0.5 + Math.random()).slice(0, numberQuestion),
            });
        } catch (error) {
            throw error;
        }
    };

    return (
        <div>
            <Navbar />

            <div className="container flex flex-col  p-8">
                <div className="form-control">
                    <label htmlFor="" className="p-2 font-bold">
                        Tên bài thi
                    </label>
                    <input
                        type="text"
                        className="input w-full max-w-md input-primary"
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col ">
                    <div className="form-control">
                        <label htmlFor="" className="p-2 font-bold">
                            Số câu hỏi
                        </label>
                        <input
                            type="text"
                            className="input w-full max-w-md input-primary"
                            value={numberQuestion}
                            onChange={(e) => setNumberQuestion(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="" className="p-2 font-bold">
                            Thời gian
                        </label>
                        <input
                            type="text"
                            className="input w-full max-w-md input-primary"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="container px-8">
                <button className="btn btn-primary w-36" onClick={makeExam}>
                    add
                </button>
            </div>
        </div>
    );
}

export default RandomExam;

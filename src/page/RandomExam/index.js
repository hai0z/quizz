import { addDoc, collection, getDocs, where } from "firebase/firestore";
import React, { useState } from "react";
import Drawer from "../../components/Drawer/AdminDrawer";
import { db } from "../../firebase";
function RandomExam() {
    const [examName, setExamName] = useState();
    const [numberQuestion, setNumberQuestion] = useState();
    const [time, setTime] = useState();
    const [subject, setSubject] = useState();

    const examRef = collection(db, "exams", `${subject}/exam`);

    const makeExam = async () => {
        try {
            const arr = [];
            const querySnapshot = await getDocs(
                collection(db, `questions/${subject}/questions`),
                where("subject", "==", subject)
            );

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
                    <div className="form-control py-2">
                        <select
                            defaultValue={"DEFAULT"}
                            className="select w-full max-w-xs select-primary"
                            onChange={(e) => setSubject(e.target.value)}
                        >
                            <option disabled selected value="DEFAULT">
                                Chọn môn học
                            </option>
                            <option value={"math"}>Toán</option>
                            <option value={"physic"}>Lý</option>
                            <option value={"english"}>Anh</option>
                        </select>
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

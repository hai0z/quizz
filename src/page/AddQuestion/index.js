import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import Drawer from "../../components/Drawer/AdminDrawer";
import { db } from "../../firebase";
function AddQuestion() {
    const [question, setQuestion] = useState("");

    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");

    const [subject, setSubject] = useState();
    const [difficult, setDifficult] = useState();
    const [correctAnswer, setCorrectAnswer] = useState();

    const addQuestion = async () => {
        try {
            const questionRef = collection(db, `questions/${subject}/questions`);
            await addDoc(questionRef, {
                question,
                answers: [answer1, answer2, answer3, answer4],
                correctAnswer,
                difficult,
                subject,
            });
        } catch (error) {
            throw error;
        }
    };
    return (
        <div>
            <div className="container flex flex-col md:flex-row p-8">
                <div className="form-control">
                    <label htmlFor="" className="p-2 font-bold">
                        Câu hỏi:{" "}
                    </label>
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        cols={30}
                        rows={10}
                        type="text"
                        className="textarea textarea-bordered textarea-lg w-full max-w-lg textarea-primary"
                    />
                </div>

                <div className="flex flex-row ml-4 flex-wrap max-w-md gap-2">
                    <div className="form-control">
                        <label htmlFor="" className="p-2 font-bold">
                            Đáp án 1
                        </label>
                        <input
                            type="text"
                            className="input w-full max-w-md input-primary"
                            value={answer1}
                            onChange={(e) => setAnswer1(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="" className="p-2 font-bold">
                            Đáp án 2
                        </label>
                        <input
                            type="text"
                            className="input w-full max-w-md input-primary"
                            value={answer2}
                            onChange={(e) => setAnswer2(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="" className="p-2 font-bold">
                            Đáp án 3
                        </label>
                        <input
                            type="text"
                            className="input w-full max-w-md input-primary"
                            value={answer3}
                            onChange={(e) => setAnswer3(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="" className="p-2 font-bold">
                            Đáp án 4
                        </label>
                        <input
                            type="text"
                            className="input w-full max-w-md input-primary"
                            value={answer4}
                            onChange={(e) => setAnswer4(e.target.value)}
                        />
                    </div>
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
                    <select
                        defaultValue={"DEFAULT"}
                        className="select w-full max-w-xs select-primary "
                        onChange={(e) => setDifficult(e.target.value)}
                    >
                        <option disabled selected value="DEFAULT">
                            Chọn độ khó
                        </option>
                        <option value={"easy"}>Dễ</option>
                        <option value={"medium"}>Trung bình</option>
                        <option value={"hard"}>Khó</option>
                    </select>
                    <div className="form-control">
                        <label htmlFor="" className="p-2 font-bold">
                            Đáp án đúng
                        </label>
                        <input
                            type="text"
                            className="input w-full max-w-md input-primary"
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="container px-8">
                <button className="btn btn-primary w-36" onClick={addQuestion}>
                    add
                </button>
            </div>
        </div>
    );
}

export default AddQuestion;

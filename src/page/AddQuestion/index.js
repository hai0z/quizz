import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { db } from "../../firebase";
function AddQuestion() {
    const [question, setQuestion] = useState("");

    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");

    const [correctAnswer, setCorrectAnswer] = useState();

    const addQuestion = async () => {
        try {
            const questionRef = collection(db, "questions");
            await addDoc(questionRef, {
                question,
                answers: [answer1, answer2, answer3, answer4],
                correctAnswer,
            });
        } catch (error) {
            throw error;
        }
    };
    return (
        <div>
            <Navbar />
            <div className="alert shadow-lg mt-2 max-w-md mx-8">
                <div>
                    <span>12 unread messages. Tap to see.</span>
                </div>
            </div>
            <div className="container flex flex-row items-center p-8">
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
                <div className="flex flex-col ml-4">
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
                    <div>
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

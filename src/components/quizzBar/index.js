import React, { useEffect, useState } from "react";
import Drawer from "../Drawer";
import Navbar from "../Navbar";
import { onSnapshot, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
function QuizzBar(_props) {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [listQuestions, setListQuestions] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "exams", "user1/exam/exam1"), (doc) => {
            setListQuestions({ ...doc.data() });
        });
        return () => unsub();
    }, []);

    const chooseAnswer = async (questionId, choice) => {
        const l = {
            ...listQuestions,
            questions: listQuestions.questions.map((q) =>
                q.id === questionId ? { ...q, yourChoice: choice } : q
            ),
        };

        const examRef = doc(db, "exams", "user1/exam/exam1");
        await setDoc(examRef, l);
    };
    const finished = async () => {
        const pointPerQuestion = 10 / listQuestions.questions.length;
        const score =
            listQuestions.questions.filter((q) => q.correctAnswer === q.yourChoice).length *
            pointPerQuestion;
        const correctAnswer =
            listQuestions.questions.filter((q) => q.correctAnswer === q.yourChoice).length +
            "/" +
            listQuestions.questions.length;
        const historyRef = doc(db, "histories", "user1/exam/exam1");
        await setDoc(historyRef, { ...listQuestions, score, correctAnswer });

        navigate("/examResult");
    };
    return (
        <div className="bg-white">
            <Navbar />
            <Drawer>
                <div className="flex">
                    <div className="w-9/12 min-h-screen bg-white p-10">
                        <p className="text-black">Câu {currentQuestion}:</p>
                        <p className="text-lg text-black">
                            {listQuestions?.questions[currentQuestion - 1].question}
                        </p>

                        <div className="flex flex-col gap-5 mt-3">
                            {listQuestions?.questions[currentQuestion - 1].answers.map((q, i) => {
                                return (
                                    <div className="flex flex-row py-3" key={i}>
                                        <input
                                            onChange={(e) =>
                                                chooseAnswer(
                                                    listQuestions.questions[currentQuestion - 1].id,
                                                    e.target.value
                                                )
                                            }
                                            type="radio"
                                            name="radio-10"
                                            className="radio radio-primary mr-4"
                                            value={q}
                                            checked={
                                                listQuestions.questions[currentQuestion - 1]
                                                    .yourChoice === q
                                            }
                                        />
                                        <span className="text-black">{q}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-3/12 bg-teal-700 flex-col flex pt-5">
                        <div className="pl-4 mb-5 ">
                            <p className="text-white">
                                Số câu đã làm:{" "}
                                {listQuestions?.questions.filter((q) => q.yourChoice !== "").length}
                                / {listQuestions?.questions.length}
                            </p>
                        </div>
                        <div className="flex flex-row justify-evenly">
                            {Array.from({ length: listQuestions?.questions.length }).map(
                                (_, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setCurrentQuestion(index + 1)}
                                        className={`${
                                            currentQuestion === Number(index + 1)
                                                ? "btn btn-primary"
                                                : "btn btn-outline"
                                        } `}
                                    >
                                        Câu {index + 1}
                                    </div>
                                )
                            )}
                        </div>
                        <div className="text-center mt-14 ">
                            <button className="btn btn-success" onClick={finished}>
                                Nộp bài
                            </button>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default QuizzBar;

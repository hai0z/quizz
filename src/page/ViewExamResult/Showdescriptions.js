import React, { useEffect, useState } from "react";
import Drawer from "../../components/Drawer";
import Navbar from "../../components/Navbar";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
function ShowDescription(_props) {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [listQuestions, setListQuestions] = useState();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "histories", "user1/exam/exam1"), (doc) => {
            setListQuestions({ ...doc.data() });
        });
        return () => unsub();
    }, []);

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
                                            type="radio"
                                            name="radio-10"
                                            className="radio radio-primary mr-4"
                                            value={q}
                                            checked={
                                                listQuestions.questions[currentQuestion - 1]
                                                    .yourChoice === q
                                            }
                                        />
                                        <div className="flex flex-row">
                                            <span className="text-black"> {q}</span>
                                            {listQuestions.questions[currentQuestion - 1]
                                                .yourChoice !== q &&
                                                q ===
                                                    listQuestions?.questions[currentQuestion - 1]
                                                        .correctAnswer && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6 text-green-600 ml-10"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                )}
                                        </div>
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
                            {listQuestions?.questions.map((_, index) => (
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
                            ))}
                        </div>
                        <div className="text-center mt-5 ">
                            <Link to="/examResult" className="text-white hover:text-yellow-400 ">
                                Go back
                            </Link>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default ShowDescription;

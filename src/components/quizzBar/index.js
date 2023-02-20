import React, { useEffect, useState } from "react";
import Drawer from "../Drawer";
import { onSnapshot, doc, setDoc, query, collection } from "firebase/firestore";
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
        // const q = query(collection(db, "questions"))
        // const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //     const questions = {
        //         time: 15,
        //         questions: [],
        //     }
        //     querySnapshot.forEach((doc) => {
        //         questions.questions.push({ ...doc.data(), id: doc.id })
        //     })
        //     setListQuestions(questions)
        // })
        // return () => unsubscribe()
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
        const score = (
            listQuestions.questions.filter((q) => q.correctAnswer === q.yourChoice).length *
            pointPerQuestion
        ).toFixed(2);
        const correctAnswer =
            listQuestions.questions.filter((q) => q.correctAnswer === q.yourChoice).length +
            "/" +
            listQuestions.questions.length;
        const l = {
            ...listQuestions,
            questions: listQuestions.questions.map((q) => {
                const { flag, ...rest } = q;
                return rest;
            }),
        };
        const l1 = {
            ...listQuestions,
            questions: listQuestions.questions.map((q) => {
                const { flag, yourChoice, ...rest } = q;
                return rest;
            }),
        };
        const examRef = doc(db, "exams", "user1/exam/exam1");
        const historyRef = doc(db, "histories", "user1/exam/exam1");
        await setDoc(historyRef, { ...l, score, correctAnswer });
        await setDoc(examRef, { ...l1 });

        navigate("/examResult");
    };
    const toggleFlag = async (questionId) => {
        const l = {
            ...listQuestions,
            questions: listQuestions.questions.map((q) =>
                q.id === questionId ? { ...q, flag: !q.flag ?? true } : q
            ),
        };
        const examRef = doc(db, "exams", "user1/exam/exam1");
        await setDoc(examRef, l);
    };

    return (
        <div>
            <Drawer>
                <div className="flex min-h-screen">
                    <div className="w-9/12 p-10">
                        <p>Câu {currentQuestion}:</p>
                        <p className="text-lg ">
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
                                        <span className="">{q}</span>
                                    </div>
                                );
                            })}
                            <div className="flex flex-row">
                                <span className=" mr-2 ">Phân vân</span>
                                <svg
                                    onClick={() =>
                                        toggleFlag(listQuestions.questions[currentQuestion - 1].id)
                                    }
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className={`w-6 h-6 ${
                                        listQuestions?.questions[currentQuestion - 1].flag &&
                                        "text-red-600"
                                    } cursor-pointer`}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-3/12 flex-col flex pt-5 shadow-md">
                        <div className="pl-4 mb-5 ">
                            <p>
                                Số câu đã làm:{" "}
                                {listQuestions?.questions.filter((q) => !!q.yourChoice).length}/{" "}
                                {listQuestions?.questions.length}
                            </p>
                        </div>
                        <div className="px-2 py-2">
                            <span className="ml-2">Lọc</span>
                            <select className="select select-bordered w-full max-w-xs select-sm ml-2">
                                <option selected>Tất cả</option>
                                <option>Đã làm</option>
                                <option>Chưa làm</option>
                                <option>Gắn cờ</option>
                            </select>
                        </div>
                        <div className="flex flex-row gap-2 flex-wrap justify-center">
                            {listQuestions?.questions.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setCurrentQuestion(index + 1)}
                                    className={`${
                                        currentQuestion === Number(index + 1) && "btn btn-primary"
                                    } ${item.yourChoice ? "btn btn-primary" : "btn btn-outline"}`}
                                >
                                    Câu {index + 1}{" "}
                                    {item?.flag && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="text-red-600 h-4 w-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                                            />
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-14 ">
                            <button className="btn" onClick={finished}>
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

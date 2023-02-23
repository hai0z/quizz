import React, { useEffect, useState } from "react";
import Drawer from "../../components/Drawer/UserDrawer";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function ShowDescription(_props) {
    const [currentQuestion, setCurrentQuestion] = useState(1);

    const [listQuestions, setListQuestions] = useState();

    const user = useSelector((state) => state.authSlice.user);

    const { id } = useParams();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "histories", `${user.uid}/exam/${id}`), (doc) => {
            setListQuestions({ ...doc.data() });
        });
        return () => unsub();
    }, [user, id]);

    return (
        <div>
            <Drawer>
                <div className="flex min-h-screen flex-col md:flex-row">
                    {/* mobile */}
                    <div className="flex md:hidden h-16 w-full overflow-x-scroll shadow-md items-center gap-3  my-2 px-4">
                        {listQuestions?.questions.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrentQuestion(index + 1)}
                                className={`${
                                    currentQuestion === Number(index + 1) && "btn btn-primary"
                                } ${item.yourChoice ? "btn btn-primary" : "btn btn-outline"} w-24`}
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
                    <div className="w-9/12 min-h-screen p-10">
                        <p className="">Câu {currentQuestion}:</p>
                        <p className="text-lg ">
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
                                            <span className=""> {q}</span>
                                            {listQuestions.questions[currentQuestion - 1]
                                                .yourChoice === q &&
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
                                            {listQuestions.questions[currentQuestion - 1]
                                                .yourChoice === q &&
                                                q !==
                                                    listQuestions?.questions[currentQuestion - 1]
                                                        .correctAnswer && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6 ml-10 text-red-500"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-3/12 flex-col pt-5 shadow-md  hidden md:flex">
                        <div className="pl-4 mb-5 ">
                            <p>
                                Số câu đã làm:{" "}
                                {listQuestions?.questions.filter((q) => !!q.yourChoice).length}/{" "}
                                {listQuestions?.questions.length}
                            </p>
                        </div>
                        <div className="grid grid-flow-row grid-cols-2 gap-3 lg:grid-cols-3 mx-2">
                            {listQuestions?.questions.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => setCurrentQuestion(index + 1)}
                                    className={`${
                                        currentQuestion === Number(index + 1)
                                            ? "btn btn-primary"
                                            : "btn btn-outline"
                                    } `}
                                >
                                    Câu {index + 1}{" "}
                                    {item.correctAnswer === item.yourChoice ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 text-secondary"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 text-accent"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-5 ">
                            <Link to="/history" className="btn btn-ghost">
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

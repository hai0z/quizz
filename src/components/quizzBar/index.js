import React, { useEffect, useState } from "react";
import Drawer from "../Drawer/UserDrawer";
import { onSnapshot, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Countdown from "../countdown";
import { useAppContext } from "../../context/AppProvider";
function QuizzBar(_props) {
    const { id } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(1);

    const [listQuestions, setListQuestions] = useState();

    const [filterQuestion, setFilterQuestion] = useState(listQuestions);

    const navigate = useNavigate();
    const user = useSelector((state) => state.authSlice.user);

    const { setTitle } = useAppContext();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "histories", `${user.uid}/exam/${id}`), (doc) => {
            if (doc.exists()) {
                setListQuestions({ ...doc.data(), id: doc.id });
            } else {
                navigate("/");
            }
        });
        return () => unsub();
    }, [id, user.uid]);

    useEffect(() => {
        const getData = async () => {
            const docRef = doc(db, "histories", `${user.uid}/exam/${id}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setFilterQuestion({ ...docSnap.data(), id: doc.id });
                setTitle(docSnap.data().examName);
            }
        };
        getData();
    }, [id, user.uid]);

    const chooseAnswer = async (questionId, choice) => {
        const l = {
            ...listQuestions,
            questions: listQuestions.questions.map((q) =>
                q.id === questionId ? { ...q, yourChoice: choice } : q
            ),
        };
        setFilterQuestion(l);
        const examRef = doc(db, "histories", `${user.uid}/exam/${id}`);
        await setDoc(examRef, l);
    };
    const finished = async () => {
        const pointPerQuestion = 10 / listQuestions.questions.length;

        const score = (
            listQuestions.questions.filter((q) => q.correctAnswer === q.yourChoice).length *
            pointPerQuestion
        ).toFixed(2);

        const correctAnswer =
            listQuestions.questions.filter((q) => q.correctAnswer === q.yourChoice).length ?? 0;
        const historyRef = doc(db, "histories", `${user.uid}/exam/${id}`);
        await setDoc(historyRef, { ...listQuestions, score, correctAnswer });

        navigate("/examResult/" + id);
    };
    const toggleFlag = async (questionId) => {
        const l = {
            ...listQuestions,
            questions: listQuestions.questions.map((q) =>
                q.id === questionId ? { ...q, flag: !q.flag ?? true } : q
            ),
        };
        setFilterQuestion(l);
        const examRef = doc(db, "histories", `${user.uid}/exam/${id}`);
        await setDoc(examRef, l);
    };

    const handleChangeFilter = (e) => {
        switch (e) {
            case "all":
                setFilterQuestion(listQuestions);
                setCurrentQuestion(listQuestions.questions[0].index);
                break;
            case "done":
                setFilterQuestion({
                    ...filterQuestion,
                    questions: listQuestions.questions.filter((q) => q.yourChoice),
                });
                setCurrentQuestion(listQuestions.questions.filter((q) => q.yourChoice)[0]?.index);
                break;
            case "undone":
                setFilterQuestion({
                    ...filterQuestion,
                    questions: listQuestions.questions.filter((q) => !!q.yourChoice === false),
                });
                setCurrentQuestion(
                    listQuestions.questions.filter((q) => !!q.yourChoice === false)[0]?.index
                );
                break;
            case "flag":
                setFilterQuestion({
                    ...filterQuestion,
                    questions: listQuestions.questions.filter((q) => !!q.flag),
                });
                setCurrentQuestion(listQuestions.questions.filter((q) => !!q.flag)[0]?.index);
                break;
            default:
                break;
        }
    };
    return (
        <div>
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
                <div className=" w-full md:w-9/12 px-10 py-2 ">
                    {listQuestions?.time && (
                        <Countdown minutes={listQuestions?.time} seconds={0} finished={finished} />
                    )}
                    {!!filterQuestion?.questions?.length && (
                        <div>
                            <p>Câu {currentQuestion}:</p>
                            <p className="text-lg ">
                                {listQuestions?.questions[currentQuestion - 1]?.question}
                            </p>
                            <div className="flex flex-col gap-5 mt-3">
                                {listQuestions?.questions[currentQuestion - 1]?.answers.map(
                                    (q, i) => {
                                        return (
                                            <div className="flex flex-row py-3" key={i}>
                                                <input
                                                    onChange={(e) =>
                                                        chooseAnswer(
                                                            listQuestions.questions[
                                                                currentQuestion - 1
                                                            ]?.id,
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
                                    }
                                )}
                                {!!filterQuestion?.question >= 0 && (
                                    <div className="flex flex-row">
                                        <span className=" mr-2 ">Phân vân</span>
                                        <svg
                                            onClick={() =>
                                                toggleFlag(
                                                    listQuestions.questions[currentQuestion - 1].id
                                                )
                                            }
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className={`w-6 h-6 ${
                                                listQuestions?.questions[currentQuestion - 1]
                                                    ?.flag && "text-red-600"
                                            } cursor-pointer`}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-3/12 flex-col  pt-5 shadow-md hidden md:flex">
                    <div className="pl-4 mb-5 ">
                        <p>
                            Số câu đã làm:{" "}
                            {listQuestions?.questions.filter((q) => !!q.yourChoice).length}/{" "}
                            {listQuestions?.questions.length}
                        </p>
                    </div>
                    <div className="px-2">
                        <span className="ml-2 block mb-2">Lọc</span>
                        <select
                            className="select select-bordered w-full max-w-xs select-sm ml-2 mb-2"
                            onChange={(e) => handleChangeFilter(e.target.value)}
                        >
                            <option selected value={"all"}>
                                Tất cả
                            </option>
                            <option value={"done"}>Đã làm</option>
                            <option value={"undone"}>Chưa làm</option>
                            <option value={"flag"}>Phân vân</option>
                        </select>
                    </div>
                    <div className="grid grid-flow-row grid-cols-2 gap-3 xl:grid-cols-3 mx-2">
                        {filterQuestion?.questions.map((item) => (
                            <div
                                key={item.index}
                                onClick={() => setCurrentQuestion(item.index)}
                                className={`${
                                    currentQuestion === Number(item.index)
                                        ? "btn-primary"
                                        : "btn-secondary"
                                }  w-24 lg:w-20 btn `}
                            >
                                Câu {item.index}{" "}
                                {item?.flag && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="text-error h-4 w-4 ml-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                                        />
                                    </svg>
                                )}
                                {item?.yourChoice && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 text-secondary-content"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
        </div>
    );
}

export default QuizzBar;

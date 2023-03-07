/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPageLoading } from "../../redux/authSlice";

const Questions = ({ item, onClick, currentQuestion }) => {
    return (
        <div
            onClick={() => onClick(item.index)}
            className={`${
                currentQuestion === item.index
                    ? "btn btn-primary"
                    : "btn btn-secondary"
            }  w-24 lg:w-20 md:w-18`}
        >
            Câu {item.index}
            {item.correctAnswer === item.yourChoice ? (
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
            ) : !!item.yourChoice === false ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-success-content"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            )}
        </div>
    );
};
const Filter = ({ handleChangeFilter }) => {
    return (
        <select
            defaultValue={"all"}
            className="select select-bordered w-full max-w-md select-sm mb-2"
            onChange={(e) => handleChangeFilter(e.target.value)}
        >
            <option value={"all"}>Tất cả</option>
            <option value={"correct"}>Đúng</option>
            <option value={"incorrect"}>Sai</option>
            <option value={"uncompleted"}>Chưa làm</option>
        </select>
    );
};
function ShowDescription(_props) {
    const [currentQuestion, setCurrentQuestion] = useState(1);

    const [listQuestions, setListQuestions] = useState();

    const [filterQuestion, setFilterQuestion] = useState();

    const handleChangeFilter = (filterCase) => {
        switch (filterCase) {
            case "all":
                setFilterQuestion(listQuestions);
                setCurrentQuestion(listQuestions.questions[0].index);
                break;
            case "correct":
                setFilterQuestion({
                    ...filterQuestion,
                    questions: listQuestions.questions.filter(
                        (q) => q.yourChoice === q.correctAnswer
                    ),
                });
                setCurrentQuestion(
                    listQuestions.questions.filter(
                        (q) => q.yourChoice === q.correctAnswer
                    )[0]?.index
                );
                break;
            case "incorrect":
                setFilterQuestion({
                    ...filterQuestion,
                    questions: listQuestions.questions.filter(
                        (q) =>
                            q.yourChoice !== q.correctAnswer && !!q.yourChoice
                    ),
                });
                setCurrentQuestion(
                    listQuestions.questions.filter(
                        (q) =>
                            q.yourChoice !== q.correctAnswer && !!q.yourChoice
                    )[0]?.index
                );
                break;
            case "uncompleted":
                setFilterQuestion({
                    ...filterQuestion,
                    questions: listQuestions.questions.filter(
                        (q) => !!q.yourChoice === false
                    ),
                });
                setCurrentQuestion(
                    listQuestions.questions.filter(
                        (q) => !!q.yourChoice === false
                    )[0]?.index
                );
                break;
            default:
                break;
        }
    };
    const { id } = useParams();
    const dispatch = useDispatch();
    const containerRef = React.useRef(null);

    useEffect(() => {
        dispatch(setPageLoading(10));
        const examResultLoader = async () => {
            const examRef = doc(
                db,
                "histories",
                `${auth?.currentUser?.uid}/exam/${id}`
            );
            const docSnap = await getDoc(examRef);
            dispatch(setPageLoading(60));
            if (docSnap.exists()) {
                setListQuestions({ ...docSnap.data() });
                setFilterQuestion({ ...docSnap.data() });
            }
            dispatch(setPageLoading(100));
        };
        examResultLoader();
    }, []);

    const handleNextQuestion = (currentQuestion) => {
        if (currentQuestion >= listQuestions?.questions.length) {
            return;
        } else {
            containerRef.current.scrollTo({
                left: 90 + currentQuestion * 28,
                behavior: "smooth",
            });
            setCurrentQuestion(currentQuestion + 1);
        }
    };
    const handlePrevQuestion = (currentQuestion) => {
        if (currentQuestion <= 1) {
            return;
        } else {
            containerRef.current.scrollTo({
                left: -90 + currentQuestion * 28,
                behavior: "smooth",
            });
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <div>
            <div className="flex min-h-screen flex-col md:flex-row">
                {/* mobile */}
                <div className="flex flex-col md:hidden mt-1">
                    <div className="flex flex-row justify-between">
                        <p className="ml-4 text-base">
                            Số câu đã làm:{" "}
                            {
                                listQuestions?.questions.filter(
                                    (q) => !!q.yourChoice
                                ).length
                            }
                            / {listQuestions?.questions.length}
                        </p>
                        <div className="px-2">
                            <Filter handleChangeFilter={handleChangeFilter} />
                        </div>
                    </div>
                    <div
                        className="flex md:hidden h-16 w-full overflow-x-scroll shadow-md items-center gap-3 px-4 my-1 pb-1"
                        ref={containerRef}
                    >
                        {filterQuestion?.questions.map((item, index) => (
                            <Questions
                                key={index}
                                item={item}
                                currentQuestion={currentQuestion}
                                onClick={(questionIndex) =>
                                    setCurrentQuestion(questionIndex)
                                }
                            />
                        ))}
                    </div>
                </div>
                {/* main */}
                <div className=" w-full md:w-9/12 px-10 py-2 ">
                    {!!filterQuestion?.questions?.length && (
                        <div>
                            <p className="">Câu {currentQuestion}:</p>
                            <p className="text-lg ">
                                {
                                    listQuestions?.questions[
                                        currentQuestion - 1
                                    ].question
                                }
                            </p>

                            <div className="flex flex-col gap-5 mt-3">
                                {listQuestions?.questions[
                                    currentQuestion - 1
                                ].answers.map((q, i) => {
                                    return (
                                        <div
                                            className="flex flex-row py-3"
                                            key={i}
                                        >
                                            <input
                                                readOnly
                                                type="radio"
                                                name="radio-10"
                                                className="radio radio-primary mr-4"
                                                value={q}
                                                checked={
                                                    listQuestions.questions[
                                                        currentQuestion - 1
                                                    ].yourChoice === q
                                                }
                                            />
                                            <div className="flex flex-row">
                                                <span className=""> {q}</span>
                                                {listQuestions.questions[
                                                    currentQuestion - 1
                                                ].yourChoice === q &&
                                                    q ===
                                                        listQuestions
                                                            ?.questions[
                                                            currentQuestion - 1
                                                        ].correctAnswer && (
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
                                                {listQuestions.questions[
                                                    currentQuestion - 1
                                                ].yourChoice !== q &&
                                                    q ===
                                                        listQuestions
                                                            ?.questions[
                                                            currentQuestion - 1
                                                        ].correctAnswer && (
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
                                                {listQuestions.questions[
                                                    currentQuestion - 1
                                                ].yourChoice === q &&
                                                    q !==
                                                        listQuestions
                                                            ?.questions[
                                                            currentQuestion - 1
                                                        ].correctAnswer && (
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
                            <div className="h-16 w-full justify-between items-center flex flex-row mt-4">
                                <svg
                                    onClick={() =>
                                        handlePrevQuestion(currentQuestion)
                                    }
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className={`btn btn-primary ${
                                        currentQuestion <= 1 && "btn-disabled"
                                    }`}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                    />
                                </svg>

                                <Link
                                    to="/history"
                                    className="btn btn-primary md:hidden"
                                >
                                    Quay lại
                                </Link>

                                <svg
                                    onClick={() =>
                                        handleNextQuestion(currentQuestion)
                                    }
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className={`btn btn-primary ${
                                        currentQuestion >=
                                            listQuestions.questions.length &&
                                        "btn-disabled"
                                    }`}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
                {/* right sidebar */}
                <div className="w-3/12 flex-col pt-5 shadow-md hidden md:flex">
                    <div className="pl-4 mb-5 ">
                        <p>
                            Số câu đã làm:{" "}
                            {
                                listQuestions?.questions.filter(
                                    (q) => !!q.yourChoice
                                ).length
                            }
                            / {listQuestions?.questions.length}
                        </p>
                    </div>
                    <div className="px-2">
                        <Filter handleChangeFilter={handleChangeFilter} />
                    </div>
                    <div className="flex flex-row flex-wrap gap-4 justify-center">
                        {filterQuestion?.questions.map((item, index) => (
                            <Questions
                                key={index}
                                item={item}
                                currentQuestion={currentQuestion}
                                onClick={(questionIndex) =>
                                    setCurrentQuestion(questionIndex)
                                }
                            />
                        ))}
                    </div>
                    <div className="text-center mt-5 ">
                        <Link to="/history" className="btn btn-success">
                            Quay lại
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowDescription;

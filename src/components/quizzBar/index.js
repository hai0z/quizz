/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { onSnapshot, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Countdown from "../countdown";
import { useAppContext } from "../../context/AppProvider";
import FinishedExamModal from "../modal/finishedExamModal";
import { setPageLoading, setUser } from "../../redux/authSlice";
import { AiOutlineCheckCircle, AiOutlineFlag } from "react-icons/ai";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return { minutes, remainingSeconds };
}

const QuizzBar = () => {
    const { id } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [listQuestions, setListQuestions] = useState();
    const dispatch = useDispatch();
    const [filterQuestion, setFilterQuestion] = useState(listQuestions);
    const navigate = useNavigate();
    const user = useSelector((state) => state.authSlice.user);

    useEffect(() => {
        const unsubscribe1 = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
            dispatch(setUser({ ...doc.data() }));
        });
        return () => unsubscribe1();
    }, []);

    const { setTitle } = useAppContext();

    const [loading, setLoading] = useState(false);

    const now = new Date().getTime();
    const distance = user?.isTakingATest?.expire * 1000 - now;
    const distanceInSeconds = Math.floor(distance / 1000);

    useEffect(() => {
        if (user?.isTakingATest?.examId !== id) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "histories", `${user.uid}/exam/${id}`), (doc) => {
            if (doc.exists()) {
                setListQuestions({ ...doc.data(), id: doc.id });
            } else {
                navigate("/");
            }
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        dispatch(setPageLoading(15));
        const getData = async () => {
            const docRef = doc(db, "histories", `${user.uid}/exam/${id}`);
            const docSnap = await getDoc(docRef);
            dispatch(setPageLoading(40));
            if (docSnap.exists()) {
                setFilterQuestion({ ...docSnap.data(), id: doc.id });
                setTitle(docSnap.data().examName);
                dispatch(setPageLoading(100));
            }
        };
        getData();
    }, []);

    const chooseAnswer = async (questionId, choice) => {
        const l = {
            ...listQuestions,
            questions: listQuestions.questions.map((q) => (q.id === questionId ? { ...q, yourChoice: choice } : q)),
        };
        setFilterQuestion(l);
        const examRef = doc(db, "histories", `${user.uid}/exam/${id}`);
        await setDoc(examRef, l);
    };

    const finished = async () => {
        setLoading(true);
        const userRef = doc(db, "users", auth.currentUser.uid);
        const pointPerQuestion = 10 / listQuestions.questions.length;
        const score = (
            listQuestions.questions.filter((q) => q.correctAnswer === q.yourChoice).length * pointPerQuestion
        ).toFixed(2);

        const correctAnswer = listQuestions.questions.filter((q) => q.correctAnswer === q.yourChoice).length ?? 0;
        const historyRef = doc(db, "histories", `${user.uid}/exam/${id}`);
        await setDoc(historyRef, {
            ...listQuestions,
            score,
            correctAnswer,
            isDone: true,
        });
        await updateDoc(userRef, { isTakingATest: {} });
        navigate("/examResult/" + id);
    };

    const toggleFlag = async (questionId) => {
        const l = {
            ...listQuestions,
            questions: listQuestions.questions.map((q) => (q.id === questionId ? { ...q, flag: !q.flag ?? true } : q)),
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
                setCurrentQuestion(listQuestions.questions.filter((q) => !!q.yourChoice === false)[0]?.index);
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
    const containerRef = React.useRef(null);
    const elementRefs = React.useRef([]);
    const handleNextQuestion = (currentQuestion) => {
        if (currentQuestion >= listQuestions?.questions.length) {
            return;
        } else {
            const currentElement = elementRefs.current[currentQuestion];
            containerRef.current.scrollTo({
                left: currentElement.offsetLeft - containerRef.current.offsetLeft + containerRef.current.scrollLeft,
                behavior: "smooth",
            });
            setCurrentQuestion((prev) => prev + 1);
        }
    };
    const handlePrevQuestion = (currentQuestion) => {
        if (currentQuestion <= 1) {
            return;
        } else {
            containerRef.current.scrollTo({
                left: currentQuestion.offsetLeft - containerRef.current.offsetLeft + containerRef.current.scrollLeft,
                behavior: "smooth",
            });
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <div>
            <div className="flex min-h-screen flex-col md:flex-row">
                {/* mobile */}
                <div className="flex flex-col md:hidden mt-1">
                    <div className="flex flex-row justify-between">
                        <p className="ml-4 text-base">
                            Số câu đã làm: {listQuestions?.questions.filter((q) => !!q.yourChoice).length}/{" "}
                            {listQuestions?.questions.length}
                        </p>
                        <div className="px-2">
                            <select
                                defaultValue={"all"}
                                className="select select-bordered w-full max-w-xs select-sm ml-2 mb-2"
                                onChange={(e) => handleChangeFilter(e.target.value)}
                            >
                                <option value={"all"}>Tất cả</option>
                                <option value={"done"}>Đã làm</option>
                                <option value={"undone"}>Chưa làm</option>
                                <option value={"flag"}>Phân vân</option>
                            </select>
                        </div>
                    </div>
                    <div
                        className="flex md:hidden h-16 w-full overflow-x-scroll shadow-md items-center gap-3 px-4 my-1 pb-1"
                        ref={containerRef}
                    >
                        {filterQuestion?.questions.map((item, index) => (
                            <div
                                key={index}
                                ref={(ref) => (elementRefs.current[index] = ref)}
                                onClick={() => setCurrentQuestion(item.index)}
                                className={`${
                                    currentQuestion === item.index ? "btn btn-primary" : "btn btn-secondary"
                                }  w-24`}
                            >
                                Câu {item.index}{" "}
                                {item?.flag && <AiOutlineFlag className="w-6 h-6 text-secondary-content" />}
                                {item?.yourChoice && (
                                    <AiOutlineCheckCircle className="w-6 h-6 text-secondary-content" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* main */}
                <div className=" w-full md:w-9/12 px-10 py-2 ">
                    {listQuestions?.time && (
                        <div className="flex md:justify-end items-center">
                            <Countdown
                                minutes={formatTime(distanceInSeconds).minutes}
                                seconds={formatTime(distanceInSeconds).remainingSeconds}
                                finished={finished}
                            />
                        </div>
                    )}
                    {!!filterQuestion?.questions?.length && (
                        <div>
                            <p>Câu {currentQuestion}:</p>
                            <p className="text-lg ">{listQuestions?.questions[currentQuestion - 1]?.question}</p>
                            <div className="flex flex-col gap-5 mt-3">
                                {listQuestions?.questions[currentQuestion - 1]?.answers.map((q, i) => {
                                    return (
                                        <div className="flex flex-row py-3" key={i}>
                                            <input
                                                onChange={(e) =>
                                                    chooseAnswer(
                                                        listQuestions.questions[currentQuestion - 1]?.id,
                                                        e.target.value
                                                    )
                                                }
                                                type="radio"
                                                name="radio-10"
                                                className="radio radio-primary mr-4"
                                                value={q}
                                                checked={listQuestions.questions[currentQuestion - 1].yourChoice === q}
                                            />
                                            <span className="">{q}</span>
                                        </div>
                                    );
                                })}
                                {!!filterQuestion?.question >= 0 && (
                                    <div className="flex flex-row">
                                        <span className=" mr-2 ">Phân vân</span>
                                        <AiOutlineFlag
                                            className={`w-6 h-6 ${
                                                listQuestions?.questions[currentQuestion - 1]?.flag && "text-red-600"
                                            } cursor-pointer`}
                                            onClick={() => toggleFlag(listQuestions.questions[currentQuestion - 1].id)}
                                        />
                                    </div>
                                )}
                            </div>
                            {/* next and prev btn */}
                            <div className="h-16 w-full justify-between items-center flex flex-row mt-4">
                                <button
                                    onClick={() => handlePrevQuestion(currentQuestion)}
                                    className={`btn btn-primary ${currentQuestion <= 1 && "btn-disabled"}`}
                                >
                                    <HiChevronLeft className="text-xl" />
                                </button>
                                <label className="btn btn-success md:hidden" htmlFor="my-modal">
                                    Nộp bài
                                </label>
                                <button
                                    onClick={() => handleNextQuestion(currentQuestion)}
                                    className={`btn btn-primary ${
                                        currentQuestion >= listQuestions.questions.length && "btn-disabled"
                                    }`}
                                >
                                    <HiChevronRight className="text-xl" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {/* right side bar */}
                <div className="w-3/12 flex-col pt-5 shadow-md hidden md:flex">
                    <div className="pl-4 mb-5 ">
                        <p>
                            Số câu đã làm: {listQuestions?.questions.filter((q) => !!q.yourChoice).length}/{" "}
                            {listQuestions?.questions.length}
                        </p>
                    </div>
                    <div className="px-2">
                        <span className="ml-2 block mb-2">Lọc</span>
                        <select
                            defaultValue={"all"}
                            className="select select-bordered w-full max-w-md select-sm mb-2"
                            onChange={(e) => handleChangeFilter(e.target.value)}
                        >
                            <option value={"all"}>Tất cả</option>
                            <option value={"done"}>Đã làm</option>
                            <option value={"undone"}>Chưa làm</option>
                            <option value={"flag"}>Phân vân</option>
                        </select>
                    </div>
                    <div className="flex flex-row flex-wrap gap-4 justify-center max-h-1/3 overflow-y-scroll">
                        {filterQuestion?.questions.map((item) => (
                            <div
                                key={item.index}
                                onClick={() => setCurrentQuestion(item.index)}
                                className={`${
                                    currentQuestion === Number(item.index) ? "btn-primary" : "btn-secondary"
                                }  w-24 lg:w-20 btn`}
                            >
                                Câu {item.index} {item?.flag && <AiOutlineFlag className="text-error h-4 w-4 ml-1" />}
                                {item?.yourChoice && (
                                    <AiOutlineCheckCircle className="w-6 h-6 text-secondary-content" />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-14 ">
                        <label className="btn btn-success" htmlFor="my-modal">
                            Nộp bài
                        </label>
                    </div>
                </div>
            </div>
            <FinishedExamModal finished={finished} loading={loading} />
        </div>
    );
};

export default QuizzBar;

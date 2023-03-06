/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "./context/AppProvider";
import { onSnapshot, doc, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/authSlice";
import { useState } from "react";
import Countdown from "./components/countdown";

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return { minutes, remainingSeconds };
}

function App() {
    const listSubject = [
        {
            id: "math",
            name: "Toán học",
            img: require("./asset/math.png"),
        },
        {
            id: "physic",
            name: "Vật lý",
            img: require("./asset/relativity.png"),
        },
        {
            id: "english",
            name: "Tiếng anh",
            img: require("./asset/united-kingdom.png"),
        },
        {
            id: "morality",
            name: "Giáo dục công dân",
            img: require("./asset/morality.png"),
        },
        {
            id: "chemistry",
            name: "Hoá học",
            img: require("./asset/chemistry.png"),
        },
        {
            id: "geography",
            name: "Địa Lý",
            img: require("./asset/globe.png"),
        },
    ];
    const [listQuestions, setListQuestions] = useState();
    const { setTitle } = useAppContext();
    const navigate = useNavigate();
    useEffect(() => {
        setTitle("Trang chủ");
    });
    const user = useSelector((state) => state.authSlice.user);
    const [showAlert, setShowAlert] = useState(true);

    const dispatch = useDispatch();

    const now = new Date().getTime();
    const distance = user?.isTakingATest?.expire * 1000 - now;
    const distanceInSeconds = Math.floor(distance / 1000);

    const finished = async (listQuestions) => {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const pointPerQuestion = 10 / listQuestions.questions.length;
        const score = (
            listQuestions.questions.filter(
                (q) => q.correctAnswer === q.yourChoice
            ).length * pointPerQuestion
        ).toFixed(2);

        const correctAnswer =
            listQuestions.questions.filter(
                (q) => q.correctAnswer === q.yourChoice
            ).length ?? 0;
        const historyRef = doc(
            db,
            "histories",
            `${user.uid}/exam/${user?.isTakingATest?.examId}`
        );
        await setDoc(historyRef, {
            ...listQuestions,
            score,
            correctAnswer,
            isDone: true,
        });
        await updateDoc(userRef, { isTakingATest: {} });
    };
    useEffect(() => {
        const unsub = onSnapshot(
            doc(
                db,
                "histories",
                `${user.uid}/exam/${user?.isTakingATest?.examId}`
            ),
            (doc) => {
                setListQuestions({ ...doc.data(), id: doc.id });
            }
        );
        return () => unsub();
    }, []);

    useEffect(() => {
        const unsubscribe1 = onSnapshot(
            doc(db, "users", auth.currentUser.uid),
            (doc) => {
                dispatch(setUser({ ...doc.data() }));
            }
        );
        return () => unsubscribe1();
    }, []);

    return (
        <div className="flex justify-center items-center flex-col container">
            <div className="container  flex flex-row flex-wrap gap-8 justify-center md:justify-around p-8">
                {listSubject?.map((item) => (
                    <Link
                        to={`/exam/${item.id}`}
                        key={item.id}
                        className="card card-compact w-96 md:w-80 bg-base-200 shadow-xl cursor-pointer p-2"
                    >
                        <figure>
                            <img
                                src={item.img}
                                alt="subject"
                                className="h-52 p-4"
                            />
                        </figure>
                        <div className="card-body items-center">
                            <h2 className="card-title text-base-content drop-shadow-sm">
                                {item.name}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
            {user?.isTakingATest?.status && (
                <div
                    className={`toast toast-top toast-end mt-16 overflow-hidden`}
                    onClick={() => setShowAlert(!showAlert)}
                >
                    <div className="alert shadow-lg alert-warning bg-opacity-90 backdrop-blur-md">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="stroke-error flex-shrink-0 w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <div>
                                {user?.isTakingATest?.examName}
                                <Countdown
                                    minutes={
                                        formatTime(distanceInSeconds).minutes
                                    }
                                    seconds={
                                        formatTime(distanceInSeconds)
                                            .remainingSeconds
                                    }
                                    finished={() => finished(listQuestions)}
                                />
                            </div>
                        </div>
                        <div className="flex-none">
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={() =>
                                    navigate(
                                        "/test/" + user?.isTakingATest?.examId
                                    )
                                }
                            >
                                Tiếp tục làm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

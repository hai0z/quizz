import React, { useState } from "react";
import Drawer from "../Drawer";
import Navbar from "../Navbar";

const quizQuestions = {
    time: 15,
    questions: [
        {
            question: "What is the capital city of France?",
            answers: ["Paris", "Berlin", "London", "Madrid"],
            correctAnswer: "Paris",
            yourChoice: "",
            id: 1,
        },
        {
            question: "What year did World War II end?",
            answers: ["1945", "1939", "1950", "1960"],
            correctAnswer: "1945",
            yourChoice: "",
            id: 2,
        },
        {
            question: 'Who wrote the novel "To Kill a Mockingbird?"',
            answers: ["Harper Lee", "J.K. Rowling", "Stephen King", "Ernest Hemingway"],
            correctAnswer: "Harper Lee",
            yourChoice: "",
            id: 3,
        },
        {
            question: "What is the largest organ in the human body?",
            answers: ["Skin", "Liver", "Heart", "Brain"],
            correctAnswer: "Skin",
            yourChoice: "",
            id: 4,
        },
    ],
};

function QuizzBar(_props) {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [listQuestions, setListQuestions] = useState(quizQuestions);

    const chooseAnswer = (questionId, choice) => {
        setListQuestions((prevState) => ({
            ...prevState,
            questions: prevState.questions.map((q) =>
                q.id === questionId ? { ...q, yourChoice: choice } : q
            ),
        }));
    };

    const finished = () => {
        const correctAnswer = listQuestions.questions.filter(
            (q) => q.correctAnswer === q.yourChoice
        ).length;
        alert("bạn đã làm đúng: " + correctAnswer + "/" + listQuestions.questions.length);
    };
    return (
        <div className="bg-white">
            <Navbar />
            <Drawer>
                <div className="flex">
                    <div className="w-9/12 min-h-screen bg-white p-10">
                        <p className="text-black">Câu {currentQuestion}:</p>
                        <p className="text-lg text-black">
                            {listQuestions.questions[currentQuestion - 1].question}
                        </p>

                        <div className="flex flex-col gap-5 mt-3">
                            {listQuestions.questions[currentQuestion - 1].answers.map((q, i) => {
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
                                {listQuestions.questions.filter((q) => q.yourChoice !== "").length}/{" "}
                                {listQuestions.questions.length}
                            </p>
                        </div>
                        <div className="flex flex-row justify-evenly">
                            {Array.from({ length: quizQuestions.questions.length }).map(
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

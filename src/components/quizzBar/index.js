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
        },
        {
            question: "What year did World War II end?",
            answers: ["1945", "1939", "1950", "1960"],
            correctAnswer: "1945",
        },
        {
            question: 'Who wrote the novel "To Kill a Mockingbird?"',
            answers: ["Harper Lee", "J.K. Rowling", "Stephen King", "Ernest Hemingway"],
            correctAnswer: "Harper Lee",
        },
        {
            question: "What is the largest organ in the human body?",
            answers: ["Skin", "Liver", "Heart", "Brain"],
            correctAnswer: "Skin",
        },
    ],
};

function QuizzBar(props) {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [listQuestions, setListQuestions] = useState(quizQuestions);

    const chooseAnswer = () => {
        alert(1);
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
                            {listQuestions.questions[currentQuestion - 1].answers.map((q) => {
                                return (
                                    <div className="flex flex-row py-3">
                                        <input
                                            onChange={chooseAnswer}
                                            type="radio"
                                            name="radio-10"
                                            className="radio radio-primary mr-4"
                                        />
                                        <span className="text-black">{q}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-3/12 bg-teal-700 flex-col flex pt-5">
                        <div className="flex flex-row justify-evenly">
                            {Array.from({ length: quizQuestions.questions.length }).map(
                                (_, index) => (
                                    <div
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
                            <button className="btn btn-success">Nộp bài</button>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}

export default QuizzBar;

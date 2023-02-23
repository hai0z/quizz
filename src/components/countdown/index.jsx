import { useState, useEffect } from "react";

function Countdown({ minutes, seconds, finished }) {
    const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                const newTimeLeft = prevTimeLeft - 1;
                if (newTimeLeft === 0) {
                    clearInterval(intervalId);
                }
                return newTimeLeft;
            });
        }, 1000);
        if (timeLeft === 0) clearInterval(intervalId);
        return () => clearInterval(intervalId);
    }, []);

    const formattedMinutes = Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, "0");
    const formattedSeconds = (timeLeft % 60).toString().padStart(2, "0");
    if (formattedMinutes === "00" && formattedSeconds === "00") {
        finished();
    }
    return (
        <div className="flex md:justify-end items-center">
            <div className="text-3xl font-bold ">
                <span className="text-primary cursor-pointer">
                    {formattedMinutes}:{formattedSeconds}
                </span>
            </div>
        </div>
    );
}
export default Countdown;

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
        <div className="text-lg font-bold ">
            <span className="text-base-content cursor-pointer">
                <span className="text-base">Thời gian</span> {formattedMinutes}:{formattedSeconds}
            </span>
        </div>
    );
}
export default Countdown;

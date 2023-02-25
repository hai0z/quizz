import "./App.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "./context/AppProvider";
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
    const { setTitle } = useAppContext();

    useEffect(() => {
        setTitle("Trang chủ");
    });
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
                            <img src={item.img} alt="subject" className="h-52 p-4" />
                        </figure>
                        <div className="card-body items-center">
                            <h2 className="card-title text-base-content drop-shadow-sm">
                                {item.name}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default App;

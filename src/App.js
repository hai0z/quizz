import "./App.css";
import Drawer from "./components/Drawer/UserDrawer";
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
    ];
    const { setTitle } = useAppContext();

    useEffect(() => {
        setTitle("Trang chủ");
        console.log(1);
    });
    return (
        <div>
            <Drawer>
                <div className="container p-8 flex flex-row flex-wrap gap-4 justify-center lg:justify-start">
                    {listSubject?.map((item) => (
                        <Link
                            to={`/exam/${item.id}`}
                            key={item.id}
                            className="card card-compact w-96 lg:w-80 bg-base-300 shadow-xl cursor-pointer p-2"
                        >
                            <figure>
                                <img src={item.img} alt="subject" className="h-52" />
                            </figure>
                            <div className="card-body items-center">
                                <h2 className="card-title text-primary drop-shadow-sm">
                                    {item.name}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </Drawer>
        </div>
    );
}

export default App;

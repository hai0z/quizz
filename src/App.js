import { useEffect, useState } from "react";
import "./App.css";
import Drawer from "./components/Drawer";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
function App() {
    const [listExam, setListExam] = useState();

    useEffect(() => {
        const arr = [];
        const getListExam = async () => {
            const querySnapshot = await getDocs(collection(db, "exams"));
            querySnapshot.forEach((doc) => {
                arr.push({ name: doc.data().examName, time: doc.data().time, id: doc.id });
            });
            setListExam(arr);
        };
        getListExam();
    }, []);
    return (
        <div>
            <Drawer>
                <div className="container p-8 flex flex-row flex-wrap gap-4">
                    {listExam?.map((item, index) => (
                        <div key={index} className="card w-96 bg-base-200 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{item.name}</h2>
                                <p>Time: {item.time}p</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/test/${item.id}`} className="btn btn-primary">
                                        Start test
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Drawer>
        </div>
    );
}

export default App;

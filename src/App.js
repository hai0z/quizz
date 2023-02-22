import { useEffect, useState } from "react";
import "./App.css";
import Drawer from "./components/Drawer/UserDrawer";
import { db } from "./firebase";
import { getDoc, collection, doc, getDocs, setDoc, query } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
    const navigate = useNavigate();
    const user = useSelector((state) => state.authSlice.user);
    const [listExam, setListExam] = useState();

    const startExam = async (examId) => {
        try {
            const examRef = doc(db, "exams", examId);
            const exam = await getDoc(examRef);
            //histories
            const historyRef = doc(db, "histories", `${user.uid}/exam/${examId}`);
            await setDoc(historyRef, { ...exam.data() });
            navigate("/test/" + examId);
        } catch (error) {
            throw error;
        }
    };
    useEffect(() => {
        const arr = [];
        const getListExam = async () => {
            const q = collection(db, "exams");
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                // console.log(doc.data());
                // arr.push({ name: doc.data().examName, time: doc.data().time, id: doc.id });
            });
            setListExam(arr);
        };
        getListExam();
    }, []);
    return (
        <div>
            <Drawer>
                <div className="container p-8 flex flex-row flex-wrap gap-4 justify-center lg:justify-start">
                    {listSubject?.map((item) => (
                        <Link
                            to={`/exam/${item.id}`}
                            key={item.id}
                            className="card card-compact w-96 lg:w-80 bg-base-200 shadow-xl cursor-pointer  p-2"
                        >
                            <figure>
                                <img src={item.img} alt="Shoes" className="h-52" />
                            </figure>
                            <div className="card-body items-center">
                                <h2 className="card-title">{item.name}</h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </Drawer>
        </div>
    );
}

export default App;

import { useEffect, useState } from "react";
import Drawer from "../Drawer/UserDrawer";
import { db } from "../../firebase/";
import { getDoc, collection, doc, getDocs, setDoc, query } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ListExam() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.authSlice.user);
    const [listExam, setListExam] = useState();

    const startExam = async (examId) => {
        try {
            const examRef = doc(db, "exams", `${id}/exam/${examId}`);
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
            const q = collection(db, `exams/${id}/exam`);
            const querySnapshot = await getDocs(q);
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
                <div className="container p-8 flex flex-row flex-wrap gap-4 justify-center lg:justify-start">
                    {listExam?.map((item, index) => (
                        <div key={index} className="card w-96 lg:w-80 bg-base-200 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{item.name}</h2>
                                <p>Time: {item.time}p</p>
                                <div className="card-actions justify-end">
                                    <button
                                        onClick={() => startExam(item.id)}
                                        className="btn btn-primary"
                                    >
                                        Start test
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Drawer>
        </div>
    );
}

export default ListExam;

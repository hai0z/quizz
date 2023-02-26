import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/";
import { getDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppProvider";

export const listExamLoader = async (id) => {
    const arr = [];
    const q = collection(db, `exams/${id}/exam`);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        arr.push({
            name: doc.data().examName,
            time: doc.data().time,
            id: doc.id,
            numberOfQuestion: doc.data().questions.length,
        });
    });
    return arr;
};
function ListExam() {
    const [loading, setLoading] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const listExam = useLoaderData();
    const { setTitle } = useAppContext();

    function expire(currentTime, minutes) {
        // Tính toán timestamp của thời điểm hết hạn
        const expirationTime = currentTime + minutes * 60 * 1000;

        // Trả về timestamp của thời điểm hết hạn
        return expirationTime;
    }
    const startExam = async (examId) => {
        try {
            setLoading(examId);
            const now = new Date().getTime();
            const examRef = doc(db, "exams", `${id}/exam/${examId}`);
            const exam = await getDoc(examRef);

            //check xem da lam chua
            const docRef = doc(db, "histories", `${auth.currentUser.uid}/exam/${examId}`);
            const docSnap = await getDoc(docRef);

            // if (docSnap.exists()) {
            //     navigate("/test/" + examId);
            //     return;
            // }

            //push to history
            const historyRef = doc(db, "histories", `${auth.currentUser.uid}/exam/${examId}`);
            await setDoc(historyRef, {
                ...exam.data(),
                id: examId,
                startAt: now / 1000,
                expire: expire(now, +exam.data().time) / 1000,
                questions: exam.data()?.questions.map((q, index) => ({ ...q, index: index + 1 })),
            });
            navigate("/test/" + examId);
        } catch (error) {
            throw error;
        }
    };
    useEffect(() => {
        setTitle("Danh sách đề thi");
    });
    return (
        <div>
            <div className="container p-8 flex flex-row flex-wrap gap-8 justify-center md:justify-start">
                {listExam?.length <= 0 && (
                    <div className="items-center justify-center flex flex-col container">
                        <img src={require("../../asset/page.png")} alt="empty" className="h-40" />
                        <h2 className="font-mono text-primary text-2xl text-center">
                            Chưa có bài thi nào
                        </h2>
                    </div>
                )}
                {listExam?.map((item, index) => (
                    <div className="card card-side bg-base-200 shadow-xl" key={index}>
                        <figure>
                            <img
                                src={require("../../asset/exam.png")}
                                alt="exam"
                                className="h-36 lg:h52 p-4"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{item.name}</h2>
                            <p>Thời gian: {item.time} phút</p>
                            <p>Số câu hỏi: {item.numberOfQuestion}</p>
                            <div className="card-actions justify-end">
                                <button
                                    className={`btn btn-primary ${
                                        loading === item.id && "loading"
                                    }`}
                                    onClick={() => startExam(item.id)}
                                >
                                    {loading === item.id ? "Đang bắt đầu" : "Bắt đầu làm"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListExam;

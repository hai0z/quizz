import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppProvider";

function AdminPage() {
    const { setTitle } = useAppContext();

    useEffect(() => {
        setTitle("Admin Page");
    });
    return (
        <div className="container p-8 flex flex-row gap-8 flex-wrap justify-center md:justify-start">
            <div className="card  w-96 lg:w-80 bg-base-200 shadow-xl">
                <figure>
                    <img src={require("../../asset/add-file.png")} alt="add-questions" className="h-52 p-4" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Thêm câu hỏi</h2>
                    <p></p>
                    <div className="card-actions justify-end">
                        <Link to="/admin/add-question" className="btn btn-primary">
                            Thêm
                        </Link>
                    </div>
                </div>
            </div>
            <div className="card  w-96 lg:w-80 bg-base-200 shadow-xl">
                <figure>
                    <img src={require("../../asset/edit-tools.png")} alt="create-exam" className="h-52 p-4 bg-cover" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Tạo đề thi ngẫu nhiên</h2>
                    <p></p>
                    <div className="card-actions justify-end">
                        <Link to="/admin/make-exam" className="btn btn-primary">
                            Tạo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;

import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function AdminPage() {
    return (
        <div>
            <Navbar />
            <div className="container p-8 flex flex-row gap-4 flex-wrap justify-center lg:justify-start">
                <div className="card w-96 bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Thêm câu hỏi</h2>

                        <div className="card-actions justify-end">
                            <Link to="/admin/add-question" className="btn btn-primary">
                                Thêm
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Tạo đề thi ngẫu nhiên</h2>

                        <div className="card-actions justify-end">
                            <Link to="/admin/make-exam" className="btn btn-primary">
                                Tạo
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Thêm câu hỏi</h2>

                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Thêm</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Thêm câu hỏi</h2>

                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;

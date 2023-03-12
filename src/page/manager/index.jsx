import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppProvider";

function ManagerPage() {
    const { setTitle } = useAppContext();

    useEffect(() => {
        setTitle("Admin Page");
    }, []);
    return (
        <div className="container p-8 flex flex-row gap-8 flex-wrap justify-center md:justify-start">
            <Link to="/admin/manager/user" className="card  w-96 lg:w-80 bg-base-200 shadow-xl">
                <figure>
                    <img
                        src={require("../../asset/project-management.png")}
                        alt="create-exam"
                        className="h-52 p-4 bg-cover"
                    />
                </figure>
                <div className="card-body items-center">
                    <h2 className="card-title ">Quản lý tài khoản</h2>
                    <p></p>
                </div>
            </Link>
        </div>
    );
}

export default ManagerPage;

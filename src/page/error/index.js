import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <div className="container h-screen flex items-center pt-20 flex-col">
            <p className="text-3xl">Trang không tồn tại </p>
            <p>
                <Link className="text-sm text-primary mt-1 block hover:text-secondary-focus" to="/">
                    Quay về trang chủ {"<--"}
                </Link>
            </p>
        </div>
    );
}

export default ErrorPage;

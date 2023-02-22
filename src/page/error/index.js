import React from "react";
import { Link } from "react-router-dom";
import Drawer from "../../components/Drawer/UserDrawer";

function ErrorPage() {
    return (
        <Drawer>
            <div className="container h-1/2 flex items-center justify-center flex-col">
                <p className="text-3xl">Trang không tồn tại </p>
                <p>
                    <Link
                        className="text-sm text-primary mt-1 block hover:text-secondary-focus"
                        to="/"
                    >
                        Quay về trang chủ {"<--"}
                    </Link>
                </p>
            </div>
        </Drawer>
    );
}

export default ErrorPage;

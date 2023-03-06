import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import CardLoading from "../components/Sketon/CardLoading";
import { useAuthContext } from "../context/AuthProvider";
import cry from "../asset/cry.gif";
export function ProtectedRoute() {
    const navigate = useNavigate();
    const { loading } = useAuthContext();
    const auth = useSelector((state) => state.authSlice.auth);
    const user = useSelector((state) => state.authSlice.user);
    const [showGif, setShowGif] = useState(false);
    useEffect(() => {
        const timeOut = setTimeout(() => setShowGif(false), 3000);
        return () => clearTimeout(timeOut);
    }, [showGif]);
    if (loading) {
        return (
            <div className="flex items-center flex-col min-h-screen">
                <div className="container flex flex-row flex-wrap gap-8 justify-center p-8 content-start">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <CardLoading key={index} />
                    ))}
                </div>
            </div>
        );
    } else if (!auth.isLogin) {
        navigate("/login");
        return;
    } else if (user.role !== "ADMIN") {
        return (
            <div className="hero min-h-screen">
                {showGif && (
                    <img src={cry} className="h-8/12 w-8/12" alt="crying man" />
                )}
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">
                            Dự án đã dừng hoạt động
                        </h1>
                        <p className="py-6">
                            Tôi hiểu rằng việc dừng hoạt động của dự án này sẽ
                            là một cú sốc lớn đối với mọi người. Tôi mong rằng
                            chúng ta sẽ tiếp tục học hỏi và phát triển từ kinh
                            nghiệm này để chuẩn bị cho những dự án tương lai.
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowGif(true)}
                        >
                            I Feel Very Bad
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return <Outlet />;
}

export function AdminProtectedRoute() {
    const navigate = useNavigate();
    const { loading } = useAuthContext();
    const auth = useSelector((state) => state.authSlice.auth);
    const user = useSelector((state) => state.authSlice.user);

    if (loading) {
        return (
            <div className="flex items-center flex-col min-h-screen">
                <div className="container flex flex-row flex-wrap gap-8 justify-center p-8">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <CardLoading key={index} />
                    ))}
                </div>
            </div>
        );
    } else {
        if (!auth.isLogin || user.role !== "ADMIN") {
            navigate("/login");
            return;
        }
    }

    return <Outlet />;
}

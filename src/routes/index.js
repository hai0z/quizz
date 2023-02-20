import { createBrowserRouter, Outlet } from "react-router-dom";
import QuizzBar from "../components/quizzBar";
import ExamResult from "../page/ViewExamResult";
import ShowDescription from "../page/ViewExamResult/Showdescriptions";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "../context/AuthProvider";
import Login from "../page/login";
import App from "../App";

const AuthLayOut = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};
export const router = createBrowserRouter([
    {
        element: <AuthLayOut />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/",
                element: <ProtectedRoute />,
                children: [
                    { path: "/", element: <App /> },
                    {
                        path: "/test",
                        element: <QuizzBar />,
                    },
                    { path: "/examResult", element: <ExamResult /> },
                    { path: "/descriptions", element: <ShowDescription /> },
                ],
            },
        ],
    },
]);

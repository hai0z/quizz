import { createBrowserRouter, Outlet } from "react-router-dom";
import QuizzBar from "../components/quizzBar";
import ExamResult from "../page/ViewExamResult";
import ShowDescription from "../page/ViewExamResult/Showdescriptions";
import ProtectedRoute from "./ProtectedRoute";
import AuthProvider from "../context/AuthProvider";
import Login from "../page/login";
import App from "../App";
import AdminPage from "../page/admin";
import AddQuestion from "../page/AddQuestion";
import RandomExam from "../page/RandomExam";
import ExamHistory from "../page/Examhistory";
import ListExam from "../components/ListExam";

const AuthLayOut = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};
const AdminLayout = () => {
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
                    { path: "/exam/:id", element: <ListExam /> },
                    {
                        path: "/test/:id",
                        element: <QuizzBar />,
                    },
                    { path: "/examResult/:id", element: <ExamResult /> },
                    { path: "/descriptions/:id", element: <ShowDescription /> },
                    { path: "/history", element: <ExamHistory /> },
                ],
            },
        ],
    },
    {
        element: <AdminLayout />,
        path: "/admin",
        children: [
            { path: "/admin", element: <AdminPage /> },
            { path: "/admin/add-question", element: <AddQuestion /> },
            { path: "/admin/make-exam", element: <RandomExam /> },
        ],
    },
]);

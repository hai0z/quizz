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
                    {
                        path: "/test/:id",
                        element: <QuizzBar />,
                    },
                    { path: "/examResult/:id", element: <ExamResult /> },
                    { path: "/descriptions/:id", element: <ShowDescription /> },
                ],
            },
        ],
    },
    {
        element: <AdminLayout />,
        children: [{ path: "/admin", element: <AdminPage /> }],
    },
    {
        element: <AdminLayout />,
        children: [{ path: "/admin/add-question", element: <AddQuestion /> }],
    },
    {
        element: <AdminLayout />,
        children: [{ path: "/admin/make-exam", element: <RandomExam /> }],
    },
]);

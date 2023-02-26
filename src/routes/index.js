import { createBrowserRouter } from "react-router-dom";
import QuizzBar from "../components/quizzBar";
import ExamResult from "../page/ViewExamResult";
import ShowDescription, { examResultLoader } from "../page/ViewExamResult/Showdescriptions";
import { ProtectedRoute, AdminProtectedRoute } from "./ProtectedRoute";
import AuthProvider from "../context/AuthProvider";
import Login from "../page/login";
import App from "../App";
import AdminPage from "../page/admin";
import AddQuestion from "../page/AddQuestion";
import RandomExam from "../page/RandomExam";
import ExamHistory, { historyLoader } from "../page/Examhistory";
import ListExam, { listExamLoader } from "../components/ListExam";
import Profile from "../page/profile";
import ErrorPage from "../page/error";
import Drawer from "../components/Drawer/UserDrawer";
import AdminDrawer from "../components/Drawer/AdminDrawer";
import ManagerPage from "../page/manager";
import UserManager from "../page/manager/userManager/index";

const AuthLayOut = () => {
    return (
        <AuthProvider>
            <Drawer />
        </AuthProvider>
    );
};
const AdminLayout = () => {
    return (
        <AuthProvider>
            <AdminDrawer />
        </AuthProvider>
    );
};
export const router = createBrowserRouter([
    {
        path: "*",
        element: <AuthLayOut />,
        children: [{ path: "*", element: <ErrorPage /> }],
    },
    {
        path: "/login",
        element: (
            <AuthProvider>
                <Login />
            </AuthProvider>
        ),
    },
    {
        element: <AuthLayOut />,
        children: [
            {
                path: "/",
                element: <ProtectedRoute />,
                children: [
                    { path: "/", element: <App /> },
                    { path: "/profile", element: <Profile /> },
                    {
                        path: "/exam/:id",
                        element: <ListExam />,
                        loader: ({ params }) => listExamLoader(params.id),
                    },
                    {
                        path: "/test/:id",
                        element: <QuizzBar />,
                    },
                    { path: "/examResult/:id", element: <ExamResult /> },
                    {
                        path: "/descriptions/:id",
                        element: <ShowDescription />,
                        loader: ({ params }) => examResultLoader(params.id),
                    },
                    { path: "/history", element: <ExamHistory />, loader: historyLoader },
                ],
            },
        ],
    },
    {
        element: <AdminLayout />,
        children: [
            {
                element: <AdminProtectedRoute />,
                children: [
                    {
                        element: <AdminPage />,
                        path: "/admin",
                    },
                    { path: "/admin/add-question", element: <AddQuestion /> },
                    { path: "/admin/make-exam", element: <RandomExam /> },
                    { path: "/admin/manager", element: <ManagerPage /> },
                    { path: "/admin/manager/user", element: <UserManager /> },
                ],
            },
        ],
    },
]);

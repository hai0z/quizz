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
import ExamHistory from "../page/Examhistory";
import ListExam from "../components/ListExam";
import Profile from "../page/profile";
import ErrorPage from "../page/error";
import Drawer from "../components/Drawer/UserDrawer";
import AdminDrawer from "../components/Drawer/AdminDrawer";
import ManagerPage from "../page/manager";
import UserManager from "../page/manager/userManager/index";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { setPageLoading } from "../redux/authSlice";

const AuthLayOut = () => {
    const loading = useSelector((state) => state.authSlice.loading);
    const dispatch = useDispatch();
    return (
        <AuthProvider>
            <LoadingBar
                color="crimson"
                shadow={false}
                height={3}
                progress={loading}
                waitingTime={750}
                onLoaderFinished={() => dispatch(setPageLoading(0))}
            />
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
                    { path: "/history", element: <ExamHistory /> },
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
                    { path: "/admin/profile", element: <Profile /> },
                ],
            },
        ],
    },
]);

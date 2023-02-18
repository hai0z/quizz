import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import QuizzBar from "./components/quizzBar";
import ExamResult from "./page/ViewExamResult";
import ShowDescription from "./page/ViewExamResult/Showdescriptions";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/test",
        element: <QuizzBar />,
    },
    {
        path: "/examResult",
        element: <ExamResult />,
    },
    {
        path: "/descriptions",
        element: <ShowDescription />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

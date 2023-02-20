import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import AppProvider from "./context/AppProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    </Provider>
);

reportWebVitals();

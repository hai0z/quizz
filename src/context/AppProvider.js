import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeTheme } from "../redux/themeSlice";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const theme = useSelector((state) => state.themeSlice.theme);

    let navBarTitle = "";

    const dispatch = useDispatch();

    const getTitle = () => navBarTitle;
    const setTitle = (value) => (navBarTitle = value);
    const handleChangeTheme = (themeName) => {
        dispatch(changeTheme(themeName));
        localStorage.setItem("theme", themeName);
        const html = document.getElementById("html");
        html.setAttribute("data-theme", themeName);
    };

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");

        if (currentTheme) {
            dispatch(changeTheme(currentTheme));
        }
        const html = document.getElementById("html");
        html.setAttribute("data-theme", currentTheme);
    }, [theme, dispatch]);

    const defaultValue = { handleChangeTheme, navBarTitle, getTitle, setTitle };

    return <AppContext.Provider value={defaultValue}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { useAppContext };
export default AppProvider;

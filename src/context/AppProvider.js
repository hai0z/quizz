import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeTheme } from "../redux/themeSlice";
const AppContext = createContext();

const AppProvider = ({ children }) => {
    const theme = useSelector((state) => state.themeSlice.theme);

    const dispatch = useDispatch();

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

    return <AppContext.Provider value={{ handleChangeTheme }}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { useAppContext };
export default AppProvider;

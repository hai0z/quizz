import { createContext, useContext, useEffect } from "react";
import { auth, db } from "../firebase/";
import {
    signInWithPopup,
    GoogleAuthProvider,
    getAdditionalUserInfo,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { setAuth, setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.authSlice.user);

    const handleLogin = async () => {
        const googleProvider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const {
                user: { uid, photoURL, displayName, email },
            } = userCredential;
            console.log(userCredential);
            if (getAdditionalUserInfo(userCredential).isNewUser) {
                const userRef = doc(db, "users", uid);
                await setDoc(userRef, {
                    uid,
                    photoURL,
                    displayName,
                    email,
                    role: "USER",
                });
            }
            navigate("/");
        } catch (error) {
            throw error;
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            throw error;
        }
    };
    const getUserInfo = async () => {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const user = await getDoc(userRef);
        dispatch(setUser({ ...user.data() }));
    };
    const updateUserStatus = async (status) => {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { status }).catch((err) => {
            throw err;
        });
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (isUser) => {
            if (isUser) {
                dispatch(setUser({ ...user, uid: isUser.uid }));
                getUserInfo();
                updateUserStatus("online");
                dispatch(setAuth({ isLogin: true }));
            } else {
                updateUserStatus("offline");
                dispatch(setAuth({ isLogin: false }));
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        window.addEventListener("beforeunload", () => updateUserStatus("offline"));
        return () => {
            window.removeEventListener("beforeunload", updateUserStatus("offline"));
        };
    }, []);

    const defaultValue = { handleLogin, handleLogout };

    return <AuthContext.Provider value={defaultValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
export default AuthProvider;

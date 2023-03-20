/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/";
import { signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo, signOut, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { setAuth, setPageLoading, setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.authSlice.user);

    const [loading, setLoading] = useState(true);

    const handleLogin = async () => {
        const googleProvider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const {
                user: { uid, photoURL, displayName, email },
            } = userCredential;
            if (getAdditionalUserInfo(userCredential).isNewUser) {
                const userRef = doc(db, "users", uid);
                await setDoc(userRef, {
                    uid,
                    photoURL,
                    displayName,
                    email,
                    role: "USER",
                    coin: 3000,
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
    const updateUserStatus = async (status) => {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { status }).catch((err) => {
            throw err;
        });
    };
    const getUserInfo = async () => {
        dispatch(setPageLoading(10));
        const userRef = doc(db, "users", auth.currentUser.uid);
        const user = await getDoc(userRef);
        dispatch(setPageLoading(40));
        dispatch(setUser({ ...user.data() }));
        updateUserStatus("online");
        dispatch(setPageLoading(60));
        dispatch(setPageLoading(100));
        setLoading(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (isUser) => {
            if (isUser) {
                getUserInfo();
                dispatch(setAuth({ isLogin: true }));
            } else {
                updateUserStatus("offline");
                dispatch(setAuth({ isLogin: false }));
                dispatch(setUser({ coin: 0 }));
                setLoading(false);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        window.addEventListener("beforeunload", () => updateUserStatus("offline"));
        return () => {
            window.removeEventListener("beforeunload", updateUserStatus("offline"));
        };
    }, []);

    const defaultValue = { handleLogin, handleLogout, loading };
    return <AuthContext.Provider value={defaultValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
export default AuthProvider;

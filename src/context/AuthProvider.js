import { createContext, useContext, useEffect } from "react";
import { auth, db } from "../firebase/";
import {
    signInWithPopup,
    GoogleAuthProvider,
    getAdditionalUserInfo,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { setAuth, setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    setUser({
                        uid: user.uid,
                        photoURL: user.photoURL,
                        displayName: user.displayName,
                        email: user.email,
                    })
                );
                dispatch(setAuth({ isLogin: true }));
            } else {
                dispatch(setUser({}));
                dispatch(setAuth({ isLogin: false }));
            }
        });
        return () => unsubscribe();
    }, [dispatch]);

    const defaultValue = { handleLogin, handleLogout };

    return <AuthContext.Provider value={defaultValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
export default AuthProvider;

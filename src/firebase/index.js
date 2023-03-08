// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdhbEqdQ0Rtli9Gg_Jsr-9WtUrsqIWHsU",
    authDomain: "quizz-9074c.firebaseapp.com",
    projectId: "quizz-9074c",
    storageBucket: "quizz-9074c.appspot.com",
    messagingSenderId: "843456631174",
    appId: "1:843456631174:web:244809a15746593e29dc07",
    measurementId: "G-46CFT3EVK4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
if (window.location.hostname === "localhost") {
    connectFirestoreEmulator(db, "localhost", 8080);
}
const analytics = getAnalytics(app);
export { db, auth };

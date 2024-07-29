// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyD7MPZE51h03xlhWW2abwmQ9oycVcUzQ9o",
    authDomain: "menu-explorer.firebaseapp.com",
    projectId: "menu-explorer",
    storageBucket: "menu-explorer.appspot.com",
    messagingSenderId: "392706116285",
    appId: "1:392706116285:web:ebbe19509b612d5dbf05d4",
    measurementId: "G-M01TFYPR1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB2oQSgA7Z-lTo5tgHtb9QkojH6cfQ_FL8",
    authDomain: "hd-task-app.firebaseapp.com",
    projectId: "hd-task-app",
    storageBucket: "hd-task-app.appspot.com",
    messagingSenderId: "663652588375",
    appId: "1:663652588375:web:25058e0cbbc482d5763c12",
    measurementId: "G-VDKRY6YE87"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();



export { app, analytics, auth, db };
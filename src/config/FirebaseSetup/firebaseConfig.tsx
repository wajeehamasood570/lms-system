// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7pt7xKn-TPIdJLMdkZRkW6uqN7UTeF50",
  authDomain: "lms-system-7e5fa.firebaseapp.com",
  projectId: "lms-system-7e5fa",
  storageBucket: "lms-system-7e5fa.appspot.com",
  messagingSenderId: "1015924858538",
  appId: "1:1015924858538:web:7c79fe81ce7d6908ec7ad3",
  measurementId: "G-EHK7P87G5E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
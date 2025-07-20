// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNmK0QDUwtSaNmvfOzmLcmhRIlqGu4EqE",
  authDomain: "student-planner-8faba.firebaseapp.com",
  projectId: "student-planner-8faba",
  storageBucket: "student-planner-8faba.firebasestorage.app",
  messagingSenderId: "266082377528",
  appId: "1:266082377528:web:b9d75434bf9b7c1e026bcd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;

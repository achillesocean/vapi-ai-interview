// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEquK3q-JsRWr8Lj9d4rsQLlzydQVjE0c",
  authDomain: "prepwise-4e61d.firebaseapp.com",
  projectId: "prepwise-4e61d",
  storageBucket: "prepwise-4e61d.firebasestorage.app",
  messagingSenderId: "663230518290",
  appId: "1:663230518290:web:704fe8737b12da70ecb4cb",
  measurementId: "G-HZM3KDKLTX",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

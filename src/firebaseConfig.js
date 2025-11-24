// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4YcoiE8-8DbJvq8qdlNXY166hpDxwWFI",
  authDomain: "my-olx-6bebe.firebaseapp.com",
  projectId: "my-olx-6bebe",
  storageBucket: "my-olx-6bebe.firebasestorage.app",
  messagingSenderId: "804952532658",
  appId: "1:804952532658:web:5f568f0c423cad9b29cbab",
  measurementId: "G-QKS23E1QY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA4YcoiE8-8DbJvq8qdlNXY166hpDxwWFI",
  authDomain: "my-olx-6bebe.firebaseapp.com",
  projectId: "my-olx-6bebe",
  storageBucket: "my-olx-6bebe.firebasestorage.app",
  messagingSenderId: "804952532658",
  appId: "1:804952532658:web:5f568f0c423cad9b29cbab",
  measurementId: "G-QKS23E1QY8"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
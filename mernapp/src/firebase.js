import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // if you're using Auth
import { getFirestore } from "firebase/firestore"; // if you're using Firestore
const firebaseConfig = {
  apiKey: "AIzaSyBNWrUgpigxiHDT6_n4vdR7gdYrnDjXozA",
  authDomain: "ai-trip-planner-7f038.firebaseapp.com",
  projectId: "ai-trip-planner-7f038",
  storageBucket: "ai-trip-planner-7f038.firebasestorage.app",
  messagingSenderId: "1042066947185",
  appId: "1:1042066947185:web:0cc2e23dfced976cfdefd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
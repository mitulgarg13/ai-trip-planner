import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBNWrUgpigxiHDT6_n4vdR7gdYrnDjXozA",
  authDomain: "ai-trip-planner-7f038.firebaseapp.com",
  projectId: "ai-trip-planner-7f038",
  storageBucket: "ai-trip-planner-7f038.appspot.com",  // ✅ fixed
  messagingSenderId: "1042066947185",
  appId: "1:1042066947185:web:0cc2e23dfced976cfdefd0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

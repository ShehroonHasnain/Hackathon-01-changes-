import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8wehOL9TJ383pVLOgb8McT8OtxuHuIPM",
  authDomain: "social-media-app-ad03b.firebaseapp.com",
  projectId: "social-media-app-ad03b",
  storageBucket: "social-media-app-ad03b.appspot.com",
  messagingSenderId: "115070065462",
  appId: "1:115070065462:web:f7763a422aaf1ceab9b197"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);




import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwJixVg1EF1cv3EbqGTcBpi3xPH4IazW4",
  authDomain: "authentication-pratice.firebaseapp.com",
  projectId: "authentication-pratice",
  storageBucket: "authentication-pratice.appspot.com",
  messagingSenderId: "610861591759",
  appId: "1:610861591759:web:7c7dbf8e3b2f5a7e571bba",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const GoggleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

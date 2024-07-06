
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_hhAeV-kd-do5QHQL_CSsTJEmhfuxnts",
  authDomain: "try3-1d643.firebaseapp.com",
  projectId: "try3-1d643",
  storageBucket: "try3-1d643.appspot.com",
  messagingSenderId: "450292063872",
  appId: "1:450292063872:web:95b3df3b6e318a787e9065",
  measurementId: "G-RE1EEGBS5W"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db= getFirestore(app);
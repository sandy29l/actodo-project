import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";

const firebaseConfig = {
  apiKey: "AIzaSyCl3d6RbPTcL0TVCQp8_b4K0ODq3WeWJ_0",
  authDomain: "actodo-3811c.firebaseapp.com",
  projectId: "actodo-3811c",
  storageBucket: "actodo-3811c.firebasestorage.app",
  messagingSenderId: "85571946326",
  appId: "1:85571946326:web:f287b8356c495b642ff8f7",
  measurementId: "G-QVK2Y1Q52Z"
};


const app = initializeApp(firebaseConfig);
const auth =getAuth(app);

export default auth;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw0hm1GSqPLONX_I90mpG94QCSu4ElMpU",
  authDomain: "entrega-final-arias.firebaseapp.com",
  projectId: "entrega-final-arias",
  storageBucket: "entrega-final-arias.firebasestorage.app",
  messagingSenderId: "52302146286",
  appId: "1:52302146286:web:cd227287f98ae80a18e1ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtfujPPhLcnn4Y4M0SvCefxtrxlZrI56g",
  authDomain: "gyrocar-locations.firebaseapp.com",
  databaseURL: "https://gyrocar-locations-default-rtdb.firebaseio.com",
  projectId: "gyrocar-locations",
  storageBucket: "gyrocar-locations.appspot.com",
  messagingSenderId: "152151314006",
  appId: "1:152151314006:web:e81d0da0f76fde269f35f7",
  measurementId: "G-62PDWVT73L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
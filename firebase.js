// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrktc_5WSs-8j2BxC61EmYQPype4Y2uRw",
  authDomain: "ai-flashcards-ec1aa.firebaseapp.com",
  projectId: "ai-flashcards-ec1aa",
  storageBucket: "ai-flashcards-ec1aa.appspot.com",
  messagingSenderId: "92889854515",
  appId: "1:92889854515:web:56683712798c41dcb76946",
  measurementId: "G-EJCSNSK14Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
export { database };

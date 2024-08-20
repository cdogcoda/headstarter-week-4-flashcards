// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCrktc_5WSs-8j2BxC61EmYQPype4Y2uRw",
//   authDomain: "ai-flashcards-ec1aa.firebaseapp.com",
//   projectId: "ai-flashcards-ec1aa",
//   storageBucket: "ai-flashcards-ec1aa.appspot.com",
//   messagingSenderId: "92889854515",
//   appId: "1:92889854515:web:56683712798c41dcb76946",
//   measurementId: "G-EJCSNSK14Z"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getFirestore(app);
// export { database };



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATZvyV0EjEP1mXRavKCBlQt4i9V7jllcs",
  authDomain: "headstarter-flashcards-e4b7c.firebaseapp.com",
  projectId: "headstarter-flashcards-e4b7c",
  storageBucket: "headstarter-flashcards-e4b7c.appspot.com",
  messagingSenderId: "1003345324999",
  appId: "1:1003345324999:web:e0124308f7d10f9f5647e2",
  measurementId: "G-9SL3GQ7686"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
// const analytics = getAnalytics(app);

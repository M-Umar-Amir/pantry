// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDahZyOHPoIVQajCAFXQ4YpU17GfLUq_jE",
  authDomain: "pantryapp-65381.firebaseapp.com",
  projectId: "pantryapp-65381",
  storageBucket: "pantryapp-65381.appspot.com",
  messagingSenderId: "250078018333",
  appId: "1:250078018333:web:57d4f99efda78c9d87fff4",
  measurementId: "G-8DQMZEB8Y1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export {
    app,
    firestore
}
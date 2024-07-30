import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDahZyOHPoIVQajCAFXQ4YpU17GfLUq_jE",
  authDomain: "pantryapp-65381.firebaseapp.com",
  projectId: "pantryapp-65381",
  storageBucket: "pantryapp-65381.appspot.com",
  messagingSenderId: "250078018333",
  appId: "1:250078018333:web:57d4f99efda78c9d87fff4",
  measurementId: "G-8DQMZEB8Y1"
};

let app;
let firestore;
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  if ('measurementId' in firebaseConfig) {
    getAnalytics(app);
  }
  firestore = getFirestore(app);
}

export { app, firestore };


import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAFrP6R7-zTZWHpH-Vb2pSpNpFHF1s13ic",
  authDomain: "pantry-app-45f6a.firebaseapp.com",
  projectId: "pantry-app-45f6a",
  storageBucket: "pantry-app-45f6a.appspot.com",
  messagingSenderId: "143353125329",
  appId: "1:143353125329:web:2c15ea593d110d90ea68f0",
  measurementId: "G-RE5LQCT4W3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };
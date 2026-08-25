import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdLXlh6Po7jdaP95RjNyEEW2XZthErXak",
  authDomain: "studypilot-hq.firebaseapp.com",
  projectId: "studypilot-hq",
  storageBucket: "studypilot-hq.firebasestorage.app",
  messagingSenderId: "308458955369",
  appId: "1:308458955369:web:0f44da0ffb4e4e962778f8",
  measurementId: "G-K7K79F41P8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export default app
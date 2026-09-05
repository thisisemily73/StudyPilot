import { initializeApp } from "firebase/app"
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

import {
    getAI,
    GoogleAIBackend,
} from "firebase/ai"

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyDdLXlh6Po7jdaP95RjNyEEW2XZthErXak",
  apiKey: "AIzaSyD-1jUGtIgmAaL21CAdpMcoE5feq3c5d2Y",
  authDomain: "studypilot-hq.firebaseapp.com",
  projectId: "studypilot-hq",
  storageBucket: "studypilot-hq.firebasestorage.app",
  messagingSenderId: "308458955369",
  appId: "1:308458955369:web:0f44da0ffb4e4e962778f8",
  measurementId: "G-K7K79F41P8"
};

// TEMPORARY DEBUGGING
// Initialize the core Firebase App
const app = initializeApp(firebaseConfig);


// Set up the Debug Environment Flag
if (
  typeof window !== "undefined" && 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
) {
  (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}


// Initialize Firebase

// Initialize App Check with reCAPTCHA Enterprise
// const appCheck = lines below move up!
initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider("6Ld1DqItAAAAAMjV7nI7Rem1f_phUNFtgh5kCB8N"),
  isTokenAutoRefreshEnabled: true // Automatically refreshes the token in the background
});

export const auth = getAuth(app)
export const db = getFirestore(app)

export const ai = getAI(
    app,
    {
        backend: new GoogleAIBackend(),
    }
)

if (typeof window !== "undefined") {
  initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider('6Ld1DqItAAAAAMjV7nI7Rem1f_phUNFtgh5kCB8N'),
    isTokenAutoRefreshEnabled: true
  });
}

export default app
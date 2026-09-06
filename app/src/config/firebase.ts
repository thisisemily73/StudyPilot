import { initializeApp } from "firebase/app"
import {
    initializeAppCheck,
    ReCaptchaEnterpriseProvider,
} from "firebase/app-check"

import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

import {
    getAI,
    GoogleAIBackend,
} from "firebase/ai"

const firebaseConfig = {
    apiKey: "AIzaSyD-1jUGtIgmAaL21CAdpMcoE5feq3c5d2Y",
    authDomain: "studypilot-hq.firebaseapp.com",
    projectId: "studypilot-hq",
    storageBucket: "studypilot-hq.firebasestorage.app",
    messagingSenderId: "308458955369",
    appId: "1:308458955369:web:0f44da0ffb4e4e962778f8",
    measurementId: "G-K7K79F41P8",
}

const app = initializeApp(firebaseConfig)

if (
    typeof window !== "undefined" &&
    (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
    )
) {
    ;(self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true
}

initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider("6Ld1DqItAAAAAMjV7nI7Rem1f_phUNFtgh5kCB8N"),
    isTokenAutoRefreshEnabled: true,
})

export const auth = getAuth(app)
export const db = getFirestore(app)

export const ai = getAI(app, {
    backend: new GoogleAIBackend(),
})

export default app
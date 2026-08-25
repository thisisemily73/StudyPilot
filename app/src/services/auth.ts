import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"

import { auth } from "../config/firebase.ts"

export function createAccount(
    email: string,
    password: string
) {
    return createUserWithEmailAndPassword(
        auth,
        email,
        password
    )
}

export function signIn(
    email: string,
    password: string
) {
    return signInWithEmailAndPassword(
        auth,
        email,
        password
    )
}

export function signOutUser() {
    return signOut(auth)
}
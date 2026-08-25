import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth"

import { auth } from "../config/firebase.ts"

const googleProvider =
    new GoogleAuthProvider()

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

export function signInWithGoogle() {

    return signInWithPopup(
        auth,
        googleProvider
    )

}

export function signOutUser() {

    return signOut(auth)

}
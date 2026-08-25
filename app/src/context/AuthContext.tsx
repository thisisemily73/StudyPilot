import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"

import type { User } from "firebase/auth"
import { onAuthStateChanged } from "firebase/auth"

import {
    createAccount,
    signIn,
    signOutUser,
} from "../services/auth"

import { auth } from "../config/firebase"

type AuthContextType = {
    user: User | null
    loading: boolean

    createAccount: (
        email: string,
        password: string
    ) => Promise<void>

    signIn: (
        email: string,
        password: string
    ) => Promise<void>

    signOut: () => Promise<void>
}

const AuthContext =
    createContext<AuthContextType | undefined>(
        undefined
    )

export function AuthProvider({
    children,
}: {
    children: ReactNode
}) {

    const [user, setUser] =
        useState<User | null>(null)

    const [loading, setLoading] =
        useState(true)


    useEffect(() => {

        const unsubscribe =
            onAuthStateChanged(
                auth,
                (currentUser) => {

                    setUser(currentUser)
                    setLoading(false)

                }
            )

        return unsubscribe

    }, [])


    async function handleCreateAccount(
        email: string,
        password: string
    ) {

        await createAccount(
            email,
            password
        )

    }


    async function handleSignIn(
        email: string,
        password: string
    ) {

        await signIn(
            email,
            password
        )

    }


    async function handleSignOut() {

        await signOutUser()

    }


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,

                createAccount:
                    handleCreateAccount,

                signIn:
                    handleSignIn,

                signOut:
                    handleSignOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {

    const context =
        useContext(AuthContext)

    if (!context) {
        throw new Error(
            "useAuth must be used inside an AuthProvider"
        )
    }

    return context
}
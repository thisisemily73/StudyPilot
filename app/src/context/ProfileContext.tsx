import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"

import {
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore"

import { db } from "../config/firebase"
import { useAuth } from "./AuthContext"


export type Profile = {
    name: string
    username: string
    grade: string
}


const defaultProfile: Profile = {
    name: "Student",
    username: "student",
    grade: "",
}


type ProfileContextType = {
    profile: Profile
    updateProfile: (
        updates: Partial<Profile>
    ) => void
}


const ProfileContext =
    createContext<ProfileContextType | undefined>(
        undefined
    )


export function ProfileProvider({
    children,
}: {
    children: ReactNode
}) {

    const { user } = useAuth()

    const [profile, setProfile] =
        useState<Profile>(defaultProfile)

    const [loaded, setLoaded] =
        useState(false)


    // LOAD PROFILE FROM FIREBASE

    useEffect(() => {

        if (!user) {
            setProfile(defaultProfile)
            setLoaded(false)
            return
        }

        const userId = user.uid

        async function loadProfile() {

            try {

                const profileRef = doc(
                    db,
                    "users",
                    userId,
                    "profile",
                    "data"
                )

                const snapshot =
                    await getDoc(profileRef)

                if (snapshot.exists()) {

                    setProfile(
                        snapshot.data() as Profile
                    )

                } else {

                    setProfile(defaultProfile)

                }

            } catch (error) {

                console.error(
                    "Failed to load profile:",
                    error
                )

                setProfile(defaultProfile)

            } finally {

                setLoaded(true)

            }

        }

        loadProfile()

    }, [user])


    // UPDATE PROFILE

    function updateProfile(
        updates: Partial<Profile>
    ) {
        const updatedProfile = {
            ...profile,
            ...updates,
        }

        setProfile(updatedProfile)

        if (!user || !loaded) {
            return
        }

        const userId = user.uid

        async function saveProfile() {
            try {
                const profileRef = doc(
                    db,
                    "users",
                    userId,
                    "profile",
                    "data"
                )

                await setDoc(
                    profileRef,
                    updatedProfile
                )

                console.log("Profile saved")

            } catch (error) {
                console.error(
                    "Failed to save profile:",
                    error
                )
            }
        }

        saveProfile()
    }


    return (
        <ProfileContext.Provider
            value={{
                profile,
                updateProfile,
            }}
        >
            {children}
        </ProfileContext.Provider>
    )
}


export function useProfile() {

    const context =
        useContext(ProfileContext)


    if (!context) {

        throw new Error(
            "useProfile must be used inside a ProfileProvider"
        )

    }


    return context
}
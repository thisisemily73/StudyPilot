import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"

export type Profile = {
    name: string
    username: string
    profilePicture: string
    grade: string
}

type ProfileContextType = {
    profile: Profile
    updateProfile: (updates: Partial<Profile>) => void
}

const defaultProfile: Profile = {
    name: "Student",
    username: "student",
    profilePicture: `${import.meta.env.BASE_URL}profiles/girl_1.svg`,
    grade: "",
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

    const [profile, setProfile] =
        useState<Profile>(() => {

            const saved =
                localStorage.getItem(
                    "studypilot-profile"
                )

            return saved
                ? JSON.parse(saved)
                : defaultProfile
        })


    useEffect(() => {

        localStorage.setItem(
            "studypilot-profile",
            JSON.stringify(profile)
        )

    }, [profile])


    function updateProfile(
        updates: Partial<Profile>
    ) {

        setProfile((current) => ({
            ...current,
            ...updates,
        }))

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
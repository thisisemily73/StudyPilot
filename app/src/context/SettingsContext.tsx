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


export type Settings = {
    dayStart: string
    dayEnd: string

    weeklyStart: "monday" | "sunday"

    dailyWorkload: "1" | "2" | "3" | "4"

    taskReminders: boolean
    dailyOverview: boolean

    theme: "light" | "system" | "dark"
}


const defaultSettings: Settings = {
    dayStart: "06:00",
    dayEnd: "23:00",

    weeklyStart: "monday",

    dailyWorkload: "2",

    taskReminders: true,
    dailyOverview: true,

    theme: "light",
}


type SettingsContextType = {
    dayStart: string
    dayEnd: string
    setDayStart: (time: string) => void
    setDayEnd: (time: string) => void

    weeklyStart: "monday" | "sunday"
    setWeeklyStart: (day: "monday" | "sunday") => void

    dailyWorkload: "1" | "2" | "3" | "4"
    setDailyWorkload: (
        workload: "1" | "2" | "3" | "4"
    ) => void

    taskReminders: boolean
    setTaskReminders: (enabled: boolean) => void

    dailyOverview: boolean
    setDailyOverview: (enabled: boolean) => void

    theme: "light" | "system" | "dark"
    setTheme: (
        theme: "light" | "system" | "dark"
    ) => void
}


const SettingsContext =
    createContext<SettingsContextType | undefined>(
        undefined
    )


export function SettingsProvider({
    children,
}: {
    children: ReactNode
}) {

    const { user } = useAuth()

    const [settings, setSettings] =
        useState<Settings>(defaultSettings)

    const [loaded, setLoaded] =
        useState(false)


    /* LOAD SETTINGS */

    useEffect(() => {

        if (!user) {

            setSettings(defaultSettings)
            setLoaded(false)

            return
        }

        const userId = user.uid

        async function loadSettings() {

            try {

                const settingsRef = doc(
                    db,
                    "users",
                    userId,
                    "settings",
                    "data"
                )

                const snapshot =
                    await getDoc(settingsRef)

                if (snapshot.exists()) {

                    setSettings({
                        ...defaultSettings,
                        ...snapshot.data(),
                    } as Settings)

                } else {

                    setSettings(defaultSettings)

                }

            } catch (error) {

                console.error(
                    "Failed to load settings:",
                    error
                )

                setSettings(defaultSettings)

            } finally {

                setLoaded(true)

            }

        }

        loadSettings()

    }, [user])


    /* SAVE SETTINGS */

    useEffect(() => {

        if (!user || !loaded) {
            return
        }

        const userId = user.uid

        async function saveSettings() {

            try {

                const settingsRef = doc(
                    db,
                    "users",
                    userId,
                    "settings",
                    "data"
                )

                await setDoc(
                    settingsRef,
                    settings,
                    { merge: true }
                )

            } catch (error) {

                console.error(
                    "Failed to save settings:",
                    error
                )

            }

        }

        saveSettings()

    }, [settings, user, loaded])


    /* THEME */

    useEffect(() => {

        const root =
            document.documentElement

        if (settings.theme === "dark") {

            root.setAttribute(
                "data-theme",
                "dark"
            )

            return
        }

        if (settings.theme === "light") {

            root.setAttribute(
                "data-theme",
                "light"
            )

            return
        }

        const mediaQuery =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            )

        root.setAttribute(
            "data-theme",
            mediaQuery.matches
                ? "dark"
                : "light"
        )

        function handleSystemTheme(
            event: MediaQueryListEvent
        ) {

            root.setAttribute(
                "data-theme",
                event.matches
                    ? "dark"
                    : "light"
            )

        }

        mediaQuery.addEventListener(
            "change",
            handleSystemTheme
        )

        return () => {

            mediaQuery.removeEventListener(
                "change",
                handleSystemTheme
            )

        }

    }, [settings.theme])


    /* SETTERS */

    function setDayStart(time: string) {

        setSettings((current) => ({
            ...current,
            dayStart: time,
        }))

    }


    function setDayEnd(time: string) {

        setSettings((current) => ({
            ...current,
            dayEnd: time,
        }))

    }


    function setWeeklyStart(
        day: "monday" | "sunday"
    ) {

        setSettings((current) => ({
            ...current,
            weeklyStart: day,
        }))

    }


    function setDailyWorkload(
        workload: "1" | "2" | "3" | "4"
    ) {

        setSettings((current) => ({
            ...current,
            dailyWorkload: workload,
        }))

    }


    function setTaskReminders(
        enabled: boolean
    ) {

        setSettings((current) => ({
            ...current,
            taskReminders: enabled,
        }))

    }


    function setDailyOverview(
        enabled: boolean
    ) {

        setSettings((current) => ({
            ...current,
            dailyOverview: enabled,
        }))

    }


    function setTheme(
        theme: "light" | "system" | "dark"
    ) {

        setSettings((current) => ({
            ...current,
            theme,
        }))

    }


    return (
        <SettingsContext.Provider
            value={{
                dayStart: settings.dayStart,
                dayEnd: settings.dayEnd,
                setDayStart,
                setDayEnd,

                weeklyStart: settings.weeklyStart,
                setWeeklyStart,

                dailyWorkload:
                    settings.dailyWorkload,
                setDailyWorkload,

                taskReminders:
                    settings.taskReminders,
                setTaskReminders,

                dailyOverview:
                    settings.dailyOverview,
                setDailyOverview,

                theme: settings.theme,
                setTheme,
            }}
        >
            {children}
        </SettingsContext.Provider>
    )

}


export function useSettings() {

    const context =
        useContext(SettingsContext)

    if (!context) {

        throw new Error(
            "useSettings must be used inside an AuthProvider"
        )

    }

    return context

}
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"

type ScheduleSettings = {
    dayStart: string
    dayEnd: string
}

type ScheduleSettingsContextType = {
    dayStart: string
    dayEnd: string
    setDayStart: (time: string) => void
    setDayEnd: (time: string) => void
}

const ScheduleSettingsContext =
    createContext<ScheduleSettingsContextType | undefined>(
        undefined
    )

export function ScheduleSettingsProvider({
    children,
}: {
    children: ReactNode
}) {

    const [settings, setSettings] =
        useState<ScheduleSettings>(() => {

            const saved =
                localStorage.getItem(
                    "studypilot-schedule-settings"
                )

            return saved
                ? JSON.parse(saved)
                : {
                    dayStart: "06:00",
                    dayEnd: "23:00",
                }
        })

    useEffect(() => {

        localStorage.setItem(
            "studypilot-schedule-settings",
            JSON.stringify(settings)
        )

    }, [settings])


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


    return (
        <ScheduleSettingsContext.Provider
            value={{
                dayStart: settings.dayStart,
                dayEnd: settings.dayEnd,
                setDayStart,
                setDayEnd,
            }}
        >
            {children}
        </ScheduleSettingsContext.Provider>
    )
}


export function useScheduleSettings() {

    const context =
        useContext(ScheduleSettingsContext)

    if (!context) {
        throw new Error(
            "useScheduleSettings must be used inside a ScheduleSettingsProvider"
        )
    }

    return context
}
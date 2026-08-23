import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"

type SchoolScheduleContextType = {
    schoolStart: string
    schoolEnd: string
    schoolDays: number[]

    setSchoolStart: (time: string) => void
    setSchoolEnd: (time: string) => void
    toggleSchoolDay: (day: number) => void
}

const SchoolScheduleContext =
    createContext<SchoolScheduleContextType | undefined>(
        undefined
    )

export function SchoolScheduleProvider({
    children,
}: {
    children: ReactNode
}) {

    const [schoolStart, setSchoolStart] =
        useState(() =>
            localStorage.getItem(
                "studypilot-school-start"
            ) ?? "08:00"
        )

    const [schoolEnd, setSchoolEnd] =
        useState(() =>
            localStorage.getItem(
                "studypilot-school-end"
            ) ?? "15:00"
        )

    const [schoolDays, setSchoolDays] =
        useState<number[]>(() => {

            const saved =
                localStorage.getItem(
                    "studypilot-school-days"
                )

            return saved
                ? JSON.parse(saved)
                : [0, 1, 2, 3, 4]
        })


    useEffect(() => {
        localStorage.setItem(
            "studypilot-school-start",
            schoolStart
        )
    }, [schoolStart])


    useEffect(() => {
        localStorage.setItem(
            "studypilot-school-end",
            schoolEnd
        )
    }, [schoolEnd])


    useEffect(() => {
        localStorage.setItem(
            "studypilot-school-days",
            JSON.stringify(schoolDays)
        )
    }, [schoolDays])


    function toggleSchoolDay(day: number) {

        setSchoolDays((current) => {

            if (current.includes(day)) {
                return current.filter(
                    (value) => value !== day
                )
            }

            return [...current, day].sort()
        })
    }


    return (
        <SchoolScheduleContext.Provider
            value={{
                schoolStart,
                schoolEnd,
                schoolDays,
                setSchoolStart,
                setSchoolEnd,
                toggleSchoolDay,
            }}
        >
            {children}
        </SchoolScheduleContext.Provider>
    )
}


export function useSchoolSchedule() {

    const context =
        useContext(
            SchoolScheduleContext
        )

    if (!context) {
        throw new Error(
            "useSchoolSchedule must be used inside a SchoolScheduleProvider"
        )
    }

    return context
}
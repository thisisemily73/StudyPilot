import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"

import type { StudyTimeSlot } from "../types/studyTime"

type StudyTimeContextType = {
    studyTime: StudyTimeSlot[]
    addStudyTime: (
        day: number,
        startTime: string,
        endTime: string
    ) => void
    deleteStudyTime: (id: string) => void
}

const StudyTimeContext =
    createContext<StudyTimeContextType | undefined>(undefined)

export function StudyTimeProvider({
    children,
}: {
    children: ReactNode
}) {
    const [studyTime, setStudyTime] = useState<StudyTimeSlot[]>(() => {
        const savedStudyTime = localStorage.getItem(
            "studypilot-study-time"
        )

        return savedStudyTime
            ? JSON.parse(savedStudyTime)
            : []
    })

    useEffect(() => {
        localStorage.setItem(
            "studypilot-study-time",
            JSON.stringify(studyTime)
        )
    }, [studyTime])

    function addStudyTime(
        day: number,
        startTime: string,
        endTime: string
    ) {
        const newSlot: StudyTimeSlot = {
            id: crypto.randomUUID(),
            day,
            startTime,
            endTime,
        }

        setStudyTime((current) => [
            ...current,
            newSlot,
        ])
    }

    function deleteStudyTime(id: string) {
        setStudyTime((current) =>
            current.filter((slot) => slot.id !== id)
        )
    }

    return (
        <StudyTimeContext.Provider
            value={{
                studyTime,
                addStudyTime,
                deleteStudyTime,
            }}
        >
            {children}
        </StudyTimeContext.Provider>
    )
}

export function useStudyTime() {
    const context = useContext(StudyTimeContext)

    if (!context) {
        throw new Error(
            "useStudyTime must be used inside a StudyTimeProvider"
        )
    }

    return context
}
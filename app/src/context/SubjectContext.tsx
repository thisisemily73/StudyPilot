import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"

import type { Subject } from "../types/Subject"
import { useAuth } from "./AuthContext"

import {
    getSubjects,
    saveSubject,
    deleteSubjectFromFirestore,
} from "../services/firestore"


type NewSubject = Omit<Subject, "id">

type SubjectContextType = {
    subjects: Subject[]
    addSubject: (subject: NewSubject) => void
    updateSubject: (
        id: string,
        updates: Partial<Subject>
    ) => void
    deleteSubject: (id: string) => void
}


const SubjectContext =
    createContext<SubjectContextType | undefined>(undefined)


export function SubjectProvider({
    children,
}: {
    children: ReactNode
}) {

    const { user } = useAuth()

    const [subjects, setSubjects] =
        useState<Subject[]>([])

    const [loading, setLoading] =
        useState(true)


    useEffect(() => {

        async function loadSubjects() {

            if (!user) {
                setSubjects([])
                setLoading(false)
                return
            }

            try {

                const savedSubjects =
                    await getSubjects(user.uid)

                setSubjects(savedSubjects)

            } catch (error) {

                console.error(
                    "Failed to load subjects:",
                    error
                )

            } finally {

                setLoading(false)

            }

        }

        loadSubjects()

    }, [user])


    async function addSubject(
        subject: NewSubject
    ) {

        if (!user) return

        const alreadyExists =
            subjects.some(
                (existingSubject) =>
                    existingSubject.name.toLowerCase() ===
                    subject.name.toLowerCase()
            )

        if (alreadyExists) {
            return
        }

        const newSubject: Subject = {
            ...subject,
            id: crypto.randomUUID(),
        }

        setSubjects((currentSubjects) => [
            ...currentSubjects,
            newSubject,
        ])

        try {

            await saveSubject(
                user.uid,
                newSubject
            )

        } catch (error) {

            console.error(
                "Failed to save subject:",
                error
            )

        }

    }


    async function updateSubject(
        id: string,
        updates: Partial<Subject>
    ) {

        if (!user) return

        const updatedSubject =
            subjects.find(
                (subject) =>
                    subject.id === id
            )

        if (!updatedSubject) return

        const newSubject = {
            ...updatedSubject,
            ...updates,
        }

        setSubjects((currentSubjects) =>
            currentSubjects.map((subject) =>
                subject.id === id
                    ? newSubject
                    : subject
            )
        )

        try {

            await saveSubject(
                user.uid,
                newSubject
            )

        } catch (error) {

            console.error(
                "Failed to update subject:",
                error
            )

        }

    }


    async function deleteSubject(
        id: string
    ) {

        if (!user) return

        setSubjects((currentSubjects) =>
            currentSubjects.filter(
                (subject) =>
                    subject.id !== id
            )
        )

        try {

            await deleteSubjectFromFirestore(
                user.uid,
                id
            )

        } catch (error) {

            console.error(
                "Failed to delete subject:",
                error
            )

        }

    }


    return (
        <SubjectContext.Provider
            value={{
                subjects,
                addSubject,
                updateSubject,
                deleteSubject,
            }}
        >
            {children}
        </SubjectContext.Provider>
    )
}


export function useSubjects() {

    const context =
        useContext(SubjectContext)

    if (!context) {
        throw new Error(
            "useSubjects must be used inside a SubjectProvider"
        )
    }

    return context
}
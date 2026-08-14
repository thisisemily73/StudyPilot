import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"

import type { Subject } from "../types/Subject"


type NewSubject = Omit<Subject, "id">


type SubjectContextType = {
    subjects: Subject[]
    addSubject: (subject: NewSubject) => void
    deleteSubject: (id: string) => void
}


const SubjectContext =
    createContext<SubjectContextType | undefined>(undefined)


export function SubjectProvider({
    children,
}: {
    children: ReactNode
}) {

    const [subjects, setSubjects] = useState<Subject[]>(() => {

        const savedSubjects =
            localStorage.getItem("studypilot-subjects")

        return savedSubjects
            ? JSON.parse(savedSubjects)
            : []
    })


    useEffect(() => {

        localStorage.setItem(
            "studypilot-subjects",
            JSON.stringify(subjects)
        )

    }, [subjects])


    function addSubject(subject: NewSubject) {

        setSubjects((currentSubjects) => {

            const alreadyExists =
                currentSubjects.some(
                    (existingSubject) =>
                        existingSubject.name.toLowerCase() ===
                        subject.name.toLowerCase()
                )

            if (alreadyExists) {
                return currentSubjects
            }

            return [
                ...currentSubjects,
                {
                    ...subject,
                    id: crypto.randomUUID(),
                },
            ]
        })
    }


    function deleteSubject(id: string) {

        setSubjects((currentSubjects) =>
            currentSubjects.filter(
                (subject) => subject.id !== id
            )
        )
    }


    return (
        <SubjectContext.Provider
            value={{
                subjects,
                addSubject,
                deleteSubject,
            }}
        >
            {children}
        </SubjectContext.Provider>
    )
}


export function useSubjects() {

    const context = useContext(SubjectContext)

    if (!context) {
        throw new Error(
            "useSubjects must be used inside a SubjectProvider"
        )
    }

    return context
}
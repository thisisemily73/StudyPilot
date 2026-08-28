import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    setDoc,
} from "firebase/firestore"

import { db } from "../config/firebase"

import type { Task } from "../types/Task"
import type { Subject } from "../types/Subject"


export async function getTasks(userId: string) {

    const snapshot = await getDocs(
        collection(db, "users", userId, "tasks")
    )

    return snapshot.docs.map(
        (document) =>
            document.data() as Task
    )
}


export async function saveTask(
    userId: string,
    task: Task
) {

    await setDoc(
        doc(
            db,
            "users",
            userId,
            "tasks",
            task.id
        ),
        task
    )
}


export async function deleteTaskFromFirestore(
    userId: string,
    taskId: string
) {

    await deleteDoc(
        doc(
            db,
            "users",
            userId,
            "tasks",
            taskId
        )
    )
}


export async function getSubjects(
    userId: string
) {

    const snapshot = await getDocs(
        collection(db, "users", userId, "subjects")
    )

    return snapshot.docs.map(
        (document) =>
            document.data() as Subject
    )
}


export async function saveSubject(
    userId: string,
    subject: Subject
) {

    const cleanedSubject = Object.fromEntries(
        Object.entries(subject).filter(
            ([, value]) => value !== undefined
        )
    )

    await setDoc(
        doc(
            db,
            "users",
            userId,
            "subjects",
            subject.id
        ),
        cleanedSubject
    )
}


export async function deleteSubjectFromFirestore(
    userId: string,
    subjectId: string
) {

    await deleteDoc(
        doc(
            db,
            "users",
            userId,
            "subjects",
            subjectId
        )
    )
}
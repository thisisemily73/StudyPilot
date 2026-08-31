import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
} from "firebase/firestore"

import { db } from "../config/firebase"

import type { Task } from "../types/Task"
import type { Subject } from "../types/Subject"
import type { Event } from "../types/Event"
import type { StudyTimeSlot } from "../types/studyTime"


// Tasks

export async function getTasks(
    userId: string
): Promise<Task[]> {

    const snapshot = await getDocs(
        collection(
            db,
            "users",
            userId,
            "tasks"
        )
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

    const cleanTask =
        Object.fromEntries(
            Object.entries(task).filter(
                ([, value]) =>
                    value !== undefined
            )
        )

    await setDoc(
        doc(
            db,
            "users",
            userId,
            "tasks",
            task.id
        ),
        cleanTask
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


// Subjects

export async function getSubjects(
    userId: string
): Promise<Subject[]> {

    const snapshot = await getDocs(
        collection(
            db,
            "users",
            userId,
            "subjects"
        )
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

    await setDoc(
        doc(
            db,
            "users",
            userId,
            "subjects",
            subject.id
        ),
        subject
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


// Events

export async function getEvents(
    userId: string
): Promise<Event[]> {

    const snapshot = await getDocs(
        collection(
            db,
            "users",
            userId,
            "events"
        )
    )

    return snapshot.docs.map(
        (document) =>
            document.data() as Event
    )
}


export async function saveEvent(
    userId: string,
    event: Event
) {

    await setDoc(
        doc(
            db,
            "users",
            userId,
            "events",
            event.id
        ),
        event
    )
}


export async function deleteEventFromFirestore(
    userId: string,
    eventId: string
) {

    await deleteDoc(
        doc(
            db,
            "users",
            userId,
            "events",
            eventId
        )
    )
}


// Profile

export async function getProfile(
    userId: string
) {

    const snapshot = await getDoc(
        doc(
            db,
            "users",
            userId,
            "profile",
            "data"
        )
    )

    return snapshot.exists()
        ? snapshot.data()
        : null
}


export async function saveProfile(
    userId: string,
    profile: object
) {

    await setDoc(
        doc(
            db,
            "users",
            userId,
            "profile",
            "data"
        ),
        profile,
        { merge: true }
    )
}


// Settings

export async function getSettings(
    userId: string
) {

    const snapshot = await getDoc(
        doc(
            db,
            "users",
            userId,
            "settings",
            "data"
        )
    )

    return snapshot.exists()
        ? snapshot.data()
        : null
}


export async function saveSettings(
    userId: string,
    settings: object
) {

    await setDoc(
        doc(
            db,
            "users",
            userId,
            "settings",
            "data"
        ),
        settings,
        { merge: true }
    )
}


// School schedule

export async function getSchoolSchedule(
    userId: string
) {

    const snapshot = await getDoc(
        doc(
            db,
            "users",
            userId,
            "schoolSchedule",
            "data"
        )
    )

    return snapshot.exists()
        ? snapshot.data()
        : null
}


export async function saveSchoolSchedule(
    userId: string,
    schedule: object
) {

    await setDoc(
        doc(
            db,
            "users",
            userId,
            "schoolSchedule",
            "data"
        ),
        schedule,
        { merge: true }
    )
}


// Study time

export async function getStudyTime(
    userId: string
): Promise<StudyTimeSlot[]> {

    const snapshot = await getDocs(
        collection(
            db,
            "users",
            userId,
            "studyTime"
        )
    )

    return snapshot.docs.map(
        (document) =>
            document.data() as StudyTimeSlot
    )
}


export async function saveStudyTime(
    userId: string,
    studyTime: StudyTimeSlot
) {

    await setDoc(
        doc(
            db,
            "users",
            userId,
            "studyTime",
            studyTime.id
        ),
        studyTime
    )
}


export async function deleteStudyTimeFromFirestore(
    userId: string,
    studyTimeId: string
) {

    await deleteDoc(
        doc(
            db,
            "users",
            userId,
            "studyTime",
            studyTimeId
        )
    )
}
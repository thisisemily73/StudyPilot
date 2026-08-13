import type { Task } from "../types/Task"

export const initialTasks: Task[] = [
    {
        id: "1",
        title: "Stoichiometry practice",
        subject: "AP Chemistry",
        dueDate: "2026-08-11",
        estimatedMinutes: 25,
        completed: false,
    },

    {
        id: "2",
        title: "Calculus problem set",
        subject: "AP Calculus BC",
        dueDate: "2026-08-11",
        estimatedMinutes: 35,
        completed: false,
    },

    {
        id: "3",
        title: "Essay draft",
        subject: "AP Language",
        dueDate: "2026-08-12",
        estimatedMinutes: 20,
        completed: false,
    },

    {
        id: "4",
        title: "Lab preparation",
        subject: "AP Chemistry",
        dueDate: "2026-08-13",
        estimatedMinutes: 30,
        completed: false,
    },
]
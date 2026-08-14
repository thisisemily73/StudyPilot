import type { Task } from "../types/Task"

export type SubjectStatus =
    | "READY FOR TAKEOFF"
    | "IN FLIGHT"
    | "LANDED"
    | "DELAYED"
    | "AHEAD OF SCHEDULE"


export function getSubjectProgress(
    tasks: Task[],
    subjectName: string
): number {

    const subjectTasks = tasks.filter(
        (task) => task.subject === subjectName
    )

    if (subjectTasks.length === 0) {
        return 0
    }

    const completedTasks = subjectTasks.filter(
        (task) => task.completed
    )

    return Math.round(
        (completedTasks.length / subjectTasks.length) * 100
    )
}

export function getSubjectStatus(
    tasks: Task[],
    subjectName: string
): SubjectStatus {

    const subjectTasks = tasks.filter(
        (task) => task.subject === subjectName
    )

    // No tasks yet
    if (subjectTasks.length === 0) {
        return "READY FOR TAKEOFF"
    }


    // Check for overdue incomplete tasks
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const hasOverdueTasks = subjectTasks.some((task) => {

        if (task.completed) {
            return false
        }

        const dueDate = new Date(task.dueDate)
        dueDate.setHours(0, 0, 0, 0)

        return dueDate < today
    })

    if (hasOverdueTasks) {
        return "DELAYED"
    }


    // Check completion
    const completedTasks = subjectTasks.filter(
        (task) => task.completed
    )

    const completionPercent =
        (completedTasks.length / subjectTasks.length) * 100


    if (completionPercent === 100) {
        return "LANDED"
    }


    // Check if there are completed tasks before their due dates
    const completedEarly = subjectTasks.some((task) => {

        if (!task.completed) {
            return false
        }

        const dueDate = new Date(task.dueDate)
        dueDate.setHours(0, 0, 0, 0)

        return today < dueDate
    })

    if (completedEarly) {
        return "AHEAD OF SCHEDULE"
    }


    return "IN FLIGHT"
}
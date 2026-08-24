export const taskTypes = [
    "assessment",
    "homework",
    "classwork",
    "study",
] as const

export type TaskType =
    typeof taskTypes[number]


export const assessmentTypes = [
    "test",
    "quiz",
    "midterm",
    "final",
    "benchmark",
    "other",
] as const

export type AssessmentType =
    typeof assessmentTypes[number]


export type Task = {
    id: string
    title: string
    subject: string
    type: TaskType
    assessmentType?: AssessmentType
    dueDate: string
    dueTime: string
    estimatedMinutes: number
    completed: boolean
}
export type TaskType =
    | "assessment"
    | "homework"
    | "classwork"
    | "study"

export type AssessmentType =
    | "test"
    | "quiz"
    | "midterm"
    | "final"
    | "benchmark"
    | "other"

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
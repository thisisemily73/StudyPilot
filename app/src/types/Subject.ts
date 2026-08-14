export type Subject = {
    id: string
    name: string

    level: "regular" | "honors" | "ap"

    dualEnrollment: boolean

    apCourse?: string
    college?: string
}
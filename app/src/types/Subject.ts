export type ClassPeriod = {
    id: string
    day: number
    startTime: string
    endTime: string
}

export type AssignmentDeadline =
    | {
        type: "endOfDay"
    }
    | {
        type: "startOfPeriod"
    }
    | {
        type: "endOfPeriod"
    }
    | {
        type: "custom"
        time: string
    }

export type Subject = {
    id: string
    name: string

    level: "regular" | "honors" | "ap"

    dualEnrollment: boolean

    apCourse?: string
    college?: string

    classPeriods?: ClassPeriod[]

    classFormat?: "inPerson" | "online"

    assignmentDeadline?: AssignmentDeadline
}
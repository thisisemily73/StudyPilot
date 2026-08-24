export type EventType =
    | "class"
    | "sport"
    | "club"
    | "activity"
    | "personal"
    | "other"


export type Event = {
    id: string
    title: string
    type: EventType

    recurring: boolean

    // Used for one-time events
    date?: string

    // 0 = Monday, 1 = Tuesday, ... 6 = Sunday
    // Used for recurring events
    days?: number[]

    startTime: string
    endTime: string

    location?: string
}
import type { Event } from "../types/Event"


export function formatHour(hour: number) {

    const suffix =
        hour >= 12
            ? "PM"
            : "AM"

    const displayHour =
        hour % 12 || 12

    return `${displayHour} ${suffix}`
}


export function formatEventTime(
    startTime: string,
    endTime: string
) {

    function formatTime(time: string) {

        const [hours, minutes] =
            time.split(":").map(Number)

        const suffix =
            hours >= 12
                ? "PM"
                : "AM"

        const displayHour =
            hours % 12 || 12

        return `${displayHour}:${String(minutes).padStart(2, "0")} ${suffix}`
    }

    return `${formatTime(startTime)} – ${formatTime(endTime)}`
}


export function formatTaskTime(time: string) {

    const [hours, minutes] =
        time.split(":").map(Number)

    const suffix =
        hours >= 12
            ? "PM"
            : "AM"

    const displayHour =
        hours % 12 || 12

    return `${displayHour}:${String(minutes).padStart(2, "0")} ${suffix}`
}


export function timeToMinutes(time: string) {

    const [hours, minutes] =
        time.split(":").map(Number)

    return hours * 60 + minutes
}


export function minutesToTime(minutes: number) {

    const hours =
        Math.floor(minutes / 60)

    const mins =
        minutes % 60

    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
}


export function getSlotKey(
    day: number,
    minutes: number
) {
    return `${day}-${minutes}`
}


export function getMonday(date: Date) {

    const current =
        new Date(date)

    const day =
        current.getDay()

    const difference =
        day === 0
            ? -6
            : 1 - day

    current.setDate(
        current.getDate() + difference
    )

    current.setHours(
        0,
        0,
        0,
        0
    )

    return current
}


export function formatDateKey(date: Date) {

    const year =
        date.getFullYear()

    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0")

    const day =
        String(date.getDate())
            .padStart(2, "0")

    return `${year}-${month}-${day}`
}


export function getEventForDay(
    event: Event,
    dayIndex: number,
    weekDates: Date[]
) {

    const dateKey =
        formatDateKey(
            weekDates[dayIndex]
        )

    // One-time event
    if (!event.recurring) {
        return event.date === dateKey
    }

    // Recurring event
    return event.days?.includes(dayIndex) ?? false
}
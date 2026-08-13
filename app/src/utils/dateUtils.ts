export function startOfWeek(date: Date) {
    const result = new Date(date)
    const day = result.getDay()

    const daysFromMonday = day === 0 ? 6 : day - 1

    result.setDate(result.getDate() - daysFromMonday)
    result.setHours(0, 0, 0, 0)

    return result
}


export function addDays(date: Date, amount: number) {
    const result = new Date(date.getTime())

    result.setDate(result.getDate() + amount)

    return result
}


export function formatDateKey(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}


export function formatDayName(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
    }).format(date).toUpperCase()
}


export function formatDayNumber(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
    }).format(date)
}


export function formatWeekRange(startDate: Date) {
    const endDate = addDays(startDate, 6)

    const start = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
    }).format(startDate)

    const end = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
    }).format(endDate)

    return `${start.toUpperCase()} — ${end.toUpperCase()}`

}

export function formatUpcomingDate(dateString: string) {

    const date = new Date(`${dateString}T00:00:00`)

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
    })
        .format(date)
        .toUpperCase()
}


export function daysUntil(dateString: string) {

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const date = new Date(`${dateString}T00:00:00`)
    date.setHours(0, 0, 0, 0)

    const difference =
        date.getTime() - today.getTime()

    const days = Math.round(
        difference / (1000 * 60 * 60 * 24)
    )

    if (days === 0) return "TODAY"
    if (days === 1) return "TOMORROW"

    return `${days} DAYS`
}
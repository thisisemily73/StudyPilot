import { useEffect, useState } from "react"

import { useTasks } from "../context/TaskContext"
import { useSubjects } from "../context/SubjectContext"

import { useScheduleSettings } from "../context/ScheduleSettingsContext"
import { useStudyTime } from "../context/StudyTimeContext"


import type { Event } from "../types/Event"
import { useEvents } from "../context/EventContext"
import AddEventModal from "../components/AddEventModal"

const days = [
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN",
]

const QUARTER_MINUTES = 15

function formatHour(hour: number) {

    const suffix =
        hour >= 12
            ? "PM"
            : "AM"

    const displayHour =
        hour % 12 || 12

    return `${displayHour} ${suffix}`
}

function formatEventTime(
    startTime: string,
    endTime: string
) {
    function formatTime(time: string) {
        const [hours, minutes] = time
            .split(":")
            .map(Number)

        const suffix = hours >= 12 ? "PM" : "AM"
        const displayHour = hours % 12 || 12

        return `${displayHour}:${String(minutes).padStart(2, "0")} ${suffix}`
    }

    return `${formatTime(startTime)} – ${formatTime(endTime)}`
}

function formatTaskTime(time: string) {

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


function timeToMinutes(time: string) {

    const [hours, minutes] =
        time.split(":").map(Number)

    return hours * 60 + minutes
}


function minutesToTime(minutes: number) {

    const hours =
        Math.floor(minutes / 60)

    const mins =
        minutes % 60

    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
}


function getSlotKey(
    day: number,
    minutes: number
) {
    return `${day}-${minutes}`
}

function getMonday(date: Date) {

    const current = new Date(date)

    const day = current.getDay()

    const difference =
        day === 0
            ? -6
            : 1 - day

    current.setDate(
        current.getDate() + difference
    )

    current.setHours(0, 0, 0, 0)

    return current
}


function formatDateKey(date: Date) {

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

function getEventForDay(
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


function Schedule() {

    // DEFINITIONS/CONST

    const { events } = useEvents()

    const [showEventModal, setShowEventModal] =
        useState(false)

    const { tasks } = useTasks()
    const { subjects } = useSubjects()

    useEffect(() => {
        setSubjectFilters(
            new Set(
                subjects.map(
                    (subject) => subject.name
                )
            )
        )
    }, [subjects])

    const [weekOffset, setWeekOffset] =
        useState(0)

    const weekStart = (() => {
        const date = getMonday(new Date())

        date.setDate(
            date.getDate() +
            weekOffset * 7
        )

        return date
    })()

    const weekDates =
        days.map((_, index) => {

            const date =
                new Date(weekStart)

            date.setDate(
                weekStart.getDate() + index
            )

            return date
        })

    const {
        dayStart,
        dayEnd,
    } = useScheduleSettings()

    const configuredStartHour =
        Math.floor(
            timeToMinutes(dayStart) / 60
        )

    const configuredEndHour =
        Math.ceil(
            timeToMinutes(dayEnd) / 60
        )


    /*
     * Find the earliest and latest visible
     * task/event times for this week.
     */

    const visibleTimes: number[] = []

    const {
        studyTime,
        addStudyTime,
        deleteStudyTime,
    } = useStudyTime()

    const [showTasks, setShowTasks] =
        useState(true)


    const [editingStudyTime, setEditingStudyTime] =
        useState(false)

    const [selectedSlots, setSelectedSlots] =
        useState<Set<string>>(new Set())

    const [dragging, setDragging] =
        useState(false)

    const [dragMode, setDragMode] =
        useState<"add" | "remove" | null>(null)

    const [subjectFilters, setSubjectFilters] =
        useState<Set<string>>(
            new Set()
        )

    const [eventFilters, setEventFilters] =
        useState<Set<Event["type"]>>(
            new Set([
                "class",
                "sport",
                "club",
                "activity",
                "personal",
                "other",
            ])
        )

    // FUNCTIONS

    function isEventVisible(
        event: Event
    ) {
        return eventFilters.has(event.type)
    }


    function isTaskVisible(
        task: typeof tasks[number]
    ) {
        if (!showTasks) {
            return false
        }

        return subjectFilters.has(
            task.subject
        )
    }


    events.forEach((event) => {

        if (!eventFilters.has(event.type)) {
            return
        }

        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {

            if (
                getEventForDay(
                    event,
                    dayIndex,
                    weekDates
                )
            ) {
                visibleTimes.push(
                    timeToMinutes(event.startTime)
                )

                visibleTimes.push(
                    timeToMinutes(event.endTime)
                )
            }
        }
    })


    if (showTasks) {

        tasks.forEach((task) => {

            if (!isTaskVisible(task)) {
                return
            }

            if (
                task.dueTime &&
                task.dueDate
            ) {
                visibleTimes.push(
                    timeToMinutes(task.dueTime)
                )

                visibleTimes.push(
                    timeToMinutes(task.dueTime) +
                    task.estimatedMinutes
                )
            }
        })
    }


    const earliestVisibleTime =
        visibleTimes.length > 0
            ? Math.min(...visibleTimes)
            : configuredStartHour * 60


    const latestVisibleTime =
        visibleTimes.length > 0
            ? Math.max(...visibleTimes)
            : configuredEndHour * 60


    const startHour =
        Math.min(
            configuredStartHour,
            Math.floor(
                earliestVisibleTime / 60
            )
        )


    const endHour =
        Math.max(
            configuredEndHour,
            Math.ceil(
                latestVisibleTime / 60
            )
        )

    const [showFilters, setShowFilters] =
        useState(true)

    const eventTypes: {
        value: Event["type"]
        label: string
    }[] = [
            { value: "class", label: "Classes" },
            { value: "sport", label: "Sports" },
            { value: "club", label: "Clubs" },
            { value: "activity", label: "Activities" },
            { value: "personal", label: "Personal" },
            { value: "other", label: "Other" },
        ]


    /* OPEN EDITOR */

    function openStudyTimeEditor() {

        const slots =
            new Set<string>()

        studyTime.forEach((slot) => {

            const start =
                timeToMinutes(
                    slot.startTime
                )

            const end =
                timeToMinutes(
                    slot.endTime
                )

            for (
                let minutes = start;
                minutes < end;
                minutes += QUARTER_MINUTES
            ) {

                slots.add(
                    getSlotKey(
                        slot.day,
                        minutes
                    )
                )
            }
        })

        setSelectedSlots(slots)
        setEditingStudyTime(true)
    }


    /* SELECT / DESELECT */

    function handleSlotDown(
        dayIndex: number,
        minutes: number
    ) {

        const key =
            getSlotKey(
                dayIndex,
                minutes
            )

        const alreadySelected =
            selectedSlots.has(key)

        setDragMode(
            alreadySelected
                ? "remove"
                : "add"
        )

        setDragging(true)

        setSelectedSlots((current) => {

            const next =
                new Set(current)

            if (alreadySelected) {
                next.delete(key)
            } else {
                next.add(key)
            }

            return next
        })
    }


    /* DRAG */

    function handleSlotEnter(
        dayIndex: number,
        minutes: number
    ) {

        if (
            !dragging ||
            !dragMode
        ) {
            return
        }

        const key =
            getSlotKey(
                dayIndex,
                minutes
            )

        setSelectedSlots((current) => {

            const next =
                new Set(current)

            if (dragMode === "add") {
                next.add(key)
            } else {
                next.delete(key)
            }

            return next
        })
    }


    function stopDragging() {
        setDragging(false)
        setDragMode(null)
    }


    /* SAVE */

    function saveStudyTime() {

        /*
         * Remove the old study-time ranges.
         */

        studyTime.forEach((slot) => {
            deleteStudyTime(slot.id)
        })


        /*
         * Turn the selected 15-minute blocks
         * back into continuous ranges.
         */

        days.forEach((_, dayIndex) => {

            const selectedMinutes =
                Array.from(
                    selectedSlots
                )
                    .filter((key) =>
                        key.startsWith(
                            `${dayIndex}-`
                        )
                    )
                    .map((key) =>
                        Number(
                            key.split("-")[1]
                        )
                    )
                    .sort((a, b) => a - b)


            if (selectedMinutes.length === 0) {
                return
            }


            let rangeStart =
                selectedMinutes[0]

            let previous =
                selectedMinutes[0]


            for (
                let i = 1;
                i <= selectedMinutes.length;
                i++
            ) {

                const current =
                    selectedMinutes[i]


                /*
                 * If there is a gap, save the
                 * previous continuous range.
                 */

                if (
                    current !==
                    previous + QUARTER_MINUTES
                ) {

                    addStudyTime(
                        dayIndex,
                        minutesToTime(
                            rangeStart
                        ),
                        minutesToTime(
                            previous +
                            QUARTER_MINUTES
                        )
                    )

                    rangeStart =
                        current
                }

                previous =
                    current
            }

        })


        setEditingStudyTime(false)
    }

    return (
        <section className="schedule">

            {/* HEADER */}

            <div className="schedule-header">

                <div>

                    <span className="schedule-label">
                        FLIGHT SCHEDULE
                    </span>

                    <h1>
                        Your week.
                    </h1>

                    <p>
                        See where your time is going
                        and where you can make room to study.
                    </p>

                </div>


                <div className="schedule-actions">

                    <button
                        className="schedule-button"
                        onClick={() => setShowEventModal(true)}
                    >
                        + Add event
                    </button>


                    <button
                        className="schedule-button primary"
                        onClick={
                            openStudyTimeEditor
                        }
                    >
                        Edit study time
                    </button>

                </div>

            </div>


            {/* EDITING BAR */}

            {editingStudyTime && (

                <div className="study-time-editing-bar">

                    <div>

                        <strong>
                            Setting study windows
                        </strong>

                        <span>
                            Click or drag to choose when
                            you're available to study.
                        </span>

                    </div>


                    <div>

                        <button
                            onClick={() =>
                                setEditingStudyTime(false)
                            }
                        >
                            Cancel
                        </button>

                        <button
                            className="primary"
                            onClick={
                                saveStudyTime
                            }
                        >
                            Save study time
                        </button>

                    </div>

                </div>

            )}


            {/* WEEK CONTROLS */}

            <div className="schedule-controls">

                <button
                    className="schedule-arrow"
                    onClick={() =>
                        setWeekOffset(
                            (current) => current - 1
                        )
                    }
                >
                    ←
                </button>

                <span>
                    {weekOffset === 0
                        ? "THIS WEEK"
                        : weekStart.toLocaleDateString(
                            "en-US",
                            {
                                month: "long",
                                day: "numeric",
                            }
                        ).toUpperCase()
                    }
                </span>

                <button
                    className="schedule-arrow"
                    onClick={() =>
                        setWeekOffset(
                            (current) => current + 1
                        )
                    }
                >
                    →
                </button>

            </div>

            <div className="schedule-filters">

                <div className="schedule-filter-group">

                    <span className="schedule-filter-label">
                        EVENTS
                    </span>

                    {eventTypes.map((eventType) => {

                        const active =
                            eventFilters.has(
                                eventType.value
                            )

                        return (
                            <button
                                key={eventType.value}
                                className={
                                    active
                                        ? "schedule-filter active"
                                        : "schedule-filter"
                                }
                                onClick={() => {

                                    setEventFilters(
                                        (current) => {

                                            const next =
                                                new Set(current)

                                            if (
                                                next.has(
                                                    eventType.value
                                                )
                                            ) {
                                                next.delete(
                                                    eventType.value
                                                )
                                            } else {
                                                next.add(
                                                    eventType.value
                                                )
                                            }

                                            return next
                                        }
                                    )
                                }}
                            >
                                {eventType.label}
                            </button>
                        )
                    })}

                </div>

                {/* SCHEDULE FILTERS */}

                <div className="schedule-filter-group">

                    <span className="schedule-filter-label">
                        TASKS
                    </span>

                    <button
                        className={
                            showTasks
                                ? "schedule-filter active"
                                : "schedule-filter"
                        }
                        onClick={() =>
                            setShowTasks(
                                (current) => !current
                            )
                        }
                    >
                        Tasks
                    </button>

                </div>


                {subjects.length > 0 && showTasks && (

                    <div className="schedule-filter-group">

                        <span className="schedule-filter-label">
                            SUBJECTS
                        </span>

                        {subjects.map((subject) => {

                            const subjectName =
                                subject.name

                            const active =
                                subjectFilters.has(
                                    subjectName
                                )

                            return (
                                <button
                                    key={subjectName}
                                    className={
                                        active
                                            ? "schedule-filter active"
                                            : "schedule-filter"
                                    }
                                    onClick={() => {

                                        setSubjectFilters(
                                            (current) => {

                                                const next =
                                                    new Set(current)

                                                if (
                                                    next.has(
                                                        subjectName
                                                    )
                                                ) {
                                                    next.delete(
                                                        subjectName
                                                    )
                                                } else {
                                                    next.add(
                                                        subjectName
                                                    )
                                                }

                                                return next
                                            }
                                        )
                                    }}
                                >
                                    {subjectName}
                                </button>
                            )
                        })}

                    </div>
                )}

            </div>

            {/* CALENDAR */}

            <div className="schedule-calendar">

                {/* DAYS */}

                <div className="schedule-calendar-header">

                    <div className="schedule-time-column" />

                    {days.map((day, index) => (

                        <div
                            className="schedule-day-header"
                            key={day}
                        >

                            <span>
                                {day}
                            </span>

                            <strong>
                                {weekDates[index].getDate()}
                            </strong>

                        </div>

                    ))}

                </div>


                {/* GRID */}

                <div
                    className="schedule-calendar-body"
                    onPointerUp={stopDragging}
                    onPointerLeave={stopDragging}
                >

                    {/* GRID LINES */}

                    {Array.from(
                        {
                            length:
                                endHour -
                                startHour,
                        },
                        (_, hourIndex) => {

                            const hour =
                                startHour +
                                hourIndex

                            return (

                                <div
                                    className="schedule-hour"
                                    key={hour}
                                >

                                    <div className="schedule-time">
                                        {formatHour(hour)}
                                    </div>

                                    <div className="schedule-hour-grid">

                                        {days.map(
                                            (_, dayIndex) => (

                                                <div
                                                    className="schedule-hour-column"
                                                    key={dayIndex}
                                                >

                                                    {Array.from(
                                                        {
                                                            length: 4,
                                                        },
                                                        (_, quarterIndex) => {

                                                            const minutes =
                                                                hour * 60 +
                                                                quarterIndex *
                                                                QUARTER_MINUTES

                                                            const key =
                                                                getSlotKey(
                                                                    dayIndex,
                                                                    minutes
                                                                )

                                                            const selected =
                                                                selectedSlots.has(
                                                                    key
                                                                )

                                                            return (

                                                                <div
                                                                    className={[
                                                                        "schedule-quarter",

                                                                        editingStudyTime
                                                                            ? "study-time-editable"
                                                                            : "",

                                                                        selected &&
                                                                            editingStudyTime
                                                                            ? "study-time-selected"
                                                                            : "",
                                                                    ]
                                                                        .filter(Boolean)
                                                                        .join(" ")}

                                                                    key={minutes}

                                                                    onPointerDown={() => {

                                                                        if (
                                                                            !editingStudyTime
                                                                        ) {
                                                                            return
                                                                        }

                                                                        handleSlotDown(
                                                                            dayIndex,
                                                                            minutes
                                                                        )
                                                                    }}

                                                                    onPointerEnter={() => {

                                                                        if (
                                                                            !editingStudyTime
                                                                        ) {
                                                                            return
                                                                        }

                                                                        handleSlotEnter(
                                                                            dayIndex,
                                                                            minutes
                                                                        )
                                                                    }}
                                                                />

                                                            )
                                                        }
                                                    )}

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>
                            )
                        }
                    )}


                    {/* EVENTS */}

                    <div className="schedule-events-layer">

                        {days.map((_, dayIndex) => {

                            const dateKey =
                                formatDateKey(
                                    weekDates[dayIndex]
                                )

                            const dayEvents =
                                events.filter((event) => {

                                    if (!isEventVisible(event)) {
                                        return false
                                    }

                                    if (event.recurring) {
                                        return (
                                            event.days?.includes(
                                                dayIndex
                                            ) ?? false
                                        )
                                    }

                                    return event.date === dateKey
                                })

                            return (

                                <div
                                    className="schedule-events-column"
                                    key={dayIndex}
                                >

                                    {dayEvents.map((event) => {

                                        const eventStart =
                                            timeToMinutes(
                                                event.startTime
                                            )

                                        const eventEnd =
                                            timeToMinutes(
                                                event.endTime
                                            )

                                        const top =
                                            (
                                                eventStart -
                                                startHour * 60
                                            ) *
                                            (88 / 60)

                                        const height =
                                            (
                                                eventEnd -
                                                eventStart
                                            ) *
                                            (88 / 60)

                                        return (

                                            <div
                                                key={event.id}
                                                className={`schedule-event schedule-event-${event.type}`}
                                                style={{
                                                    top:
                                                        `${top}px`,
                                                    height:
                                                        `${height}px`,
                                                }}
                                            >

                                                <strong>
                                                    {event.title}
                                                </strong>

                                                <span>
                                                    {formatEventTime(event.startTime, event.endTime)}
                                                </span>

                                                {event.location && (
                                                    <span>
                                                        {event.location}
                                                    </span>
                                                )}

                                            </div>

                                        )
                                    })}

                                    {tasks
                                        .filter((task) => {

                                            if (!isTaskVisible(task)) {
                                                return false
                                            }

                                            return (
                                                task.dueDate ===
                                                dateKey
                                            )
                                        })
                                        .map((task) => {

                                            const taskStart =
                                                timeToMinutes(
                                                    task.dueTime
                                                )

                                            const taskEnd =
                                                taskStart +
                                                task.estimatedMinutes

                                            const top =
                                                (
                                                    taskStart -
                                                    startHour * 60
                                                ) *
                                                (88 / 60)

                                            const height =
                                                (
                                                    taskEnd -
                                                    taskStart
                                                ) *
                                                (88 / 60)

                                            return (

                                                <div
                                                    key={`task-${task.id}`}
                                                    className="schedule-task"
                                                    style={{
                                                        top:
                                                            `${top}px`,
                                                        height:
                                                            `${height}px`,
                                                    }}
                                                >

                                                    <strong>
                                                        {task.title}
                                                    </strong>

                                                    <span>
                                                        {formatTaskTime(
                                                            task.dueTime
                                                        )}
                                                    </span>

                                                    <span>
                                                        {task.subject}
                                                    </span>

                                                </div>

                                            )
                                        })}

                                </div>
                            )
                        })}

                    </div>

                </div>

            </div>

            {showEventModal && (
                <AddEventModal
                    onClose={() =>
                        setShowEventModal(false)
                    }
                />
            )}

        </section>
    )
}

export default Schedule
import { useEffect, useRef, useState } from "react"

import { useTasks } from "../context/TaskContext"
import { useSubjects } from "../context/SubjectContext"

import { useSettings } from "../context/SettingsContext"
import { useStudyTime } from "../context/StudyTimeContext"


import type { Event } from "../types/Event"
import { useEvents } from "../context/EventContext"
import AddEventModal from "../components/AddEventModal"


import {
    taskTypes,
    assessmentTypes,
    type TaskType,
    type AssessmentType,
} from "../types/Task"


export const days = [
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN",
]

const QUARTER_MINUTES = 15

import {
    formatHour,
    formatEventTime,
    formatTaskTime,
    timeToMinutes,
    minutesToTime,
    getSlotKey,
    getMonday,
    formatDateKey,
    getEventForDay,
} from "../utils/schedule"


function Schedule() {

    // DEFINITIONS/CONST

    const { events } = useEvents()

    const [showEventModal, setShowEventModal] =
        useState(false)

    const [editingEvent, setEditingEvent] =
        useState<Event | undefined>(undefined)

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
    } = useSettings()

    const configuredStartHour =
        Math.floor(
            timeToMinutes(dayStart) / 60
        )

    const configuredEndHour =
        Math.ceil(
            timeToMinutes(dayEnd) / 60
        )

    const {
        studyTime,
        addStudyTime,
        deleteStudyTime,
    } = useStudyTime()

    const [showTasks] =
        useState(true)

    const [taskTypeFilters, setTaskTypeFilters] =
        useState<Set<TaskType>>(
            new Set(taskTypes)
        )

    const [assessmentFilters, setAssessmentFilters] =
        useState<Set<AssessmentType>>(
            new Set(assessmentTypes)
        )

    const [showAssessmentFilters, setShowAssessmentFilters] =
        useState(false)


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

    const [openFilter, setOpenFilter] =
        useState<
            "events" |
            "tasks" |
            "subjects" |
            null
        >(null)

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

    // FUNCTIONS

    function openEventEditor(event: Event) {
        setEditingEvent(event)
        setShowEventModal(true)
    }

    function isSlotBlockedByEvent(
        dayIndex: number,
        minutes: number
    ) {

        const dateKey =
            formatDateKey(
                weekDates[dayIndex]
            )

        return events.some((event) => {

            if (!isEventVisible(event)) {
                return false
            }

            const happensOnDay =
                event.recurring
                    ? event.days?.includes(dayIndex) ?? false
                    : event.date === dateKey

            if (!happensOnDay) {
                return false
            }

            const eventStart =
                timeToMinutes(event.startTime)

            const eventEnd =
                timeToMinutes(event.endTime)

            return (
                minutes < eventEnd &&
                minutes + QUARTER_MINUTES > eventStart
            )
        })
    }

    function isEventVisible(
        event: Event
    ) {
        return eventFilters.has(event.type)
    }


    function isTaskVisible(
        task: typeof tasks[number]
    ) {

        if (
            !taskTypeFilters.has(
                task.type
            )
        ) {
            return false
        }

        if (
            task.type === "assessment" &&
            task.assessmentType &&
            !assessmentFilters.has(
                task.assessmentType
            )
        ) {
            return false
        }

        return subjectFilters.has(
            task.subject
        )
    }

    /*
 * Find the earliest and latest visible
 * task/event times for this week.
 */

    const visibleTimes: number[] = []


    // EVENTS

    events.forEach((event) => {

        if (!eventFilters.has(event.type)) {
            return
        }

        for (
            let dayIndex = 0;
            dayIndex < 7;
            dayIndex++
        ) {

            if (
                getEventForDay(
                    event,
                    dayIndex,
                    weekDates
                )
            ) {

                visibleTimes.push(
                    timeToMinutes(
                        event.startTime
                    )
                )

                visibleTimes.push(
                    timeToMinutes(
                        event.endTime
                    )
                )
            }
        }
    })


    // TASKS

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
                    timeToMinutes(
                        task.dueTime
                    )
                )

                visibleTimes.push(
                    timeToMinutes(
                        task.dueTime
                    ) +
                    task.estimatedMinutes
                )
            }
        })
    }


    // NOW calculate the calendar boundaries

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

    const filterRef =
        useRef<HTMLDivElement>(null)

    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {

            if (
                filterRef.current &&
                !filterRef.current.contains(
                    event.target as Node
                )
            ) {
                setOpenFilter(null)
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        )

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            )
        }

    }, [])




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

        if (
            isSlotBlockedByEvent(
                dayIndex,
                minutes
            )
        ) {
            return
        }

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

        if (
            isSlotBlockedByEvent(
                dayIndex,
                minutes
            )
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

                    <p className="schedule-hint">
                        Click an event to edit it.
                    </p>

                </div>


                <div className="schedule-actions">

                    <button
                        className="schedule-button"
                        onClick={() => {
                            setEditingEvent(undefined)
                            setShowEventModal(true)
                        }}
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

            <div
                className="schedule-filters"
                ref={filterRef}
            >

                {/* EVENTS DROPDOWN */}

                <div className="schedule-filter-dropdown">

                    <button
                        className="schedule-filter-dropdown-trigger"
                        onClick={() =>
                            setOpenFilter(
                                openFilter === "events"
                                    ? null
                                    : "events"
                            )
                        }
                    >
                        <span>EVENTS</span>
                        <span className="schedule-filter-chevron" />
                    </button>

                    {openFilter === "events" && (

                        <div className="schedule-filter-menu">

                            <div className="schedule-filter-menu-actions">

                                <button
                                    onClick={() =>
                                        setEventFilters(
                                            new Set(
                                                eventTypes.map(
                                                    (eventType) =>
                                                        eventType.value
                                                )
                                            )
                                        )
                                    }
                                >
                                    Select all
                                </button>

                                <button
                                    onClick={() =>
                                        setEventFilters(
                                            new Set()
                                        )
                                    }
                                >
                                    Remove filters
                                </button>

                            </div>

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
                                                ? "schedule-filter-option active"
                                                : "schedule-filter-option"
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

                                        <span>
                                            {eventType.label}
                                        </span>

                                        {active && (
                                            <span className="schedule-filter-check">
                                                ✓
                                            </span>
                                        )}

                                    </button>
                                )
                            })}

                        </div>
                    )}

                </div>


                {/* TASKS DROPDOWN */}

                <div className="schedule-filter-dropdown">

                    <button
                        className="schedule-filter-dropdown-trigger"
                        onClick={() =>
                            setOpenFilter(
                                openFilter === "tasks"
                                    ? null
                                    : "tasks"
                            )
                        }
                    >
                        <span>TASKS</span>
                        <span className="schedule-filter-chevron" />
                    </button>


                    {openFilter === "tasks" && (

                        <div className="schedule-filter-menu">

                            <div className="schedule-filter-menu-actions">

                                <button
                                    onClick={() =>
                                        setTaskTypeFilters(
                                            new Set(taskTypes)
                                        )
                                    }
                                >
                                    Select all
                                </button>

                                <button
                                    onClick={() =>
                                        setTaskTypeFilters(
                                            new Set()
                                        )
                                    }
                                >
                                    Remove filters
                                </button>

                            </div>

                            {/* ASSESSMENT */}
                            <button
                                className="schedule-filter-option"
                                onClick={() =>
                                    setShowAssessmentFilters(
                                        current => !current
                                    )
                                }
                            >
                                <span>Assessment</span>

                                <span className="schedule-filter-submenu-arrow">
                                    ›
                                </span>
                            </button>


                            {/* HOMEWORK */}

                            <button
                                className={
                                    taskTypeFilters.has("homework")
                                        ? "schedule-filter-option active"
                                        : "schedule-filter-option"
                                }
                                onClick={() => {

                                    setTaskTypeFilters(
                                        (current) => {

                                            const next =
                                                new Set(current)

                                            if (
                                                next.has("homework")
                                            ) {
                                                next.delete(
                                                    "homework"
                                                )
                                            } else {
                                                next.add(
                                                    "homework"
                                                )
                                            }

                                            return next
                                        }
                                    )
                                }}
                            >
                                <span>Homework</span>

                                {taskTypeFilters.has("homework") && (
                                    <span className="schedule-filter-check">
                                        ✓
                                    </span>
                                )}

                            </button>


                            {/* CLASSWORK */}

                            <button
                                className={
                                    taskTypeFilters.has("classwork")
                                        ? "schedule-filter-option active"
                                        : "schedule-filter-option"
                                }
                                onClick={() => {

                                    setTaskTypeFilters(
                                        (current) => {

                                            const next =
                                                new Set(current)

                                            if (
                                                next.has("classwork")
                                            ) {
                                                next.delete(
                                                    "classwork"
                                                )
                                            } else {
                                                next.add(
                                                    "classwork"
                                                )
                                            }

                                            return next
                                        }
                                    )
                                }}
                            >
                                <span>Classwork</span>

                                {taskTypeFilters.has("classwork") && (
                                    <span className="schedule-filter-check">
                                        ✓
                                    </span>
                                )}

                            </button>


                            {/* STUDY */}

                            <button
                                className={
                                    taskTypeFilters.has("study")
                                        ? "schedule-filter-option active"
                                        : "schedule-filter-option"
                                }
                                onClick={() => {

                                    setTaskTypeFilters(
                                        (current) => {

                                            const next =
                                                new Set(current)

                                            if (
                                                next.has("study")
                                            ) {
                                                next.delete(
                                                    "study"
                                                )
                                            } else {
                                                next.add(
                                                    "study"
                                                )
                                            }

                                            return next
                                        }
                                    )
                                }}
                            >
                                <span>Study</span>

                                {taskTypeFilters.has("study") && (
                                    <span className="schedule-filter-check">
                                        ✓
                                    </span>
                                )}

                            </button>


                            {/* ASSESSMENT SUBMENU */}
                            {showAssessmentFilters && (

                                <div className="schedule-assessment-menu">

                                    <div className="schedule-assessment-header">
                                        Assessment
                                    </div>

                                    <div className="schedule-assessment-actions">

                                        <button
                                            onClick={() =>
                                                setAssessmentFilters(
                                                    new Set(assessmentTypes)
                                                )
                                            }
                                        >
                                            Select all
                                        </button>

                                        <button
                                            onClick={() =>
                                                setAssessmentFilters(
                                                    new Set()
                                                )
                                            }
                                        >
                                            Remove filters
                                        </button>

                                    </div>

                                    {assessmentTypes.map(
                                        (assessmentType) => {

                                            const active =
                                                assessmentFilters.has(
                                                    assessmentType
                                                )

                                            return (
                                                <button
                                                    key={assessmentType}
                                                    className={
                                                        active
                                                            ? "schedule-assessment-option active"
                                                            : "schedule-assessment-option"
                                                    }
                                                    onClick={() => {

                                                        setAssessmentFilters(
                                                            current => {

                                                                const next =
                                                                    new Set(
                                                                        current
                                                                    )

                                                                if (
                                                                    next.has(
                                                                        assessmentType
                                                                    )
                                                                ) {
                                                                    next.delete(
                                                                        assessmentType
                                                                    )
                                                                } else {
                                                                    next.add(
                                                                        assessmentType
                                                                    )
                                                                }

                                                                return next
                                                            }
                                                        )
                                                    }}
                                                >
                                                    <span>
                                                        {assessmentType}
                                                    </span>

                                                    {active && (
                                                        <span>✓</span>
                                                    )}
                                                </button>
                                            )
                                        }
                                    )}

                                </div>
                            )}

                        </div>
                    )}


                </div>


                {/* SUBJECTS DROPDOWN */}

                {subjects.length > 0 && showTasks && (

                    <div className="schedule-filter-dropdown">

                        <button
                            className="schedule-filter-dropdown-trigger"
                            onClick={() =>
                                setOpenFilter(
                                    openFilter === "subjects"
                                        ? null
                                        : "subjects"
                                )
                            }
                        >
                            <span>SUBJECTS</span>
                            <span className="schedule-filter-chevron" />
                        </button>

                        {openFilter === "subjects" && (

                            <div className="schedule-filter-menu">

                                <div className="schedule-filter-menu-actions">

                                    <button
                                        onClick={() =>
                                            setSubjectFilters(
                                                new Set(
                                                    subjects.map(
                                                        (subject) =>
                                                            subject.name
                                                    )
                                                )
                                            )
                                        }
                                    >
                                        Select all
                                    </button>

                                    <button
                                        onClick={() =>
                                            setSubjectFilters(
                                                new Set()
                                            )
                                        }
                                    >
                                        Remove filters
                                    </button>

                                </div>

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
                                                    ? "schedule-filter-option active"
                                                    : "schedule-filter-option"
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

                                            <span>
                                                {subjectName}
                                            </span>

                                            {active && (
                                                <span className="schedule-filter-check">
                                                    ✓
                                                </span>
                                            )}

                                        </button>
                                    )
                                })}

                            </div>
                        )}

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

                                                            const blocked =
                                                                isSlotBlockedByEvent(
                                                                    dayIndex,
                                                                    minutes
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

                                                                        blocked &&
                                                                            editingStudyTime
                                                                            ? "study-time-blocked"
                                                                            : "",
                                                                    ]
                                                                        .filter(Boolean)
                                                                        .join(" ")}

                                                                    onPointerDown={() => {

                                                                        if (
                                                                            !editingStudyTime ||
                                                                            blocked
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
                                                                            !editingStudyTime ||
                                                                            blocked
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
                                                    top: `${top}px`,
                                                    height: `${height}px`,
                                                }}
                                                onClick={() => openEventEditor(event)}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        openEventEditor(event)
                                                    }
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

            {
                showEventModal && (
                    <AddEventModal
                        event={editingEvent}
                        onClose={() => {
                            setShowEventModal(false)
                            setEditingEvent(undefined)
                        }}
                    />
                )
            }

        </section >
    )
}

export default Schedule
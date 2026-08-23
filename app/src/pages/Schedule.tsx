import { useState } from "react"

import { useScheduleSettings } from "../context/ScheduleSettingsContext"
import { useStudyTime } from "../context/StudyTimeContext"

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


function Schedule() {

    const {
        dayStart,
        dayEnd,
    } = useScheduleSettings()

    const {
        studyTime,
        addStudyTime,
        deleteStudyTime,
    } = useStudyTime()


    const [editingStudyTime, setEditingStudyTime] =
        useState(false)

    const [selectedSlots, setSelectedSlots] =
        useState<Set<string>>(new Set())

    const [dragging, setDragging] =
        useState(false)

    const [dragMode, setDragMode] =
        useState<"add" | "remove" | null>(null)


    const startHour =
        Math.floor(
            timeToMinutes(dayStart) / 60
        )

    const endHour =
        Math.ceil(
            timeToMinutes(dayEnd) / 60
        )


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

                <button className="schedule-arrow">
                    ←
                </button>

                <span>
                    THIS WEEK
                </span>

                <button className="schedule-arrow">
                    →
                </button>

            </div>


            {/* CALENDAR */}

            <div className="schedule-calendar">

                {/* DAYS */}

                <div className="schedule-calendar-header">

                    <div className="schedule-time-column" />

                    {days.map((day) => (

                        <div
                            className="schedule-day-header"
                            key={day}
                        >
                            {day}
                        </div>

                    ))}

                </div>


                {/* GRID */}

                <div
                    className="schedule-calendar-body"
                    onPointerUp={
                        stopDragging
                    }
                    onPointerLeave={
                        stopDragging
                    }
                >

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

                </div>

            </div>

        </section>
    )
}

export default Schedule
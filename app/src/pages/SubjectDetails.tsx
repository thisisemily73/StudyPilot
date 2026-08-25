import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useSubjects } from "../context/SubjectContext"
import { useSchoolSchedule } from "../context/SchoolScheduleContext"

const weekdays = [
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
]

function formatTime(time: string) {

    const [hours, minutes] =
        time.split(":").map(Number)

    const suffix =
        hours >= 12 ? "PM" : "AM"

    const displayHour =
        hours % 12 || 12

    return `${displayHour}:${minutes
        .toString()
        .padStart(2, "0")} ${suffix}`
}

function SubjectDetails() {

    const { subjectId } = useParams()
    const navigate = useNavigate()

    const {
        subjects,
        updateSubject,
    } = useSubjects()

    const {
        schoolStart,
        schoolEnd,
    } = useSchoolSchedule()

    const [selectedDays, setSelectedDays] =
        useState<number[]>([])

    const [startTime, setStartTime] =
        useState(schoolStart)

    const [endTime, setEndTime] =
        useState(schoolEnd)

    const subject = subjects.find(
        (subject) => subject.id === subjectId
    )

    if (!subject) {
        return (
            <section className="subject-details">

                <h1>
                    Subject not found.
                </h1>

                <button
                    onClick={() =>
                        navigate(
                            "/StudyPilot/app/subjects"
                        )
                    }
                >
                    Back to subjects
                </button>

            </section>
        )
    }

    const currentSubject = subject


    function addClassPeriod() {

        if (
            selectedDays.length === 0 ||
            startTime >= endTime
        ) {
            return
        }

        const existingPeriods =
            currentSubject.classPeriods ?? []

        const newPeriods =
            selectedDays.map((day) => ({
                id: crypto.randomUUID(),
                day,
                startTime,
                endTime,
            }))

        updateSubject(
            currentSubject.id,
            {
                classPeriods: [
                    ...existingPeriods,
                    ...newPeriods,
                ],
            }
        )

        setSelectedDays([])
    }


    function deleteClassPeriod(id: string) {

        updateSubject(
            currentSubject.id,
            {
                classPeriods:
                    (currentSubject.classPeriods ?? [])
                        .filter(
                            (period) =>
                                period.id !== id
                        ),
            }
        )
    }


    return (
        <section className="subject-details">

            {/* HEADER */}

            <div className="subject-details-header">

                <button
                    className="subject-back"
                    onClick={() =>
                        navigate(
                            "/StudyPilot/app/subjects"
                        )
                    }
                >
                    ← Destinations
                </button>

                <span className="subjects-label">
                    {subject.level === "ap"
                        ? "ADVANCED PLACEMENT"
                        : subject.level === "honors"
                            ? "HONORS / ACCELERATED"
                            : "REGULAR"}
                </span>

                <h1>
                    {subject.name}
                </h1>

                <p>
                    Set up how {subject.name} fits into your week.
                </p>

            </div>


            {/* CLASS SCHEDULE */}

            <div className="subject-details-section">

                <div className="subject-details-heading">

                    <h2>
                        Class schedule
                    </h2>

                    <p>
                        When do you have this class?
                    </p>

                </div>


                <div className="subject-details-card">

                    <div className="class-day-selector">

                        {weekdays.map((day, index) => {

                            const selected =
                                selectedDays.includes(index)

                            return (
                                <button
                                    type="button"
                                    key={day}
                                    className={
                                        selected
                                            ? "selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        setSelectedDays(
                                            (current) =>
                                                selected
                                                    ? current.filter(
                                                        (value) =>
                                                            value !==
                                                            index
                                                    )
                                                    : [
                                                        ...current,
                                                        index,
                                                    ]
                                        )
                                    }
                                >
                                    {day}
                                </button>
                            )
                        })}

                    </div>


                    <div className="class-period-times">

                        <div className="class-time-field">

                            <label>
                                Starts
                            </label>

                            <input
                                type="time"
                                value={startTime}
                                min={schoolStart}
                                max={schoolEnd}
                                onChange={(event) =>
                                    setStartTime(
                                        event.target.value
                                    )
                                }
                            />

                            <span>
                                {formatTime(startTime)}
                            </span>

                        </div>


                        <span className="class-period-to">
                            to
                        </span>


                        <div className="class-time-field">

                            <label>
                                Ends
                            </label>

                            <input
                                type="time"
                                value={endTime}
                                min={schoolStart}
                                max={schoolEnd}
                                onChange={(event) =>
                                    setEndTime(
                                        event.target.value
                                    )
                                }
                            />

                            <span>
                                {formatTime(endTime)}
                            </span>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="add-class-period"
                        disabled={
                            selectedDays.length === 0 ||
                            startTime >= endTime
                        }
                        onClick={addClassPeriod}
                    >
                        + Add class period
                    </button>


                    {(subject.classPeriods ?? []).length > 0 && (

                        <div className="class-period-list">

                            {(subject.classPeriods ?? []).map(
                                (period) => (

                                    <div
                                        className="class-period"
                                        key={period.id}
                                    >

                                        <div>

                                            <strong>
                                                {weekdays[
                                                    period.day
                                                ]}
                                            </strong>

                                            <span>
                                                {formatTime(
                                                    period.startTime
                                                )}
                                                {" "}–{" "}
                                                {formatTime(
                                                    period.endTime
                                                )}
                                            </span>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteClassPeriod(
                                                    period.id
                                                )
                                            }
                                            aria-label="Remove class period"
                                        >
                                            ×
                                        </button>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>


            {/* CLASS FORMAT */}

            <div className="subject-details-section">

                <div className="subject-details-heading">

                    <h2>
                        Class format
                    </h2>

                    <p>
                        How do you take this class?
                    </p>

                </div>


                <div className="subject-details-card">

                    <div className="format-options">

                        <button
                            className={
                                subject.classFormat === "inPerson"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                updateSubject(
                                    subject.id,
                                    {
                                        classFormat:
                                            "inPerson",
                                    }
                                )
                            }
                        >
                            In person
                        </button>

                        <button
                            className={
                                subject.classFormat === "online"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                updateSubject(
                                    subject.id,
                                    {
                                        classFormat:
                                            "online",
                                    }
                                )
                            }
                        >
                            Online
                        </button>

                    </div>

                </div>

            </div>


            {/* ASSIGNMENT DEADLINES */}

            <div className="subject-details-section">

                <div className="subject-details-heading">

                    <h2>
                        Assignment deadlines
                    </h2>

                    <p>
                        When are out-of-school assignments
                        usually due for this class?
                    </p>

                </div>


                <div className="subject-details-card">

                    <div className="deadline-options">

                        <button
                            className={
                                subject.assignmentDeadline?.type ===
                                    "endOfDay"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                updateSubject(
                                    subject.id,
                                    {
                                        assignmentDeadline: {
                                            type: "endOfDay",
                                        },
                                    }
                                )
                            }
                        >
                            11:59 PM
                        </button>


                        <button
                            className={
                                subject.assignmentDeadline?.type ===
                                    "startOfPeriod"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                updateSubject(
                                    subject.id,
                                    {
                                        assignmentDeadline: {
                                            type: "startOfPeriod",
                                        },
                                    }
                                )
                            }
                        >
                            Start of period
                        </button>


                        <button
                            className={
                                subject.assignmentDeadline?.type ===
                                    "endOfPeriod"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                updateSubject(
                                    subject.id,
                                    {
                                        assignmentDeadline: {
                                            type: "endOfPeriod",
                                        },
                                    }
                                )
                            }
                        >
                            End of period
                        </button>


                        <button
                            className={
                                subject.assignmentDeadline?.type === "custom"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() => {
                                const currentDeadline =
                                    subject.assignmentDeadline

                                updateSubject(
                                    subject.id,
                                    {
                                        assignmentDeadline: {
                                            type: "custom",
                                            time:
                                                currentDeadline?.type === "custom"
                                                    ? currentDeadline.time
                                                    : "23:59",
                                        },
                                    }
                                )
                            }}
                        >
                            Custom
                        </button>

                    </div>

                    {subject.assignmentDeadline?.type === "custom" && (

                        <div className="custom-deadline-time">

                            <label>
                                Custom due time
                            </label>

                            <input
                                type="time"
                                value={
                                    subject.assignmentDeadline.time
                                }
                                onChange={(event) =>
                                    updateSubject(
                                        subject.id,
                                        {
                                            assignmentDeadline: {
                                                type: "custom",
                                                time: event.target.value,
                                            },
                                        }
                                    )
                                }
                            />

                            <span>
                                {formatTime(
                                    subject.assignmentDeadline.time
                                )}
                            </span>

                        </div>

                    )}

                </div>

            </div>

        </section>
    )
}

export default SubjectDetails
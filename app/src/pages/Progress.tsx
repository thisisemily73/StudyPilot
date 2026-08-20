import { useTasks } from "../context/TaskContext"
import { useSubjects } from "../context/SubjectContext"

import {
    startOfWeek,
    addDays,
    formatDateKey,
} from "../utils/dateUtils"

import { getSubjectProgress } from "../utils/subjectStatus"


function Progress() {

    const { tasks } = useTasks()
    const { subjects } = useSubjects()

    const today = new Date()

    const weekStart = startOfWeek(today)

    const weekDates = Array.from(
        { length: 7 },
        (_, index) =>
            formatDateKey(
                addDays(weekStart, index)
            )
    )


    /* WEEKLY TASKS */

    const weekTasks = tasks.filter(
        (task) =>
            weekDates.includes(task.dueDate)
    )

    const completedThisWeek =
        weekTasks.filter(
            (task) => task.completed
        )


    const completedCount =
        completedThisWeek.length


    /* STUDY TIME */

    const studyMinutes =
        completedThisWeek.reduce(
            (total, task) =>
                total + task.estimatedMinutes,
            0
        )

    const studyHours =
        Math.floor(studyMinutes / 60)

    const remainingMinutes =
        studyMinutes % 60


    /* COMPLETION RATE */

    const completionRate =
        weekTasks.length === 0
            ? 0
            : Math.round(
                (completedCount /
                    weekTasks.length) *
                100
            )


    return (
        <section className="progress-page">

            {/* HEADER */}

            <div className="progress-header">

                <span className="progress-label">
                    PROGRESS
                </span>

                <h1>
                    Monitor your course.
                </h1>

                <p>
                    A look at how your work is moving this week.
                </p>

            </div>


            {/* OVERVIEW */}

            <div className="progress-overview">

                <div className="overview-stat">

                    <span>
                        COMPLETED
                    </span>

                    <strong>
                        {completedCount}
                    </strong>

                    <small>
                        tasks this week
                    </small>

                </div>


                <div className="overview-stat">

                    <span>
                        STUDY TIME
                    </span>

                    <strong>
                        {studyHours}h {remainingMinutes}m
                    </strong>

                    <small>
                        this week
                    </small>

                </div>


                <div className="overview-stat">

                    <span>
                        ON TIME
                    </span>

                    <strong>
                        {completionRate}%
                    </strong>

                    <small>
                        completion rate
                    </small>

                </div>

            </div>


            {/* WEEKLY MOMENTUM */}

            <div className="progress-section">

                <div className="progress-section-header">

                    <div>

                        <span>
                            THIS WEEK
                        </span>

                        <h2>
                            Weekly momentum
                        </h2>

                    </div>

                    <small>
                        Tasks completed
                    </small>

                </div>


                <div className="momentum-chart">

                    <div className="chart-grid">

                        <div className="chart-line" />
                        <div className="chart-line" />
                        <div className="chart-line" />
                        <div className="chart-line" />

                    </div>


                    <div className="chart-bars">

                        {Array.from(
                            { length: 5 },
                            (_, index) => {

                                const date =
                                    addDays(
                                        weekStart,
                                        index
                                    )

                                const dateKey =
                                    formatDateKey(
                                        date
                                    )

                                const dayTasks =
                                    tasks.filter(
                                        (task) =>
                                            task.dueDate ===
                                            dateKey
                                    )

                                const completed =
                                    dayTasks.filter(
                                        (task) =>
                                            task.completed
                                    ).length

                                const height =
                                    dayTasks.length === 0
                                        ? 0
                                        : Math.max(
                                            8,
                                            Math.round(
                                                (completed /
                                                    dayTasks.length) *
                                                100
                                            )
                                        )

                                const dayNames = [
                                    "MON",
                                    "TUE",
                                    "WED",
                                    "THU",
                                    "FRI",
                                ]

                                return (

                                    <div
                                        className="chart-day"
                                        key={dateKey}
                                    >

                                        <div
                                            className="chart-bar"
                                            style={{
                                                height:
                                                    `${height}%`,
                                            }}
                                        />

                                        <span>
                                            {dayNames[index]}
                                        </span>

                                    </div>

                                )

                            }
                        )}

                    </div>

                </div>

            </div>


            {/* SUBJECT PROGRESS */}

            <div className="progress-section">

                <div className="progress-section-header">

                    <div>

                        <span>
                            SUBJECTS
                        </span>

                        <h2>
                            Your destinations
                        </h2>

                    </div>

                    <small>
                        Current progress
                    </small>

                </div>


                <div className="subject-progress-list">

                    {subjects.map((subject) => {

                        const progress =
                            getSubjectProgress(
                                tasks,
                                subject.name
                            )

                        return (

                            <div
                                className="subject-progress-row"
                                key={subject.id}
                            >

                                <div className="subject-progress-name">

                                    <strong>
                                        {subject.name}
                                    </strong>

                                    <span>
                                        {progress}%
                                    </span>

                                </div>


                                <div className="subject-progress-track">

                                    <div
                                        className="subject-progress-fill"
                                        style={{
                                            width:
                                                `${progress}%`,
                                        }}
                                    />

                                </div>

                            </div>

                        )

                    })}


                    {subjects.length === 0 && (

                        <div className="progress-empty">

                            <span>
                                NO DESTINATIONS
                            </span>

                            <p>
                                Add a subject to start tracking your progress.
                            </p>

                        </div>

                    )}

                </div>

            </div>


            {/* STATUS */}

            <div className="progress-status">

                <div>

                    <span>
                        FLIGHT STATUS
                    </span>

                    <h2>
                        You're on course.
                    </h2>

                    <p>
                        Keep completing your tasks to stay on schedule.
                    </p>

                </div>

            </div>

        </section>
    )
}


export default Progress
import { useState } from "react"
import AddTaskModal from "../components/AddTaskModal.tsx"
import TaskCard from "../components/TaskCard.tsx"

import { useTasks } from "../context/TaskContext.tsx"
import type { Task } from "../types/Task"

import {
    startOfWeek,
    addDays,
    formatDateKey,
    formatDayName,
    formatDayNumber,
    formatWeekRange,
} from "../utils/dateUtils"

import UpcomingTasks from "../components/UpcomingTasks.tsx"

function Planner() {
    const { tasks, toggleTask } = useTasks()

    const [showAddTask, setShowAddTask] = useState(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [weekOffset, setWeekOffset] = useState(0)

    const today = new Date()

    const currentWeekStart = startOfWeek(today)

    const displayedWeekStart = addDays(
        currentWeekStart,
        weekOffset * 7
    )

    const displayedWeekEnd = addDays(
        displayedWeekStart,
        6
    )

    const weekDays = Array.from(
        { length: 7 },
        (_, index) =>
            addDays(displayedWeekStart, index)
    )

    return (
        <section className="planner">

            {/* HEADER */}

            <div className="planner-header">

                <div>
                    <span className="planner-label">
                        PLANNER
                    </span>

                    <h1>
                        Your week.
                    </h1>

                    <p>
                        A clear view of what's ahead.
                    </p>
                </div>

                <div className="planner-actions">

                    <button
                        className="planner-action"
                        onClick={() =>
                            setWeekOffset(0)
                        }
                    >
                        Today
                    </button>

                    <button
                        className="add-task-trigger"
                        onClick={() =>
                            setShowAddTask(true)
                        }
                    >
                        Add task
                    </button>

                </div>

                {showAddTask && (
                    <AddTaskModal
                        onClose={() =>
                            setShowAddTask(false)
                        }
                    />
                )}

                {selectedTask && (
                    <AddTaskModal
                        task={selectedTask}
                        onClose={() =>
                            setSelectedTask(null)
                        }
                    />
                )}

            </div>


            {/* WEEK CONTROLS */}

            <div className="week-controls">

                <button
                    className="week-arrow"
                    onClick={() =>
                        setWeekOffset(
                            (offset) => offset - 1
                        )
                    }
                >
                    ←
                </button>

                <span>
                    {formatWeekRange(
                        displayedWeekStart
                    )}
                </span>

                <button
                    className="week-arrow"
                    onClick={() =>
                        setWeekOffset(
                            (offset) => offset + 1
                        )
                    }
                >
                    →
                </button>

            </div>


            {/* CALENDAR */}

            <div className="calendar">

                {/* DAY HEADERS */}

                <div className="calendar-header">

                    <div className="calendar-time-column" />

                    {weekDays.map((date) => {

                        const dateKey =
                            formatDateKey(date)

                        const isToday =
                            dateKey ===
                            formatDateKey(today)

                        return (
                            <div
                                className={`calendar-day-header ${isToday
                                        ? "today"
                                        : ""
                                    }`}
                                key={dateKey}
                            >

                                <span>
                                    {formatDayName(date)}
                                </span>

                                <strong>
                                    {formatDayNumber(date)}
                                </strong>

                                {isToday && (
                                    <small>
                                        TODAY
                                    </small>
                                )}

                            </div>
                        )
                    })}

                </div>


                {/* TIME GRID */}

                <div className="calendar-body">

                    {Array.from(
                        { length: 14 },
                        (_, index) => {

                            const hour = index + 8

                            return (
                                <div
                                    className="calendar-row"
                                    key={hour}
                                >

                                    <div className="calendar-time">
                                        {formatHour(hour)}
                                    </div>

                                    {weekDays.map(
                                        (date) => {

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

                                            return (
                                                <div
                                                    className="calendar-cell"
                                                    key={dateKey}
                                                >

                                                    {hour === 8 &&
                                                        dayTasks.map((task) => (
                                                            <div
                                                                className="calendar-task"
                                                                key={task.id}
                                                                onClick={() =>
                                                                    setSelectedTask(task)
                                                                }
                                                            >
                                                                <span>
                                                                    {task.subject}
                                                                </span>

                                                                <strong>
                                                                    {task.title}
                                                                </strong>

                                                                <small>
                                                                    {task.estimatedMinutes} min
                                                                </small>
                                                            </div>
                                                        ))}

                                                </div>
                                            )
                                        }
                                    )}

                                </div>
                            )
                        }
                    )}

                </div>

            </div>


            {/* WEEK SUMMARY */}

            <div className="week-summary">

                <span>
                    THIS WEEK
                </span>

                <strong>
                    {tasks.filter((task) => {
                        const date =
                            new Date(
                                task.dueDate +
                                "T00:00:00"
                            )

                        return (
                            date >=
                            displayedWeekStart &&
                            date <=
                            displayedWeekEnd
                        )
                    }).length}{" "}
                    tasks
                </strong>

            </div>


            {/* UPCOMING */}

            <UpcomingTasks
                weekEnd={displayedWeekEnd}
                onEdit={setSelectedTask}
            />

        </section>
    )
}

function formatHour(hour: number) {

    const suffix =
        hour >= 12
            ? "PM"
            : "AM"

    const displayHour =
        hour % 12 || 12

    return `${displayHour} ${suffix}`
}

export default Planner
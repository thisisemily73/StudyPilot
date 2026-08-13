import { useState } from "react"
import AddTaskModal from "../components/AddTaskModal.tsx"

import { useTasks } from '../context/TaskContext.tsx'

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

    {/* WEEK OFFSET */ }
    const [weekOffset, setWeekOffset] = useState(0)

    const today = new Date()

    const currentWeekStart = startOfWeek(today)

    const displayedWeekStart = addDays(
        currentWeekStart,
        weekOffset * 7
    )

    {/* GENERATE WEEKDAYS AND WEEKEND DAYS */ }
    const weekDays = Array.from(
        { length: 5 },
        (_, index) => addDays(displayedWeekStart, index)
    )

    const weekendDays = Array.from(
        { length: 2 },
        (_, index) => addDays(displayedWeekStart, index + 5)
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
                            document
                                .getElementById("upcoming")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                })
                        }
                    >
                        Upcoming tasks
                        <span>↓</span>
                    </button>


                    <button
                        className="planner-action"
                        onClick={() =>
                            document
                                .getElementById("weekend")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                })
                        }
                    >
                        Weekend
                        <span>↓</span>
                    </button>


                    <button
                        className="add-task-trigger"
                        onClick={() => setShowAddTask(true)}
                    >
                        Add task
                    </button>

                </div>

                {showAddTask && (
                    <AddTaskModal
                        onClose={() => setShowAddTask(false)}
                    />
                )}

            </div>


            {/* WEEK CONTROLS */}

            <div className="week-controls">

                <button
                    className="week-arrow"
                    onClick={() => setWeekOffset((offset) => offset - 1)}
                >
                    ←
                </button>

                <span>
                    {formatWeekRange(displayedWeekStart)}
                </span>

                <button
                    className="week-arrow"
                    onClick={() => setWeekOffset((offset) => offset + 1)}
                >
                    →
                </button>

            </div>


            {/* WEEK */}

            <div className="planner-week">

                {weekDays.map((date) => {

                    const dateKey = formatDateKey(date)

                    const dayTasks = tasks.filter(
                        (task) => task.dueDate === dateKey
                    )

                    const isToday =
                        dateKey === formatDateKey(today)

                    return (

                        <div
                            className={`planner-day ${isToday ? "today" : ""}`}
                            key={dateKey}
                        >

                            <div className="day-header">

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


                            <div className="day-tasks">

                                {dayTasks.map((task) => (

                                    <div
                                        className={`planner-task ${task.completed
                                            ? "completed"
                                            : ""
                                            }`}
                                        key={task.id}
                                        onClick={() =>
                                            toggleTask(task.id)
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


                                {dayTasks.length === 0 && (
                                    <div className="day-empty">
                                        Clear skies.
                                    </div>
                                )}

                            </div>

                        </div>

                    )

                })}

            </div>


            {/* WEEK SUMMARY */}

            <div className="week-summary">

                <span>
                    THIS WEEK
                </span>

                <strong>
                    6 tasks
                </strong>

                <small>
                    2 hr 15 min planned
                </small>

            </div>

            <section
                className="weekend"
                id="weekend"
            >

                <div className="weekend-header">

                    <div>
                        <span className="planner-label">
                            WEEKEND
                        </span>

                        <h2>
                            Saturday & Sunday.
                        </h2>

                        <p>
                            Anything waiting for you after the school week.
                        </p>
                    </div>

                </div>


                {/* WEEKEND GRID */}

                <div className="weekend-grid">

                    {weekendDays.map((date) => {

                        const dateKey = formatDateKey(date)

                        const dayTasks = tasks.filter(
                            (task) => task.dueDate === dateKey
                        )

                        return (

                            <div
                                className="weekend-day"
                                key={dateKey}
                            >

                                <div className="day-header">

                                    <span>
                                        {formatDayName(date)}
                                    </span>

                                    <strong>
                                        {formatDayNumber(date)}
                                    </strong>

                                </div>


                                <div className="day-tasks">

                                    {dayTasks.map((task) => (

                                        <div
                                            className={`planner-task ${task.completed
                                                ? "completed"
                                                : ""
                                                }`}
                                            key={task.id}
                                            onClick={() =>
                                                toggleTask(task.id)
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


                                    {dayTasks.length === 0 && (
                                        <div className="day-empty">
                                            Clear skies.
                                        </div>
                                    )}

                                </div>

                            </div>

                        )

                    })}

                </div>

            </section>

            <UpcomingTasks />

        </section>


    )
}

export default Planner
import { useState } from "react"
import { useTasks } from "../context/TaskContext"
import AddTaskModal from "../components/AddTaskModal"
import type { Task } from "../types/Task"

type PlannerTab = "todo" | "study"

type TaskFilter =
    | "today"
    | "upcoming"
    | "completed"
    | "custom"

function getToday() {
    const date = new Date()

    const year = date.getFullYear()

    const month =
        String(date.getMonth() + 1).padStart(2, "0")

    const day =
        String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

function formatDate(dateString: string) {
    return new Date(
        dateString + "T00:00:00"
    ).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    })
}

function Planner() {

    const {
        tasks,
        toggleTask,
        deleteTask,
    } = useTasks()

    const [activeTab, setActiveTab] =
        useState<PlannerTab>("todo")

    const [filter, setFilter] =
        useState<TaskFilter>("today")

    const [startDate, setStartDate] =
        useState("")

    const [endDate, setEndDate] =
        useState("")

    const [showAddTask, setShowAddTask] =
        useState(false)

    const [selectedTask, setSelectedTask] =
        useState<Task | null>(null)

    const today = getToday()


    function getFilteredTasks() {

        if (filter === "completed") {

            return tasks.filter(
                (task) => task.completed
            )
        }

        if (filter === "today") {

            return tasks.filter(
                (task) =>
                    task.dueDate === today &&
                    !task.completed
            )
        }

        if (filter === "upcoming") {

            return tasks.filter(
                (task) =>
                    task.dueDate > today &&
                    !task.completed
            )
        }

        if (
            filter === "custom" &&
            startDate &&
            endDate
        ) {

            return tasks.filter(
                (task) =>
                    task.dueDate >= startDate &&
                    task.dueDate <= endDate
            )
        }

        return []
    }


    const filteredTasks =
        getFilteredTasks().sort(
            (a, b) =>
                a.dueDate.localeCompare(b.dueDate) ||
                a.dueTime.localeCompare(b.dueTime)
        )


    function renderTask(task: Task) {

        return (
            <div
                className={
                    task.completed
                        ? "task planner-task completed"
                        : "task planner-task"
                }
                key={task.id}
            >

                <button
                    type="button"
                    className={
                        task.completed
                            ? "planner-checkbox checked"
                            : "planner-checkbox"
                    }
                    onClick={() =>
                        toggleTask(task.id)
                    }
                    aria-label={
                        task.completed
                            ? `Mark ${task.title} incomplete`
                            : `Complete ${task.title}`
                    }
                >
                    {task.completed ? "✓" : ""}
                </button>


                <div className="task-info">

                    <span className="task-subject">
                        {task.subject}
                    </span>

                    <h3>
                        {task.title}
                    </h3>

                    <span className="planner-task-date">
                        {formatDate(task.dueDate)}
                    </span>

                </div>


                <div className="planner-task-meta">

                    <span className="task-duration">
                        {task.estimatedMinutes} min
                    </span>

                    <button
                        type="button"
                        className="planner-edit"
                        onClick={() =>
                            setSelectedTask(task)
                        }
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        className="planner-delete"
                        onClick={() => {

                            const confirmed =
                                window.confirm(
                                    `Delete "${task.title}"?`
                                )

                            if (confirmed) {
                                deleteTask(task.id)
                            }

                        }}
                        aria-label={`Delete ${task.title}`}
                    >
                        ×
                    </button>

                </div>

            </div>
        )
    }


    return (
        <section className="planner">

            {/* HEADER */}

            <div className="planner-header">

                <div>

                    <span className="planner-label">
                        PLANNER
                    </span>

                    <h1>
                        Stay on course.
                    </h1>

                    <p>
                        Keep track of what you need to
                        finish and make time to study.
                    </p>

                </div>

                <button
                    type="button"
                    className="add-subject"
                    onClick={() =>
                        setShowAddTask(true)
                    }
                >
                    + Add task
                </button>

            </div>


            {/* TABS */}

            <div className="planner-tabs">

                <button
                    type="button"
                    className={
                        activeTab === "todo"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveTab("todo")
                    }
                >
                    To-Do
                </button>

                <button
                    type="button"
                    className={
                        activeTab === "study"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveTab("study")
                    }
                >
                    Study Time
                </button>

            </div>


            {/* TO-DO */}

            {activeTab === "todo" && (

                <div className="planner-section">

                    <div className="planner-filter-bar">

                        <button
                            type="button"
                            className={
                                filter === "today"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("today")
                            }
                        >
                            Today
                        </button>

                        <button
                            type="button"
                            className={
                                filter === "upcoming"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("upcoming")
                            }
                        >
                            Upcoming
                        </button>

                        <button
                            type="button"
                            className={
                                filter === "completed"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("completed")
                            }
                        >
                            Completed
                        </button>

                        <button
                            type="button"
                            className={
                                filter === "custom"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("custom")
                            }
                        >
                            Date range
                        </button>

                    </div>


                    {filter === "custom" && (

                        <div className="planner-date-range">

                            <input
                                type="date"
                                value={startDate}
                                onChange={(event) =>
                                    setStartDate(
                                        event.target.value
                                    )
                                }
                            />

                            <span>
                                to
                            </span>

                            <input
                                type="date"
                                value={endDate}
                                onChange={(event) =>
                                    setEndDate(
                                        event.target.value
                                    )
                                }
                            />

                        </div>

                    )}


                    <div className="planner-task-list">

                        {filteredTasks.length > 0 ? (

                            filteredTasks.map(
                                renderTask
                            )

                        ) : (

                            <div className="planner-empty">

                                <strong>
                                    Nothing here yet.
                                </strong>

                                <span>
                                    {filter === "today"
                                        ? "You're all clear for today."
                                        : filter === "upcoming"
                                            ? "No upcoming tasks."
                                            : filter === "completed"
                                                ? "You haven't landed any tasks yet."
                                                : "Choose a date range to see your tasks."}
                                </span>

                            </div>

                        )}

                    </div>

                </div>

            )}


            {/* STUDY TIME */}

            {activeTab === "study" && (

                <div className="planner-section">

                    <div className="planner-study">

                        <span className="planner-label">
                            STUDY TIME
                        </span>

                        <h2>
                            Make time to learn.
                        </h2>

                        <p>
                            StudyPilot will use your tasks,
                            deadlines, estimated completion
                            times, and study preferences to
                            build a realistic study plan.
                        </p>

                    </div>

                </div>

            )}


            {/* ADD TASK */}

            {showAddTask && (

                <AddTaskModal
                    onClose={() =>
                        setShowAddTask(false)
                    }
                />

            )}


            {/* EDIT TASK */}

            {selectedTask && (

                <AddTaskModal
                    task={selectedTask}
                    onClose={() =>
                        setSelectedTask(null)
                    }
                />

            )}

        </section>
    )
}

export default Planner
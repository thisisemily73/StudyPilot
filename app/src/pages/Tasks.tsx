import { useState } from "react"

import { useTasks } from "../context/TaskContext"
import AddTaskModal from "../components/AddTaskModal"
import type { Task } from "../types/Task"


function formatDateLabel(dateString: string) {

    const date =
        new Date(dateString + "T00:00:00")

    const today =
        new Date()

    today.setHours(0, 0, 0, 0)

    const tomorrow =
        new Date(today)

    tomorrow.setDate(
        tomorrow.getDate() + 1
    )

    if (
        date.getTime() ===
        today.getTime()
    ) {
        return "TODAY"
    }

    if (
        date.getTime() ===
        tomorrow.getTime()
    ) {
        return "TOMORROW"
    }

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "short",
            day: "numeric",
        }
    ).toUpperCase()
}


function Tasks() {

    const [showAddTask, setShowAddTask] =
        useState(false)

    const [selectedTask, setSelectedTask] =
        useState<Task | null>(null)


    const {
        tasks,
        toggleTask,
        deleteTask,
    } = useTasks()


    const incompleteTasks =
        tasks.filter(
            (task) => !task.completed
        )


    const completedTasks =
        tasks.filter(
            (task) => task.completed
        )


    const groupedTasks =
        incompleteTasks.reduce<
            Record<string, Task[]>
        >(
            (groups, task) => {

                if (!groups[task.dueDate]) {
                    groups[task.dueDate] = []
                }

                groups[task.dueDate].push(task)

                return groups
            },
            {}
        )


    const sortedDates =
        Object.keys(groupedTasks).sort()


    function renderTask(task: Task) {

        return (
            <div
                className="tasks-task"
                key={task.id}
            >

                <button
                    type="button"
                    className="tasks-checkbox"
                    onClick={() =>
                        toggleTask(task.id)
                    }
                    aria-label={`Complete ${task.title}`}
                />


                <div className="tasks-task-info">

                    <strong>
                        {task.title}
                    </strong>

                    <span>
                        {task.subject}
                    </span>

                </div>


                <div className="tasks-task-meta">

                    <span>
                        {task.estimatedMinutes} min
                    </span>


                    <button
                        type="button"
                        className="tasks-edit-button"
                        onClick={() =>
                            setSelectedTask(task)
                        }
                    >
                        Edit
                    </button>


                    <button
                        type="button"
                        className="tasks-delete-button"
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
        <section className="tasks">

            {/* HEADER */}

            <div className="tasks-header">

                <div>

                    <span className="tasks-label">
                        FLIGHT DECK
                    </span>

                    <h1>
                        Your tasks.
                    </h1>

                    <p>
                        Everything you need to get done,
                        cleared for takeoff.
                    </p>

                </div>


                <button
                    className="add-subject"
                    onClick={() =>
                        setShowAddTask(true)
                    }
                >
                    + Add task
                </button>

            </div>


            {/* ACTIVE TASKS */}

            <section className="tasks-section">

                <div className="tasks-section-header">

                    <h2>
                        Active
                    </h2>

                    <span>
                        {incompleteTasks.length}
                    </span>

                </div>


                {sortedDates.length > 0 ? (

                    <div className="tasks-groups">

                        {sortedDates.map((date) => (

                            <div
                                className="tasks-date-group"
                                key={date}
                            >

                                <div className="tasks-date-heading">

                                    <span>
                                        {formatDateLabel(date)}
                                    </span>

                                </div>


                                <div className="tasks-list">

                                    {groupedTasks[date].map(
                                        renderTask
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="tasks-empty">

                        <span>
                            Clear skies.
                        </span>

                        <p>
                            You've landed everything
                            on your list.
                        </p>

                    </div>

                )}

            </section>


            {/* COMPLETED */}

            {completedTasks.length > 0 && (

                <section className="tasks-section completed-section">

                    <div className="tasks-section-header">

                        <h2>
                            Completed
                        </h2>

                        <span>
                            {completedTasks.length}
                        </span>

                    </div>


                    <div className="tasks-list">

                        {completedTasks.map((task) => (

                            <div
                                className="tasks-task completed"
                                key={task.id}
                            >

                                <button
                                    type="button"
                                    className="tasks-checkbox checked"
                                    onClick={() =>
                                        toggleTask(task.id)
                                    }
                                    aria-label={`Mark ${task.title} incomplete`}
                                >
                                    ✓
                                </button>


                                <div className="tasks-task-info">

                                    <strong>
                                        {task.title}
                                    </strong>

                                    <span>
                                        {task.subject}
                                    </span>

                                </div>


                                <div className="tasks-task-meta">

                                    <span>
                                        {task.estimatedMinutes} min
                                    </span>


                                    <button
                                        type="button"
                                        className="tasks-edit-button"
                                        onClick={() =>
                                            setSelectedTask(task)
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        type="button"
                                        className="tasks-delete-button"
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

                        ))}

                    </div>

                </section>

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


export default Tasks
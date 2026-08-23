import { useState } from "react"

import { useTasks } from "../context/TaskContext"
import AddTaskModal from "../components/AddTaskModal"
import type { Task } from "../types/Task"


function Todo() {

    const [showAddTask, setShowAddTask] =
        useState(false)

    const [selectedTask, setSelectedTask] =
        useState<Task | null>(null)


    const {
        tasks,
        toggleTask,
        deleteTask,
    } = useTasks()


    const incompleteTasks = tasks.filter(
        (task) => !task.completed
    )

    const completedTasks = tasks.filter(
        (task) => task.completed
    )


    return (
        <section className="todo">

            {/* HEADER */}

            <div className="todo-header">

                <div>

                    <span className="planner-label">
                        FLIGHT DECK
                    </span>

                    <h1>
                        Stay on course.
                    </h1>

                    <p>
                        Stay organized for a smooth flight.
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

            <section className="todo-section">

                <div className="todo-section-header">

                    <h2>
                        Tasks
                    </h2>

                    <span>
                        {incompleteTasks.length}
                    </span>

                </div>


                <div className="todo-list">

                    {incompleteTasks.map((task) => (

                        <div
                            className="todo-task"
                            key={task.id}
                        >

                            {/* CHECKBOX */}

                            <button
                                type="button"
                                className="todo-checkbox"
                                onClick={() =>
                                    toggleTask(task.id)
                                }
                                aria-label={`Complete ${task.title}`}
                            />


                            {/* INFO */}

                            <div className="todo-task-info">

                                <strong>
                                    {task.title}
                                </strong>

                                <span>
                                    {task.subject}
                                </span>

                            </div>


                            {/* META + ACTIONS */}

                            <div className="todo-task-meta">

                                <span>
                                    {task.estimatedMinutes} min
                                </span>

                                <span>
                                    {task.dueDate}
                                </span>


                                <button
                                    type="button"
                                    className="todo-edit-button"
                                    onClick={() =>
                                        setSelectedTask(task)
                                    }
                                >
                                    Edit
                                </button>


                                <button
                                    type="button"
                                    className="todo-delete-button"
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


                    {incompleteTasks.length === 0 && (

                        <div className="todo-empty">

                            <span>
                                Clear skies.
                            </span>

                            <p>
                                You've landed everything on your list.
                            </p>

                        </div>

                    )}

                </div>

            </section>


            {/* COMPLETED TASKS */}

            {completedTasks.length > 0 && (

                <section className="todo-section completed-section">

                    <div className="todo-section-header">

                        <h2>
                            Completed
                        </h2>

                        <span>
                            {completedTasks.length}
                        </span>

                    </div>


                    <div className="todo-list">

                        {completedTasks.map((task) => (

                            <div
                                className="todo-task completed"
                                key={task.id}
                            >

                                {/* CHECKBOX */}

                                <button
                                    type="button"
                                    className="todo-checkbox checked"
                                    onClick={() =>
                                        toggleTask(task.id)
                                    }
                                    aria-label={`Mark ${task.title} incomplete`}
                                >
                                    ✓
                                </button>


                                {/* INFO */}

                                <div className="todo-task-info">

                                    <strong>
                                        {task.title}
                                    </strong>

                                    <span>
                                        {task.subject}
                                    </span>

                                </div>


                                {/* META + ACTIONS */}

                                <div className="todo-task-meta">

                                    <span>
                                        {task.estimatedMinutes} min
                                    </span>

                                    <span>
                                        {task.dueDate}
                                    </span>


                                    <button
                                        type="button"
                                        className="todo-edit-button"
                                        onClick={() =>
                                            setSelectedTask(task)
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        type="button"
                                        className="todo-delete-button"
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


export default Todo
import { useState } from "react"
import { useTasks } from "../context/TaskContext"
import type { Task } from "../types/Task"

type AddTaskModalProps = {
    onClose: () => void
    task?: Task
}

function AddTaskModal({ onClose, task }: AddTaskModalProps) {

    const { addTask, updateTask, deleteTask } = useTasks()

    const isEditing = Boolean(task)

    const [title, setTitle] = useState(task?.title ?? "")
    const [subject, setSubject] = useState(
        task?.subject ?? "AP Chemistry"
    )
    const [dueDate, setDueDate] = useState(task?.dueDate ?? "")
    const [estimatedMinutes, setEstimatedMinutes] = useState(
        String(task?.estimatedMinutes ?? 30)
    )

    function handleSubmit(event: React.FormEvent) {

        event.preventDefault()

        if (!title.trim() || !dueDate) {
            return
        }

        if (task) {

            updateTask({
                ...task,
                title: title.trim(),
                subject,
                dueDate,
                estimatedMinutes: Number(estimatedMinutes),
            })

        } else {

            addTask({
                id: crypto.randomUUID(),
                title: title.trim(),
                subject,
                dueDate,
                estimatedMinutes: Number(estimatedMinutes),
                completed: false,
            })

        }

        onClose()
    }


    function handleDelete() {

        if (!task) return

        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        )

        if (!confirmed) return

        deleteTask(task.id)
        onClose()
    }


    return (
        <div
            className="modal-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose()
                }
            }}
        >

            <div className="task-modal">

                {/* HEADER */}

                <div className="task-modal-header">

                    <div className="task-modal-title">

                        <span className="task-modal-eyebrow">
                            {isEditing ? "EDIT TASK" : "NEW TASK"}
                        </span>

                        <h2>
                            {isEditing
                                ? "Update your task"
                                : "Add a task"
                            }
                        </h2>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="modal-close"
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>


                {/* FORM */}

                <form onSubmit={handleSubmit}>

                    {/* TASK TITLE */}

                    <div className="form-field">

                        <label htmlFor="task-title">
                            Task
                        </label>

                        <input
                            id="task-title"
                            type="text"
                            placeholder="What do you need to do?"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            autoFocus
                        />

                    </div>


                    {/* SUBJECT */}

                    <div className="form-field">

                        <label htmlFor="task-subject">
                            Subject
                        </label>

                        <select
                            id="task-subject"
                            value={subject}
                            onChange={(event) =>
                                setSubject(event.target.value)
                            }
                        >
                            <option>AP Chemistry</option>
                            <option>AP Calculus BC</option>
                            <option>AP Language</option>
                            <option>AP Psychology</option>
                        </select>

                    </div>


                    {/* DATE + TIME */}

                    <div className="form-row">

                        <div className="form-field">

                            <label htmlFor="task-date">
                                Due date
                            </label>

                            <input
                                id="task-date"
                                type="date"
                                value={dueDate}
                                onChange={(event) =>
                                    setDueDate(event.target.value)
                                }
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Estimated time
                            </label>

                            <div className="duration-options">

                                {[
                                    ["15", "15m"],
                                    ["30", "30m"],
                                    ["45", "45m"],
                                    ["60", "1h"],
                                    ["90", "1.5h"],
                                ].map(([value, label]) => (

                                    <button
                                        key={value}
                                        type="button"
                                        className={
                                            estimatedMinutes === value
                                                ? "duration-option selected"
                                                : "duration-option"
                                        }
                                        onClick={() =>
                                            setEstimatedMinutes(value)
                                        }
                                    >
                                        {label}
                                    </button>

                                ))}

                            </div>

                        </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="task-modal-footer">

                        {isEditing ? (

                            <button
                                type="button"
                                className="delete-task-button"
                                onClick={handleDelete}
                            >
                                Delete task
                            </button>

                        ) : (
                            <div />
                        )}


                        <div className="task-modal-actions">

                            <button
                                type="button"
                                onClick={onClose}
                                className="cancel-button"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="add-task-button"
                            >
                                {isEditing
                                    ? "Save changes"
                                    : "Add task"
                                }
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default AddTaskModal
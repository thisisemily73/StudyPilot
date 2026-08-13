import { useState } from "react"
import { useTasks } from "../context/TaskContext"

type AddTaskModalProps = {
    onClose: () => void
}

function AddTaskModal({ onClose }: AddTaskModalProps) {

    const { addTask } = useTasks()

    const [title, setTitle] = useState("")
    const [subject, setSubject] = useState("AP Chemistry")
    const [dueDate, setDueDate] = useState("")
    const [estimatedMinutes, setEstimatedMinutes] = useState("30")


    function handleSubmit(event: React.FormEvent) {

        event.preventDefault()

        if (!title.trim() || !dueDate) {
            return
        }

        addTask({
            id: crypto.randomUUID(),
            title: title.trim(),
            subject,
            dueDate,
            estimatedMinutes: Number(estimatedMinutes),
            completed: false,
        })

        onClose()
    }


    return (
        <div className="modal-overlay">

            <div className="task-modal">

                <div className="task-modal-header">

                    <div>
                        <span>
                            NEW TASK
                        </span>

                        <h2>
                            Add a task
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="modal-close"
                    >
                        ×
                    </button>

                </div>


                <form onSubmit={handleSubmit}>

                    <label>
                        Task

                        <input
                            type="text"
                            placeholder="What do you need to do?"
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            autoFocus
                        />

                    </label>


                    <label>
                        Subject

                        <select
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

                    </label>


                    <label>
                        Due date

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(event) =>
                                setDueDate(event.target.value)
                            }
                        />

                    </label>


                    <label>
                        Estimated time

                        <select
                            value={estimatedMinutes}
                            onChange={(event) =>
                                setEstimatedMinutes(event.target.value)
                            }
                        >
                            <option value="15">
                                15 minutes
                            </option>

                            <option value="30">
                                30 minutes
                            </option>

                            <option value="45">
                                45 minutes
                            </option>

                            <option value="60">
                                1 hour
                            </option>

                            <option value="90">
                                1.5 hours
                            </option>

                        </select>

                    </label>


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
                            Add task
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default AddTaskModal
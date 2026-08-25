import { useEffect, useState } from "react"
import { useTasks } from "../context/TaskContext"
import { useSubjects } from "../context/SubjectContext"

import type {
    Task,
    TaskType,
    AssessmentType,
} from "../types/Task"

type AddTaskModalProps = {
    onClose: () => void
    task?: Task
}

function AddTaskModal({ onClose, task }: AddTaskModalProps) {

    const { addTask, updateTask, deleteTask } = useTasks()
    const { subjects } = useSubjects()

    const isEditing = Boolean(task)

    const [title, setTitle] = useState(
        task?.title ?? ""
    )

    const [subject, setSubject] = useState(
        task?.subject ?? ""
    )

    const [dueDate, setDueDate] = useState(
        task?.dueDate ?? ""
    )

    const [dueTime, setDueTime] = useState(
        task?.dueTime ?? "23:59"
    )

    // Existing tasks already have an explicit due time.
    // New tasks begin by using the subject's suggested deadline.
    const [hasCustomDueTime, setHasCustomDueTime] =
        useState(Boolean(task))

    const [estimatedMinutes, setEstimatedMinutes] =
        useState(
            String(task?.estimatedMinutes ?? 30)
        )

    const [type, setType] =
        useState<TaskType>(
            task?.type ?? "homework"
        )

    const [assessmentType, setAssessmentType] =
        useState<AssessmentType>(
            task?.assessmentType ?? "test"
        )


    function getDefaultDueTime() {

        const selectedSubject =
            subjects.find(
                (subjectOption) =>
                    subjectOption.name === subject
            )

        if (!selectedSubject) {
            return "23:59"
        }

        const deadline =
            selectedSubject.assignmentDeadline

        if (!deadline) {
            return "23:59"
        }

        if (deadline.type === "endOfDay") {
            return "23:59"
        }

        if (deadline.type === "custom") {
            return deadline.time
        }

        const periods =
            selectedSubject.classPeriods ?? []

        if (!dueDate) {
            return "23:59"
        }

        const javascriptDay =
            new Date(
                `${dueDate}T12:00:00`
            ).getDay()

        // ClassPeriod uses:
        // Monday = 0
        // Tuesday = 1
        // ...
        // Friday = 4
        //
        // JavaScript Date uses:
        // Sunday = 0
        // Monday = 1
        // ...
        // Saturday = 6
        const day =
            javascriptDay === 0
                ? 6
                : javascriptDay - 1

        const matchingPeriod =
            periods.find(
                (period) =>
                    period.day === day
            )

        if (!matchingPeriod) {
            return "23:59"
        }

        if (
            deadline.type ===
            "startOfPeriod"
        ) {
            return matchingPeriod.startTime
        }

        if (
            deadline.type ===
            "endOfPeriod"
        ) {
            return matchingPeriod.endTime
        }

        return "23:59"
    }


    function handleSubmit(
        event: React.FormEvent
    ) {

        event.preventDefault()

        if (
            !title.trim() ||
            !dueDate ||
            !dueTime
        ) {
            return
        }

        if (task) {

            updateTask({
                ...task,

                title: title.trim(),

                subject,

                type,

                assessmentType:
                    type === "assessment"
                        ? assessmentType
                        : undefined,

                dueDate,

                dueTime,

                estimatedMinutes:
                    Number(estimatedMinutes),
            })

        } else {

            addTask({
                id: crypto.randomUUID(),

                title: title.trim(),

                subject,

                type,

                assessmentType:
                    type === "assessment"
                        ? assessmentType
                        : undefined,

                dueDate,

                dueTime,

                estimatedMinutes:
                    Number(estimatedMinutes),

                completed: false,
            })

        }

        onClose()
    }


    function handleDelete() {

        if (!task) return

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this task?"
            )

        if (!confirmed) return

        deleteTask(task.id)

        onClose()
    }


    // Select the first subject when creating
    // a new task.
    useEffect(() => {

        if (
            !task &&
            !subject &&
            subjects.length > 0
        ) {

            setSubject(
                subjects[0].name
            )

        }

    }, [subjects, task, subject])


    // When creating a task, update the suggested
    // deadline whenever the subject changes.
    //
    // Once the user manually chooses a time,
    // their choice is preserved.
    useEffect(() => {

        if (
            !task &&
            !hasCustomDueTime &&
            subject &&
            dueDate
        ) {

            setDueTime(
                getDefaultDueTime()
            )

        }

    }, [
        subject,
        dueDate,
        subjects,
        task,
        hasCustomDueTime,
    ])


    return (
        <div
            className="modal-overlay"
            onMouseDown={(event) => {

                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose()
                }

            }}
        >

            <div className="task-modal">

                {/* HEADER */}

                <div className="task-modal-header">

                    <div className="task-modal-title">

                        <span className="task-modal-eyebrow">
                            {isEditing
                                ? "EDIT TASK"
                                : "NEW TASK"}
                        </span>

                        <h2>
                            {isEditing
                                ? "Update your task"
                                : "Add a task"}
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
                                setTitle(
                                    event.target.value
                                )
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
                            onChange={(event) => {

                                setSubject(
                                    event.target.value
                                )

                                // A new subject should
                                // provide a new suggestion
                                // unless the user has already
                                // manually chosen a time.
                            }}
                            required
                        >

                            <option
                                value=""
                                disabled
                            >
                                Select a subject
                            </option>

                            {subjects.map(
                                (subjectOption) => (

                                    <option
                                        key={
                                            subjectOption.id
                                        }
                                        value={
                                            subjectOption.name
                                        }
                                    >
                                        {
                                            subjectOption.name
                                        }
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* TYPE */}

                    <div className="form-field">

                        <label>
                            Type
                        </label>

                        <div className="task-type-options">

                            {[
                                [
                                    "assessment",
                                    "Assessment",
                                ],
                                [
                                    "homework",
                                    "Homework",
                                ],
                                [
                                    "classwork",
                                    "Classwork",
                                ],
                                [
                                    "study",
                                    "Study",
                                ],
                            ].map(
                                ([value, label]) => (

                                    <button
                                        key={value}
                                        type="button"
                                        className={
                                            type === value
                                                ? "task-type-option selected"
                                                : "task-type-option"
                                        }
                                        onClick={() => {

                                            setType(
                                                value as TaskType
                                            )

                                            if (
                                                value !==
                                                "assessment"
                                            ) {

                                                setAssessmentType(
                                                    "test"
                                                )

                                            }

                                        }}
                                    >
                                        {label}
                                    </button>

                                )
                            )}

                        </div>

                    </div>


                    {/* ASSESSMENT TYPE */}

                    {type ===
                        "assessment" && (

                        <div className="form-field">

                            <label>
                                Assessment type
                            </label>

                            <div className="assessment-type-options">

                                {[
                                    [
                                        "test",
                                        "Test",
                                    ],
                                    [
                                        "quiz",
                                        "Quiz",
                                    ],
                                    [
                                        "midterm",
                                        "Midterm",
                                    ],
                                    [
                                        "final",
                                        "Final",
                                    ],
                                    [
                                        "benchmark",
                                        "Benchmark",
                                    ],
                                    [
                                        "other",
                                        "Other",
                                    ],
                                ].map(
                                    ([value, label]) => (

                                        <button
                                            key={value}
                                            type="button"
                                            className={
                                                assessmentType ===
                                                value
                                                    ? "assessment-type-option selected"
                                                    : "assessment-type-option"
                                            }
                                            onClick={() =>
                                                setAssessmentType(
                                                    value as AssessmentType
                                                )
                                            }
                                        >
                                            {label}
                                        </button>

                                    )
                                )}

                            </div>

                        </div>

                    )}


                    {/* DUE DATE + DUE TIME */}

                    <div className="form-row">

                        <div className="form-field">

                            <label htmlFor="task-date">
                                Due date
                            </label>

                            <input
                                id="task-date"
                                type="date"
                                value={dueDate}
                                onChange={(event) => {

                                    setDueDate(
                                        event.target.value
                                    )

                                }}
                            />

                        </div>


                        <div className="form-field">

                            <label htmlFor="task-time">
                                Due time
                            </label>

                            <input
                                id="task-time"
                                type="time"
                                value={dueTime}
                                onChange={(event) => {

                                    setDueTime(
                                        event.target.value
                                    )

                                    setHasCustomDueTime(
                                        true
                                    )

                                }}
                            />

                        </div>

                    </div>


                    {/* ESTIMATED TIME */}

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
                            ].map(
                                ([value, label]) => (

                                    <button
                                        key={value}
                                        type="button"
                                        className={
                                            estimatedMinutes ===
                                            value
                                                ? "duration-option selected"
                                                : "duration-option"
                                        }
                                        onClick={() =>
                                            setEstimatedMinutes(
                                                value
                                            )
                                        }
                                    >
                                        {label}
                                    </button>

                                )
                            )}

                        </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="task-modal-footer">

                        {isEditing ? (

                            <button
                                type="button"
                                className="delete-task-button"
                                onClick={
                                    handleDelete
                                }
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
                                    : "Add task"}
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default AddTaskModal
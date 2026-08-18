import { useState } from "react"

import { useSubjects } from "../context/SubjectContext"
import AddSubjectModal from "../components/AddSubjectModal"

import { useTasks } from "../context/TaskContext"
import {
    getSubjectStatus,
    //getSubjectProgress,
} from "../utils/subjectStatus"


function Subjects() {

    const { subjects, deleteSubject } = useSubjects()

    const { tasks } = useTasks()

    const [showAddSubject, setShowAddSubject] =
        useState(false)


    return (
        <section className="subjects">

            {/* HEADER */}

            <div className="subjects-header">

                <div className="subjects-header-content">

                    <span className="subjects-label">
                        DESTINATIONS
                    </span>

                    <h1>
                        Your subjects.
                    </h1>

                    <p>
                        Everything you're studying, cleared for takeoff.
                    </p>

                </div>


                <button
                    className="add-subject"
                    onClick={() => setShowAddSubject(true)}
                >
                    + Add subject
                </button>

            </div>


            {/* SUBJECT GRID */}

            <div className="subject-grid">

                {subjects.map((subject) => {

                    const status = getSubjectStatus(
                        tasks,
                        subject.name
                    )

                    const subjectTasks = tasks.filter(
                        (task) =>
                            task.subject === subject.name
                    )

                    const completedTasks =
                        subjectTasks.filter(
                            (task) => task.completed
                        )

                    const progress =
                        subjectTasks.length === 0
                            ? 0
                            : Math.round(
                                (completedTasks.length /
                                    subjectTasks.length) *
                                100
                            )

                    const activeTasks =
                        subjectTasks.filter(
                            (task) => !task.completed
                        ).length

                    const upcomingTasks =
                        subjectTasks.filter(
                            (task) => !task.completed
                        ).length

                    const levelLabel =
                        subject.level === "ap"
                            ? "ADVANCED PLACEMENT"
                            : subject.level === "honors"
                                ? "HONORS / ACCELERATED"
                                : "REGULAR"


                    return (

                        <div
                            className="subject-card"
                            key={subject.id}
                        >

                            {/* TOP */}

                            <div className="subject-card-top">

                                <span className="subject-code">
                                    {levelLabel}
                                </span>

                                <span
                                    className={`subject-status ${status
                                        .toLowerCase()
                                        .replaceAll(" ", "-")
                                        }`}
                                >
                                    {status}
                                </span>

                                <button
                                    type="button"
                                    className="subject-delete-button"
                                    onClick={() => {

                                        const confirmed =
                                            window.confirm(
                                                `Remove ${subject.name} from your subjects?`
                                            )

                                        if (confirmed) {
                                            deleteSubject(subject.id)
                                        }

                                    }}
                                    aria-label={`Remove ${subject.name}`}
                                >
                                    ×
                                </button>

                            </div>


                            {/* NAME */}

                            <h2>
                                {subject.name}
                            </h2>


                            {/* TASK COUNT */}

                            <p>
                                {activeTasks} active{" "}
                                {activeTasks === 1
                                    ? "task"
                                    : "tasks"}
                            </p>


                            {/* PROGRESS */}

                            <div className="subject-progress">

                                <div className="progress-track">

                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${progress}%`,
                                        }}
                                    />

                                </div>


                                <span>
                                    {progress}%
                                </span>

                            </div>


                            {/* FOOTER */}

                            <div className="subject-footer">

                                <span>
                                    {progress === 100
                                        ? "All caught up"
                                        : "Keep moving"}
                                </span>

                                <span>
                                    {upcomingTasks} upcoming
                                </span>

                            </div>


                            {/* DUAL ENROLLMENT */}

                            {subject.dualEnrollment && (

                                <div className="subject-designation">
                                    DUAL ENROLLMENT
                                </div>

                            )}

                        </div>

                    )
                })}


                {/* EMPTY STATE */}

                {subjects.length === 0 && (

                    <div className="subjects-empty">

                        <span className="subjects-label">
                            NO DESTINATIONS
                        </span>

                        <h2>
                            Nothing on your schedule yet.
                        </h2>

                        <p>
                            Add your first subject to get started.
                        </p>

                    </div>

                )}

            </div>


            {/* ADD SUBJECT */}

            <button
                className="add-subject"
                onClick={() =>
                    setShowAddSubject(true)
                }
            >
                + Add subject
            </button>


            {/* MODAL */}

            {showAddSubject && (

                <AddSubjectModal
                    onClose={() =>
                        setShowAddSubject(false)
                    }
                />

            )}

        </section>
    )
}


export default Subjects
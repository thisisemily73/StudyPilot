import { useState } from "react"

import { subjectOptions } from "../data/subjects"
import { apCourses } from "../data/apCourses"

import { useSubjects } from "../context/SubjectContext"


type AddSubjectModalProps = {
    onClose: () => void
}


function AddSubjectModal({
    onClose,
}: AddSubjectModalProps) {

    const { subjects, addSubject } = useSubjects()


    const [level, setLevel] = useState<
        "regular" | "honors" | "ap"
    >("regular")

    const [subject, setSubject] = useState("")

    const [apCourse, setApCourse] = useState("")

    const [dualEnrollment, setDualEnrollment] =
        useState(false)

    const [college, setCollege] = useState("")

    const [otherSubject, setOtherSubject] =
        useState("")


    /*
     * REGULAR / HONORS
     */

    const isOther =
        subject === "Other"


    /*
     * CHECK IF ALREADY ADDED
     */

    function isAlreadyAdded(
        subjectName: string
    ) {

        return subjects.some(
            (existingSubject) =>
                existingSubject.name.toLowerCase() ===
                subjectName.toLowerCase()
        )
    }


    /*
     * GET FINAL SUBJECT NAME
     */

    function getSubjectName() {

        if (level === "ap") {

            if (!apCourse) {
                return ""
            }

            /*
             * AP Chemistry
             * AP Calculus BC
             *
             * becomes:
             *
             * Chemistry
             * Calculus BC
             */

            return apCourse.replace(/^AP\s+/i, "")
        }


        if (isOther) {
            return otherSubject.trim()
        }


        return subject
    }


    /*
     * SUBMIT
     */

    function handleSubmit(
        event: React.FormEvent
    ) {

        event.preventDefault()


        const finalSubject =
            getSubjectName()


        if (!finalSubject) {
            return
        }


        if (isAlreadyAdded(finalSubject)) {
            return
        }


        addSubject({

            name: finalSubject,

            level,

            dualEnrollment,

            apCourse:
                level === "ap"
                    ? apCourse
                    : undefined,

            college:
                dualEnrollment &&
                college.trim()
                    ? college.trim()
                    : undefined,

        })


        onClose()
    }


    return (
        <div className="modal-overlay">

            <div className="subject-modal">

                {/* HEADER */}

                <div className="task-modal-header">

                    <div>

                        <span>
                            DESTINATIONS
                        </span>

                        <h2>
                            Add a subject
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

                    {/* COURSE LEVEL */}

                    <label>
                        Course level
                    </label>


                    <div className="course-level-options">

                        <button
                            type="button"
                            className={
                                level === "regular"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() => {
                                setLevel("regular")
                                setSubject("")
                                setApCourse("")
                            }}
                        >
                            Regular
                        </button>


                        <button
                            type="button"
                            className={
                                level === "honors"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() => {
                                setLevel("honors")
                                setSubject("")
                                setApCourse("")
                            }}
                        >
                            Honors / Accelerated
                        </button>


                        <button
                            type="button"
                            className={
                                level === "ap"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() => {
                                setLevel("ap")
                                setSubject("")
                            }}
                        >
                            AP
                        </button>

                    </div>


                    {/* SUBJECT */}

                    {level !== "ap" ? (

                        <label>

                            Subject

                            <select
                                value={subject}
                                onChange={(event) =>
                                    setSubject(
                                        event.target.value
                                    )
                                }
                                required
                            >

                                <option
                                    value=""
                                    disabled
                                >
                                    Select a subject
                                </option>


                                {subjectOptions.map(
                                    (option) => (

                                        <option
                                            key={option}
                                            value={option}
                                        >
                                            {option}
                                        </option>

                                    )
                                )}


                                <option value="Other">
                                    Other
                                </option>

                            </select>

                        </label>

                    ) : (

                        <label>

                            AP course

                            <select
                                value={apCourse}
                                onChange={(event) =>
                                    setApCourse(
                                        event.target.value
                                    )
                                }
                                required
                            >

                                <option
                                    value=""
                                    disabled
                                >
                                    Select an AP course
                                </option>


                                {apCourses.map(
                                    (course) => (

                                        <option
                                            key={course}
                                            value={course}
                                        >
                                            {course}
                                        </option>

                                    )
                                )}

                            </select>

                        </label>

                    )}


                    {/* OTHER SUBJECT */}

                    {isOther &&
                        level !== "ap" && (

                            <label>

                                Subject name

                                <input
                                    type="text"
                                    value={otherSubject}
                                    onChange={(
                                        event
                                    ) =>
                                        setOtherSubject(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Enter your subject"
                                    required
                                />

                            </label>

                        )}


                    {/* DUAL ENROLLMENT */}

                    <label className="checkbox-row">

                        <input
                            type="checkbox"
                            checked={
                                dualEnrollment
                            }
                            onChange={(event) =>
                                setDualEnrollment(
                                    event.target.checked
                                )
                            }
                        />

                        <span>
                            Dual Enrollment
                        </span>

                    </label>


                    {/* COLLEGE */}

                    {dualEnrollment && (

                        <label>

                            College / program

                            <span className="optional">
                                optional
                            </span>

                            <input
                                type="text"
                                value={college}
                                onChange={(event) =>
                                    setCollege(
                                        event.target.value
                                    )
                                }
                                placeholder="e.g. Rutgers University"
                            />

                        </label>

                    )}


                    {/* ACTIONS */}

                    <div className="task-modal-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="add-task-button"
                        >
                            Add subject
                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}


export default AddSubjectModal
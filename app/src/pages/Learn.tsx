import { useSubjects } from "../context/SubjectContext"

function Learn() {

    const { subjects } = useSubjects()

    return (
        <section className="learn-page">

            {/* HEADER */}

            <div className="learn-header">

                <span className="learn-label">
                    LEARN
                </span>

                <h1>
                    Learn smarter.
                </h1>

                <p>
                    Practice what you need, at the level that's right for you.
                </p>

            </div>


            {/* SUBJECTS */}

            <div className="learn-section">

                <div className="learn-section-heading">

                    <h2>
                        What are you working on?
                    </h2>

                    <p>
                        Choose a subject to get started.
                    </p>

                </div>


                <div className="learn-subject-grid">

                    {subjects.length > 0 ? (

                        subjects.map((subject) => (

                            <button
                                type="button"
                                className="learn-subject-card"
                                key={subject.id}
                            >

                                <span className="learn-subject-level">
                                    {subject.level === "ap"
                                        ? "AP"
                                        : subject.level === "honors"
                                            ? "HONORS"
                                            : "REGULAR"}
                                </span>

                                <strong>
                                    {subject.name}
                                </strong>

                                <span className="learn-subject-action">
                                    Start learning →
                                </span>

                            </button>

                        ))

                    ) : (

                        <div className="learn-empty">

                            <strong>
                                No subjects yet.
                            </strong>

                            <span>
                                Add a subject first to start learning.
                            </span>

                        </div>

                    )}

                </div>

            </div>


            {/* LEARNING MODES */}

            <div className="learn-section">

                <div className="learn-section-heading">

                    <h2>
                        How do you want to learn?
                    </h2>

                    <p>
                        StudyPilot will adapt your practice to you.
                    </p>

                </div>


                <div className="learn-mode-grid">

                    <button
                        type="button"
                        className="learn-mode-card learn-mode-primary"
                    >

                        <span className="learn-mode-label">
                            DIAGNOSTIC
                        </span>

                        <h3>
                            Find what you need to work on.
                        </h3>

                        <p>
                            Take a short assessment to identify
                            concepts you already understand and
                            areas that need more practice.
                        </p>

                        <span className="learn-mode-action">
                            Start diagnostic →
                        </span>

                    </button>


                    <button
                        type="button"
                        className="learn-mode-card"
                    >

                        <span className="learn-mode-label">
                            PRACTICE
                        </span>

                        <h3>
                            Practice at your level.
                        </h3>

                        <p>
                            Work through questions that adjust
                            based on your performance.
                        </p>

                        <span className="learn-mode-action">
                            Start practicing →
                        </span>

                    </button>

                </div>

            </div>

        </section>
    )
}

export default Learn
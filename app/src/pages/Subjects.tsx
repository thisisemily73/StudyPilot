function Subjects() {
    return (
        <section className="subjects">

            {/* HEADER */}

            <div className="subjects-header">

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


            {/* SUBJECT GRID */}

            <div className="subject-grid">


                {/* CHEMISTRY */}

                <div className="subject-card">

                    <div className="subject-card-top">

                        <span className="subject-code">
                            AP CHEMISTRY
                        </span>

                        <span className="subject-status">
                            ON COURSE
                        </span>

                    </div>

                    <h2>
                        Chemistry
                    </h2>

                    <p>
                        4 active tasks
                    </p>


                    <div className="subject-progress">

                        <div className="progress-track">
                            <div
                                className="progress-fill"
                                style={{ width: "72%" }}
                            />
                        </div>

                        <span>
                            72%
                        </span>

                    </div>


                    <div className="subject-footer">
                        <span>
                            Stoichiometry
                        </span>

                        <span>
                            2 upcoming
                        </span>
                    </div>

                </div>


                {/* CALCULUS */}

                <div className="subject-card">

                    <div className="subject-card-top">

                        <span className="subject-code">
                            AP CALCULUS BC
                        </span>

                        <span className="subject-status">
                            IN FLIGHT
                        </span>

                    </div>

                    <h2>
                        Calculus BC
                    </h2>

                    <p>
                        6 active tasks
                    </p>


                    <div className="subject-progress">

                        <div className="progress-track">
                            <div
                                className="progress-fill"
                                style={{ width: "58%" }}
                            />
                        </div>

                        <span>
                            58%
                        </span>

                    </div>


                    <div className="subject-footer">
                        <span>
                            Derivatives
                        </span>

                        <span>
                            3 upcoming
                        </span>
                    </div>

                </div>


                {/* LANGUAGE */}

                <div className="subject-card">

                    <div className="subject-card-top">

                        <span className="subject-code">
                            AP LANGUAGE
                        </span>

                        <span className="subject-status">
                            BOARDING
                        </span>

                    </div>

                    <h2>
                        English Language
                    </h2>

                    <p>
                        2 active tasks
                    </p>


                    <div className="subject-progress">

                        <div className="progress-track">
                            <div
                                className="progress-fill"
                                style={{ width: "41%" }}
                            />
                        </div>

                        <span>
                            41%
                        </span>

                    </div>


                    <div className="subject-footer">
                        <span>
                            Essay draft
                        </span>

                        <span>
                            1 upcoming
                        </span>
                    </div>

                </div>


                {/* PSYCHOLOGY */}

                <div className="subject-card">

                    <div className="subject-card-top">

                        <span className="subject-code">
                            AP PSYCHOLOGY
                        </span>

                        <span className="subject-status">
                            ON COURSE
                        </span>

                    </div>

                    <h2>
                        Psychology
                    </h2>

                    <p>
                        3 active tasks
                    </p>


                    <div className="subject-progress">

                        <div className="progress-track">
                            <div
                                className="progress-fill"
                                style={{ width: "64%" }}
                            />
                        </div>

                        <span>
                            64%
                        </span>

                    </div>


                    <div className="subject-footer">
                        <span>
                            Unit 1 review
                        </span>

                        <span>
                            2 upcoming
                        </span>
                    </div>

                </div>

            </div>


            {/* ADD SUBJECT */}

            <button className="add-subject">
                + Add subject
            </button>

        </section>
    )
}

export default Subjects
function Progress() {
    return (
        <section className="progress-page">

            {/* HEADER */}

            <div className="progress-header">

                <span className="progress-label">
                    PROGRESS
                </span>

                <h1>
                    You're on course.
                </h1>

                <p>
                    A look at how your work is moving this week.
                </p>

            </div>


            {/* OVERVIEW */}

            <div className="progress-overview">

                <div className="overview-stat">

                    <span>
                        COMPLETED
                    </span>

                    <strong>
                        12
                    </strong>

                    <small>
                        tasks this week
                    </small>

                </div>


                <div className="overview-stat">

                    <span>
                        STUDY TIME
                    </span>

                    <strong>
                        4h 35m
                    </strong>

                    <small>
                        this week
                    </small>

                </div>


                <div className="overview-stat">

                    <span>
                        ON TIME
                    </span>

                    <strong>
                        92%
                    </strong>

                    <small>
                        completion rate
                    </small>

                </div>

            </div>


            {/* WEEKLY MOMENTUM */}

            <div className="progress-section">

                <div className="progress-section-header">

                    <div>
                        <span>
                            THIS WEEK
                        </span>

                        <h2>
                            Weekly momentum
                        </h2>
                    </div>

                    <small>
                        Tasks completed
                    </small>

                </div>


                <div className="momentum-chart">

                    <div className="chart-grid">

                        <div className="chart-line" />
                        <div className="chart-line" />
                        <div className="chart-line" />
                        <div className="chart-line" />

                    </div>


                    <div className="chart-bars">

                        <div className="chart-day">
                            <div
                                className="chart-bar"
                                style={{ height: "35%" }}
                            />
                            <span>MON</span>
                        </div>

                        <div className="chart-day">
                            <div
                                className="chart-bar"
                                style={{ height: "55%" }}
                            />
                            <span>TUE</span>
                        </div>

                        <div className="chart-day">
                            <div
                                className="chart-bar"
                                style={{ height: "80%" }}
                            />
                            <span>WED</span>
                        </div>

                        <div className="chart-day">
                            <div
                                className="chart-bar"
                                style={{ height: "65%" }}
                            />
                            <span>THU</span>
                        </div>

                        <div className="chart-day">
                            <div
                                className="chart-bar"
                                style={{ height: "40%" }}
                            />
                            <span>FRI</span>
                        </div>

                    </div>

                </div>

            </div>


            {/* SUBJECT PROGRESS */}

            <div className="progress-section">

                <div className="progress-section-header">

                    <div>
                        <span>
                            SUBJECTS
                        </span>

                        <h2>
                            Your destinations
                        </h2>
                    </div>

                    <small>
                        Current progress
                    </small>

                </div>


                <div className="subject-progress-list">


                    <div className="subject-progress-row">

                        <div className="subject-progress-name">

                            <strong>
                                AP Chemistry
                            </strong>

                            <span>
                                72%
                            </span>

                        </div>

                        <div className="subject-progress-track">

                            <div
                                className="subject-progress-fill"
                                style={{ width: "72%" }}
                            />

                        </div>

                    </div>


                    <div className="subject-progress-row">

                        <div className="subject-progress-name">

                            <strong>
                                AP Calculus BC
                            </strong>

                            <span>
                                58%
                            </span>

                        </div>

                        <div className="subject-progress-track">

                            <div
                                className="subject-progress-fill"
                                style={{ width: "58%" }}
                            />

                        </div>

                    </div>


                    <div className="subject-progress-row">

                        <div className="subject-progress-name">

                            <strong>
                                AP Language
                            </strong>

                            <span>
                                41%
                            </span>

                        </div>

                        <div className="subject-progress-track">

                            <div
                                className="subject-progress-fill"
                                style={{ width: "41%" }}
                            />

                        </div>

                    </div>


                    <div className="subject-progress-row">

                        <div className="subject-progress-name">

                            <strong>
                                AP Psychology
                            </strong>

                            <span>
                                64%
                            </span>

                        </div>

                        <div className="subject-progress-track">

                            <div
                                className="subject-progress-fill"
                                style={{ width: "64%" }}
                            />

                        </div>

                    </div>

                </div>

            </div>


            {/* STATUS */}

            <div className="progress-status">

                <div>
                    <span>
                        FLIGHT STATUS
                    </span>

                    <h2>
                        On course.
                    </h2>

                    <p>
                        You're keeping pace with your weekly plan.
                    </p>
                </div>

            </div>

        </section>
    )
}

export default Progress
function Planner() {
    return (
        <section className="planner">

            {/* HEADER */}

            <div className="planner-header">

                <div>
                    <span className="planner-label">
                        PLANNER
                    </span>

                    <h1>
                        Your week.
                    </h1>

                    <p>
                        A clear view of what's ahead.
                    </p>
                </div>

                <button className="add-task-button">
                    + Add task
                </button>

            </div>


            {/* WEEK CONTROLS */}

            <div className="week-controls">

                <button className="week-arrow">
                    ←
                </button>

                <span>
                    AUGUST 11 — 15
                </span>

                <button className="week-arrow">
                    →
                </button>

            </div>


            {/* WEEK */}

            <div className="planner-week">


                {/* MONDAY */}

                <div className="planner-day today">

                    <div className="day-header">

                        <span>
                            MON
                        </span>

                        <strong>
                            11
                        </strong>

                        <small>
                            TODAY
                        </small>

                    </div>


                    <div className="day-tasks">

                        <div className="planner-task">

                            <span>
                                AP CHEMISTRY
                            </span>

                            <strong>
                                Stoichiometry
                            </strong>

                            <small>
                                25 min
                            </small>

                        </div>


                        <div className="planner-task">

                            <span>
                                AP CALCULUS BC
                            </span>

                            <strong>
                                Problem set
                            </strong>

                            <small>
                                35 min
                            </small>

                        </div>

                    </div>

                </div>


                {/* TUESDAY */}

                <div className="planner-day">

                    <div className="day-header">

                        <span>
                            TUE
                        </span>

                        <strong>
                            12
                        </strong>

                    </div>


                    <div className="day-tasks">

                        <div className="planner-task">

                            <span>
                                AP LANGUAGE
                            </span>

                            <strong>
                                Essay draft
                            </strong>

                            <small>
                                20 min
                            </small>

                        </div>

                    </div>

                </div>


                {/* WEDNESDAY */}

                <div className="planner-day">

                    <div className="day-header">

                        <span>
                            WED
                        </span>

                        <strong>
                            13
                        </strong>

                    </div>


                    <div className="day-tasks">

                        <div className="planner-task">

                            <span>
                                AP CHEMISTRY
                            </span>

                            <strong>
                                Lab preparation
                            </strong>

                            <small>
                                30 min
                            </small>

                        </div>


                        <div className="planner-task">

                            <span>
                                AP CALCULUS BC
                            </span>

                            <strong>
                                Derivative review
                            </strong>

                            <small>
                                25 min
                            </small>

                        </div>

                    </div>

                </div>


                {/* THURSDAY */}

                <div className="planner-day">

                    <div className="day-header">

                        <span>
                            THU
                        </span>

                        <strong>
                            14
                        </strong>

                    </div>


                    <div className="day-tasks">

                        <div className="planner-task">

                            <span>
                                AP CALCULUS BC
                            </span>

                            <strong>
                                Problem set
                            </strong>

                            <small>
                                Due
                            </small>

                        </div>

                    </div>

                </div>


                {/* FRIDAY */}

                <div className="planner-day">

                    <div className="day-header">

                        <span>
                            FRI
                        </span>

                        <strong>
                            15
                        </strong>

                    </div>


                    <div className="day-empty">
                        Clear skies.
                    </div>

                </div>

            </div>


            {/* WEEK SUMMARY */}

            <div className="week-summary">

                <span>
                    THIS WEEK
                </span>

                <strong>
                    6 tasks
                </strong>

                <small>
                    2 hr 15 min planned
                </small>

            </div>

        </section>
    )
}

export default Planner
function Home() {
    return (
        <section className="home">

            {/* GREETING */}
            <div className="home-header">

                <span className="home-label">
                    TODAY'S FLIGHT PLAN
                </span>

                <h1>
                    Good morning.
                </h1>

                <p>
                    Here's what you have lined up for today.
                </p>

            </div>


            {/* TODAY */}
            <div className="home-section">

                <div className="home-section-header">
                    <h2>Today</h2>

                    <span>3 tasks</span>
                </div>


                <div className="task-list">

                    <div className="task">

                        <div className="task-info">

                            <span className="task-subject">
                                AP Chemistry
                            </span>

                            <h3>
                                Stoichiometry practice
                            </h3>

                        </div>

                        <span className="task-duration">
                            25 min
                        </span>

                    </div>


                    <div className="task">

                        <div className="task-info">

                            <span className="task-subject">
                                AP Calculus BC
                            </span>

                            <h3>
                                Derivatives review
                            </h3>

                        </div>

                        <span className="task-duration">
                            35 min
                        </span>

                    </div>


                    <div className="task">

                        <div className="task-info">

                            <span className="task-subject">
                                AP Language
                            </span>

                            <h3>
                                Essay outline
                            </h3>

                        </div>

                        <span className="task-duration">
                            20 min
                        </span>

                    </div>

                </div>

            </div>


            {/* UPCOMING */}
            <div className="home-section upcoming">

                <div className="home-section-header">
                    <h2>Up next</h2>
                </div>


                <div className="upcoming-list">

                    <div className="upcoming-item">
                        <span>
                            Chemistry lab report
                        </span>

                        <small>
                            Tomorrow
                        </small>
                    </div>

                    <div className="upcoming-item">
                        <span>
                            Calculus problem set
                        </span>

                        <small>
                            Thursday
                        </small>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default Home;
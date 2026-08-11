import Reveal from "./Reveal";

function Hero() {
    return (
        <Reveal>
            <section className="hero">
                <div className="hero-content">
                    <h1>StudyPilot</h1>

                    <h2 className="slogan">
                        Navigate Your <span>Learning.</span>
                    </h2>

                    <p className="description">
                        Your personalized academic co-pilot for
                        planning your workload, learning what matters,
                        and adapting as you progress.
                    </p>

                    <a href="#early-access" className="hero-cta">
                        Join Early Access
                        <span>→</span>
                    </a>
                </div>

                <div className="hero-visual">
                    <div className="dashboard-card">
                        <div className="dashboard-header">
                            <div>
                                <span>YOUR FLIGHT PLAN</span>
                                <h3>Today's Focus</h3>
                            </div>

                            <strong>78%</strong>
                        </div>

                        <div className="study-task">
                            <div className="task-indicator" />

                            <div>
                                <strong>AP Chemistry</strong>
                                <small>Stoichiometry</small>
                            </div>

                            <span>25 min</span>
                        </div>

                        <div className="study-task">
                            <div className="task-indicator" />

                            <div>
                                <strong>AP Calculus</strong>
                                <small>Derivatives</small>
                            </div>

                            <span>35 min</span>
                        </div>

                        <div className="study-task">
                            <div className="task-indicator" />

                            <div>
                                <strong>AP Language</strong>
                                <small>Essay outline</small>
                            </div>

                            <span>20 min</span>
                        </div>

                        <div className="progress-section">
                            <div className="progress-header">
                                <span>Weekly progress</span>
                                <strong>78%</strong>
                            </div>

                            <div className="progress-bar">
                                <div className="progress-fill" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Reveal>
    );
}

export default Hero;
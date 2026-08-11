import Reveal from "./Reveal";


function HowItWorks() {
    return (
        <Reveal>
            <section className="how-it-works" id="how-it-works">

                <div className="section-heading">
                    <span className="section-label">
                        HOW IT WORKS
                    </span>

                    <h2>
                        A better way to navigate
                        <span> your learning.</span>
                    </h2>

                    <p>
                        StudyPilot helps you figure out what to do,
                        when to do it, and how to adjust when things change.
                    </p>
                </div>


                <div className="flight-path">

                    <div className="flight-stop">

                        <span className="flight-number">
                            01
                        </span>

                        <div className="flight-content">
                            <h3>Plan</h3>

                            <p>
                                Bring your assignments, exams, and goals
                                into one place.
                            </p>
                        </div>

                    </div>


                    <div className="flight-connector" />


                    <div className="flight-stop">

                        <span className="flight-number">
                            02
                        </span>

                        <div className="flight-content">
                            <h3>Prioritize</h3>

                            <p>
                                Know what deserves your attention first
                                instead of figuring it out yourself.
                            </p>
                        </div>

                    </div>


                    <div className="flight-connector" />


                    <div className="flight-stop">

                        <span className="flight-number">
                            03
                        </span>

                        <div className="flight-content">
                            <h3>Adapt</h3>

                            <p>
                                When your schedule changes, your plan
                                changes with it.
                            </p>
                        </div>

                    </div>

                </div>

            </section>
        </Reveal>
    )
}

export default HowItWorks
import Reveal from "./Reveal";

function Problem() {
    return (
        <Reveal>
            <section className="problem" id="problem">
                <div className="section-heading">
                    <span className="section-label">THE PROBLEM</span>

                    <h2>
                        School doesn't come
                        <span> with a roadmap.</span>
                    </h2>

                    <p>
                        Between assignments, exams, projects, and everything
                        else, knowing what to do next can be harder than
                        actually doing the work.
                    </p>
                </div>

                <div className="problem-grid">
                    <div className="problem-card">
                        <span className="problem-number">01</span>

                        <h3>Too much to track.</h3>

                        <p>
                            Assignments live in one place, tests in another,
                            and your mind keeps track of everything else.
                        </p>
                    </div>

                    <div className="problem-card">
                        <span className="problem-number">02</span>

                        <h3>No clear priority.</h3>

                        <p>
                            When everything feels important, it becomes
                            difficult to know what actually deserves your
                            attention first.
                        </p>
                    </div>

                    <div className="problem-card">
                        <span className="problem-number">03</span>

                        <h3>Plans fall apart.</h3>

                        <p>
                            One unexpected assignment can throw off your
                            entire week and leave you scrambling to catch up.
                        </p>
                    </div>
                </div>
            </section>
        </Reveal>
    );
}

export default Problem;

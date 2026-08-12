import Reveal from "./Reveal";


function EarlyAccess() {
    return (
        <Reveal>
            <section className="early-access" id="early-access">

                <div className="early-access-content">

                    <span className="section-label">
                        EARLY ACCESS
                    </span>

                    <h2>
                        Be part of the
                        <span> first flight.</span>
                    </h2>

                    <p>
                        StudyPilot is preparing for takeoff.
                        Join the early-access list and get notified
                        when it's ready.
                    </p>

                </div>


                <div className="early-access-form">

                    <div className="form-header">
                        <span>STUDYPILOT</span>
                        <span>PREPARING FOR TAKEOFF</span>
                    </div>

                    <iframe
                        src="https://tally.so/r/b5Rj2g"
                        width="100%"
                        height="600"
                        frameBorder="0"
                        title="StudyPilot Early Access"
                    />

                </div>

            </section>
        </Reveal>
    );
}

export default EarlyAccess;
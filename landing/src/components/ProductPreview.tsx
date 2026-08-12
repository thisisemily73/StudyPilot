function ProductPreview() {
    return (
        <section className="product-preview">
            <div className="section-heading">
                <span className="section-label">THE PLATFORM</span>

                <h2>
                    Know what to do
                    <span> next.</span>
                </h2>

                <p>
                    StudyPilot gives you a clear picture of your
                    workload and helps you focus on the next step.
                </p>
            </div>

            <div className="preview-window">
                <div className="preview-sidebar">
                    <div className="preview-logo">
                        StudyPilot
                    </div>

                    <div className="preview-nav">
                        <span className="active">Dashboard</span>
                        <span>Schedule</span>
                        <span>Subjects</span>
                        <span>Progress</span>
                    </div>
                </div>

                <div className="preview-main">
                    <div className="preview-topbar">
                        <span>Monday, August 24</span>
                        <span className="preview-status">
                            On track
                        </span>
                    </div>

                    <div className="preview-greeting">
                        <span>YOUR NEXT MOVE</span>

                        <h3>Focus on Chemistry.</h3>

                        <p>
                            Equilibrium is coming up Friday,
                            and you have a few concepts to review.
                        </p>

                        <div className="preview-action">
                            <strong>25 min</strong>
                            <span>Start session →</span>
                        </div>
                    </div>

                    <div className="preview-upcoming">
                        <div>
                            <span>UP NEXT</span>
                        </div>

                        <div className="preview-item">
                            <strong>AP Calculus</strong>
                            <span>Derivatives · 35 min</span>
                        </div>

                        <div className="preview-item">
                            <strong>AP Language</strong>
                            <span>Essay outline · 20 min</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductPreview;
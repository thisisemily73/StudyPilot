function Topbar() {
    const today = new Date()

    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    })

    return (
        <header className="topbar">

            <div className="topbar-context">
                <span className="topbar-label">
                    FLIGHT PLAN
                </span>
            </div>

            <div className="topbar-right">

                <span className="topbar-date">
                    {formattedDate}
                </span>

            </div>

        </header>
    )
}

export default Topbar
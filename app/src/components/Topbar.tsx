import { useProfile } from "../context/ProfileContext"

function Topbar() {
    const { profile } = useProfile()

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

                <div className="profile-avatar">
                    <img
                        src={profile.profilePicture}
                        alt={`${profile.name}'s profile`}
                    />
                </div>

            </div>

        </header>
    )
}

export default Topbar
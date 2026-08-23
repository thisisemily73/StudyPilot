import { useScheduleSettings } from "../context/ScheduleSettingsContext"
import { useSchoolSchedule } from "../context/SchoolScheduleContext"

function Settings() {

    const {
        dayStart,
        dayEnd,
        setDayStart,
        setDayEnd,
    } = useScheduleSettings()

    const {
        schoolStart,
        schoolEnd,
        schoolDays,
        setSchoolStart,
        setSchoolEnd,
        toggleSchoolDay,
    } = useSchoolSchedule()

    return (
        <section className="settings-page">

            {/* HEADER */}

            <div className="settings-header">

                <span className="settings-label">
                    SETTINGS
                </span>

                <h1>
                    Make it yours.
                </h1>

                <p>
                    Customize StudyPilot to work the way you do. Adjust your profile, planning preferences, and more.
                </p>

            </div>


            {/* PROFILE */}

            <div className="settings-section">

                <div className="settings-section-heading">

                    <h2>
                        Profile
                    </h2>

                    <p>
                        Basic information about your StudyPilot account.
                    </p>

                </div>


                <div className="settings-card">

                    <div className="profile-setting">

                        <div className="settings-avatar">
                            E
                        </div>

                        <div>
                            <strong>
                                Emily
                            </strong>

                            <span>
                                Student
                            </span>
                        </div>

                        <button>
                            Edit
                        </button>

                    </div>

                </div>

            </div>


            {/* PLANNING */}

            <div className="settings-section">

                <div className="settings-section-heading">

                    <h2>
                        Planning
                    </h2>

                    <p>
                        Control how StudyPilot organizes your workload.
                    </p>

                </div>


                <div className="settings-card">

                    <div className="settings-row">

                        <div>
                            <strong>
                                Weekly planning
                            </strong>

                            <span>
                                Start your planning week on Monday.
                            </span>
                        </div>

                        <select defaultValue="monday">
                            <option value="monday">
                                Monday
                            </option>

                            <option value="sunday">
                                Sunday
                            </option>
                        </select>

                    </div>


                    <div className="settings-divider" />

                    <div className="settings-row">

                        <div>
                            <strong>
                                Down time
                            </strong>

                            <span>
                                Set the hours your day normally starts and ends.
                                Your schedule will adjust automatically.
                            </span>
                        </div>

                        <div className="schedule-time-settings">

                            <input
                                type="time"
                                value={dayStart}
                                onChange={(event) =>
                                    setDayStart(event.target.value)
                                }
                            />

                            <span>
                                to
                            </span>

                            <input
                                type="time"
                                value={dayEnd}
                                onChange={(event) =>
                                    setDayEnd(event.target.value)
                                }
                            />

                        </div>

                    </div>

                    <div className="settings-divider" />

                    <div className="settings-row">

                        <div>
                            <strong>
                                Daily workload
                            </strong>

                            <span>
                                Your preferred maximum study time each day.
                            </span>
                        </div>

                        <select defaultValue="2">
                            <option value="1">
                                1 hour
                            </option>

                            <option value="2">
                                2 hours
                            </option>

                            <option value="3">
                                3 hours
                            </option>

                            <option value="4">
                                4+ hours
                            </option>
                        </select>

                    </div>

                </div>

                {/* SCHOOL SCHEDULE */}

                <div className="settings-section">

                    <div className="settings-section-heading">

                        <h2>
                            School Schedule
                        </h2>

                        <p>
                            Tell StudyPilot when your normal school day takes place.
                        </p>

                    </div>


                    <div className="settings-card">

                        {/* SCHOOL HOURS */}

                        <div className="school-schedule-row">

                            <div className="school-schedule-label">

                                <strong>
                                    School hours
                                </strong>

                                <span>
                                    Used when setting class periods on your schedule.
                                </span>

                            </div>


                            <div className="schedule-time-settings">

                                <input
                                    type="time"
                                    value={schoolStart}
                                    onChange={(event) =>
                                        setSchoolStart(event.target.value)
                                    }
                                />

                                <span>
                                    to
                                </span>

                                <input
                                    type="time"
                                    value={schoolEnd}
                                    onChange={(event) =>
                                        setSchoolEnd(event.target.value)
                                    }
                                />

                            </div>

                        </div>


                        <div className="settings-divider" />


                        {/* SCHOOL DAYS */}

                        <div className="school-days-setting">

                            <div className="school-days-label">
                                School days
                            </div>

                            <div className="school-day-selector">

                                {[
                                    "MON",
                                    "TUE",
                                    "WED",
                                    "THU",
                                    "FRI",
                                    "SAT",
                                    "SUN",
                                ].map((day, index) => (

                                    <button
                                        type="button"
                                        key={day}
                                        className={
                                            schoolDays.includes(index)
                                                ? "selected"
                                                : ""
                                        }
                                        onClick={() =>
                                            toggleSchoolDay(index)
                                        }
                                    >
                                        {day}
                                    </button>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* NOTIFICATIONS */}

            <div className="settings-section">

                <div className="settings-section-heading">

                    <h2>
                        Notifications
                    </h2>

                    <p>
                        Choose what StudyPilot reminds you about.
                    </p>

                </div>


                <div className="settings-card">

                    <div className="settings-row">

                        <div>
                            <strong>
                                Task reminders
                            </strong>

                            <span>
                                Get reminded when a task is coming up.
                            </span>
                        </div>

                        <label className="toggle">

                            <input
                                type="checkbox"
                                defaultChecked
                            />

                            <span className="toggle-slider" />

                        </label>

                    </div>


                    <div className="settings-divider" />


                    <div className="settings-row">

                        <div>
                            <strong>
                                Daily overview
                            </strong>

                            <span>
                                Receive a summary of your day each morning.
                            </span>
                        </div>

                        <label className="toggle">

                            <input
                                type="checkbox"
                                defaultChecked
                            />

                            <span className="toggle-slider" />

                        </label>

                    </div>

                </div>

            </div>


            {/* APPEARANCE */}

            <div className="settings-section">

                <div className="settings-section-heading">

                    <h2>
                        Appearance
                    </h2>

                    <p>
                        Adjust how StudyPilot looks.
                    </p>

                </div>


                <div className="settings-card">

                    <div className="settings-row">

                        <div>
                            <strong>
                                Theme
                            </strong>

                            <span>
                                Choose how StudyPilot appears.
                            </span>
                        </div>

                        <select defaultValue="light">

                            <option value="light">
                                Light
                            </option>

                            <option value="system">
                                System
                            </option>

                            <option value="dark">
                                Dark
                            </option>

                        </select>

                    </div>

                </div>

            </div>


            {/* ACCOUNT */}

            <div className="settings-section account-section">

                <div className="settings-section-heading">

                    <h2>
                        Account
                    </h2>

                    <p>
                        Manage your StudyPilot account.
                    </p>

                </div>


                <div className="settings-card">

                    <button className="danger-button">
                        Sign out
                    </button>

                </div>

            </div>

        </section>
    )
}

export default Settings
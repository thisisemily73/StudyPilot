import { useState } from "react"
import { useSettings } from "../context/SettingsContext"
import { useSchoolSchedule } from "../context/SchoolScheduleContext"
import { useAuth } from "../context/AuthContext"
import { useProfile } from "../context/ProfileContext"

function Settings() {

    const {
        dayStart,
        dayEnd,
        setDayStart,
        setDayEnd,

        dailyWorkload,
        setDailyWorkload,

        theme,
        setTheme,
    } = useSettings()

    const {
        schoolStart,
        schoolEnd,
        schoolDays,
        setSchoolStart,
        setSchoolEnd,
        toggleSchoolDay,
    } = useSchoolSchedule()

    const { signOut } = useAuth()

    {/* PROFILE CONSTS */ }

    const {
        profile,
        updateProfile,
    } = useProfile()

    const [editingProfile, setEditingProfile] =
        useState(false)

    const [profileName, setProfileName] =
        useState(profile.name)

    const [profileUsername, setProfileUsername] =
        useState(profile.username)

    const [profileGrade, setProfileGrade] =
        useState(profile.grade)

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

                    {!editingProfile ? (

                        <div className="profile-setting">

                            <div>
                                <strong>
                                    {profile.name}
                                </strong>

                                <span>
                                    {profile.username
                                        ? `@${profile.username}`
                                        : "Set up your profile"}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setProfileName(profile.name)
                                    setProfileUsername(profile.username)
                                    setProfileGrade(profile.grade)
                                    setEditingProfile(true)
                                }}
                            >
                                Edit
                            </button>

                        </div>

                    ) : (

                        <div className="profile-editor">

                            <div className="profile-editor-field">

                                <label>
                                    Name
                                </label>

                                <input
                                    type="text"
                                    value={profileName}
                                    onChange={(event) =>
                                        setProfileName(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Your name"
                                />

                            </div>


                            <div className="profile-editor-field">

                                <label>
                                    Username
                                </label>

                                <input
                                    type="text"
                                    value={profileUsername}
                                    onChange={(event) =>
                                        setProfileUsername(
                                            event.target.value
                                                .replace(/\s/g, "")
                                        )
                                    }
                                    placeholder="username"
                                />

                            </div>


                            <div className="profile-editor-field">

                                <label>
                                    Grade
                                </label>

                                <select
                                    value={profileGrade}
                                    onChange={(event) =>
                                        setProfileGrade(
                                            event.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        Select grade
                                    </option>

                                    <option value="9">
                                        9th grade
                                    </option>

                                    <option value="10">
                                        10th grade
                                    </option>

                                    <option value="11">
                                        11th grade
                                    </option>

                                    <option value="12">
                                        12th grade
                                    </option>

                                </select>

                            </div>


                            <div className="profile-editor-actions">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditingProfile(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="primary"
                                    onClick={() => {

                                        updateProfile({
                                            name:
                                                profileName.trim() ||
                                                "Student",

                                            username:
                                                profileUsername.trim(),

                                            grade:
                                                profileGrade,
                                        })

                                        setEditingProfile(false)

                                    }}
                                >
                                    Save changes
                                </button>

                            </div>

                        </div>

                    )}

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

                    {/* <div className="settings-row">

                        <div>
                            <strong>
                                Weekly planning
                            </strong>

                            <span>
                                Start your planning week on the day you choose.
                            </span>
                        </div>

                        <select
                            value={weeklyStart}
                            onChange={(event) =>
                                setWeeklyStart(
                                    event.target.value as "monday" | "sunday"
                                )
                            }
                        >
                            <option value="monday">
                                Monday
                            </option>

                            <option value="sunday">
                                Sunday
                            </option>
                        </select>

                    </div> */}


                    <div className="settings-divider" />

                    <div className="school-schedule-row">
                        <div className="school-schedule-label">

                            <div>
                                <strong>
                                    Down time
                                </strong>
                            </div>
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

                        <select
                            value={dailyWorkload}
                            onChange={(event) =>
                                setDailyWorkload(
                                    event.target.value as "1" | "2" | "3" | "4"
                                )
                            }
                        >
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

            {/* NOTIFICATIONS */}

            {/* < div className="settings-section" >

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
                                checked={taskReminders}
                                onChange={(event) =>
                                    setTaskReminders(event.target.checked)
                                }
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
                                checked={dailyOverview}
                                onChange={(event) =>
                                    setDailyOverview(event.target.checked)
                                }
                            />

                            <span className="toggle-slider" />

                        </label>

                    </div>

                </div>

            </div > */}


            {/* APPEARANCE */}

            < div className="settings-section" >

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

                        <select
                            value={theme}
                            onChange={(event) =>
                                setTheme(
                                    event.target.value as "light" | "system" | "dark"
                                )
                            }
                        >

                            <option value="light">
                                Light
                            </option>

                            <option value="dark">
                                Dark
                            </option>

                            <option value="system">
                                System
                            </option>

                        </select>

                    </div>

                </div>

            </div >


            {/* ACCOUNT */}

            < div className="settings-section account-section" >

                <div className="settings-section-heading">

                    <h2>
                        Account
                    </h2>

                    <p>
                        Manage your StudyPilot account.
                    </p>

                </div>


                <div className="settings-card">

                    <button
                        className="danger-button"
                        onClick={signOut}
                    >
                        Sign out
                    </button>

                </div>

            </div >

        </section >
    )
}

export default Settings
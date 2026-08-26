import { useState } from "react"
import { NavLink } from "react-router-dom"

function Sidebar() {

    const [mobileMenuOpen, setMobileMenuOpen] =
        useState(false)

    function closeMobileMenu() {
        setMobileMenuOpen(false)
    }

    return (
        <>
            {/* DESKTOP SIDEBAR */}

            <aside className="sidebar">

                <div className="sidebar-logo">
                    <img
                        src="/StudyPilot/app/logo.svg"
                        alt="StudyPilot"
                    />
                    <span>StudyPilot</span>
                </div>

                <nav className="sidebar-nav">

                    <NavLink
                        to="StudyPilot/app/"
                        end
                        className="sidebar-link"
                    >
                        Flight Plan
                    </NavLink>

                    <NavLink
                        to="StudyPilot/app/tasks"
                        className="sidebar-link"
                    >
                        Tasks
                    </NavLink>

                    <NavLink
                        to="StudyPilot/app/schedule"
                        className="sidebar-link"
                    >
                        Schedule
                    </NavLink>

                    <NavLink
                        to="StudyPilot/app/subjects"
                        className="sidebar-link"
                    >
                        Subjects
                    </NavLink>

                    <NavLink
                        to="StudyPilot/app/progress"
                        className="sidebar-link"
                    >
                        Progress
                    </NavLink>

                </nav>

                <div className="sidebar-nav sidebar-bottom">

                    <NavLink
                        to="StudyPilot/app/settings"
                        className="sidebar-link"
                    >
                        Settings
                    </NavLink>

                </div>

            </aside>


            {/* MOBILE HEADER */}

            <header className="mobile-header">

                <div className="mobile-header-logo">
                    <img
                        src="/StudyPilot/app/logo.svg"
                        alt="StudyPilot"
                    />
                    <span>StudyPilot</span>
                </div>

                <button
                    type="button"
                    className="mobile-menu-button"
                    onClick={() =>
                        setMobileMenuOpen(
                            (current) => !current
                        )
                    }
                    aria-label={
                        mobileMenuOpen
                            ? "Close navigation"
                            : "Open navigation"
                    }
                >
                    {mobileMenuOpen ? "×" : "☰"}
                </button>

            </header>


            {/* MOBILE MENU */}

            {mobileMenuOpen && (

                <nav className="mobile-menu">

                    <div className="mobile-menu-nav">

                        <NavLink
                            to="StudyPilot/app/"
                            end
                            className="mobile-menu-link"
                            onClick={closeMobileMenu}
                        >
                            Flight Plan
                        </NavLink>

                        <NavLink
                            to="StudyPilot/app/tasks"
                            className="mobile-menu-link"
                            onClick={closeMobileMenu}
                        >
                            Tasks
                        </NavLink>

                        <NavLink
                            to="StudyPilot/app/schedule"
                            className="mobile-menu-link"
                            onClick={closeMobileMenu}
                        >
                            Schedule
                        </NavLink>

                        <NavLink
                            to="StudyPilot/app/subjects"
                            className="mobile-menu-link"
                            onClick={closeMobileMenu}
                        >
                            Subjects
                        </NavLink>

                        <NavLink
                            to="StudyPilot/app/progress"
                            className="mobile-menu-link"
                            onClick={closeMobileMenu}
                        >
                            Progress
                        </NavLink>

                        <NavLink
                            to="StudyPilot/app/settings"
                            className="mobile-menu-link"
                            onClick={closeMobileMenu}
                        >
                            Settings
                        </NavLink>

                    </div>
                </nav>

            )}

        </>
    )
}

export default Sidebar
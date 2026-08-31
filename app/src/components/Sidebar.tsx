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
                        src={`${import.meta.env.BASE_URL}logo.svg`}
                        alt="StudyPilot"
                        className="logo-dark-mode"
                    />

                    <img
                        src={`${import.meta.env.BASE_URL}logo_dark.svg`}
                        alt="StudyPilot"
                        className="logo-light-mode"
                    />

                    <span>StudyPilot</span>

                </div>

                <nav className="sidebar-nav">

                    <NavLink
                        to="/"
                        end
                        className="sidebar-link"
                    >
                        Flight Plan
                    </NavLink>

                    <NavLink
                        to="/planner"
                        end
                        className="sidebar-link"
                    >
                        Planner
                    </NavLink>

                    <NavLink
                        to="/subjects"
                        className="sidebar-link"
                    >
                        Subjects
                    </NavLink>

                    <NavLink
                        to="/learn"
                        className="sidebar-link"
                    >
                        Learn
                    </NavLink>

                    <NavLink
                        to="/progress"
                        className="sidebar-link"
                    >
                        Progress
                    </NavLink>

                </nav>

                <div className="sidebar-nav sidebar-bottom">

                    <NavLink
                        to="/settings"
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
                        src={`${import.meta.env.BASE_URL}logo.svg`}
                        alt="StudyPilot"
                        className="logo-light-mode"
                    />

                    <img
                        src={`${import.meta.env.BASE_URL}logo_dark.svg`}
                        alt="StudyPilot"
                        className="logo-dark-mode"
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
                            to="/"
                            end
                            className="mobile-menu-link"
                            onClick={closeMobileMenu}
                        >
                            Flight Plan
                        </NavLink>

                        <NavLink
                            to="/planner"
                            className="mobile-menu-link"
                            onClick={closeMobileMenu}
                        >
                            Planner
                        </NavLink>

                        <NavLink
                            to="/subjects"
                            className="mobile-menu-link"
                            onClick={closeMobileMenu}
                        >
                            Subjects
                        </NavLink>

                        <NavLink
                            to="/progress"
                            className="mobile-menu-link"
                            onClick={closeMobileMenu}
                        >
                            Progress
                        </NavLink>

                        <NavLink
                            to="/settings"
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
import { NavLink } from 'react-router-dom'

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                StudyPilot
            </div>

            <nav className="sidebar-nav">

                <NavLink to="StudyPilot/app/" end className="sidebar-link">
                    Flight Plan
                </NavLink>

                <NavLink to="StudyPilot/app/todo" className="sidebar-link">
                    To-Do
                </NavLink>

                <NavLink to="StudyPilot/app/planner" className="sidebar-link">
                    Planner
                </NavLink>

                <NavLink to="StudyPilot/app/schedule" className="sidebar-link">
                    Schedule
                </NavLink>

                <NavLink to="StudyPilot/app/subjects" className="sidebar-link">
                    Subjects
                </NavLink>

                <NavLink to="StudyPilot/app/progress" className="sidebar-link">
                    Progress
                </NavLink>

            </nav>

            <div className="sidebar-nav sidebar-bottom">

                <NavLink to="StudyPilot/app/settings" className="sidebar-link">
                    Settings
                </NavLink>

            </div>

        </aside>
    )
}

export default Sidebar
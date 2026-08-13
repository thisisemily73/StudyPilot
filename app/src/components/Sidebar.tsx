import { NavLink } from 'react-router-dom'

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                StudyPilot
            </div>

            <nav className="sidebar-nav">

                <NavLink to="/" end className="sidebar-link">
                    Flight Plan
                </NavLink>

                <NavLink to="/todo" className="sidebar-link">
                    To-Do
                </NavLink>

                <NavLink to="/planner" className="sidebar-link">
                    Planner
                </NavLink>

                <NavLink to="/subjects" className="sidebar-link">
                    Subjects
                </NavLink>

                <NavLink to="/progress" className="sidebar-link">
                    Progress
                </NavLink>

            </nav>

            <div className="sidebar-bottom">

                <NavLink to="/settings" className="sidebar-link">
                    Settings
                </NavLink>

            </div>

        </aside>
    )
}

export default Sidebar
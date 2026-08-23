import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

import Home from './pages/Home'
import Planner from './pages/Planner'
import Subjects from './pages/Subjects'
import Progress from './pages/Progress'
import Schedule from './pages/Schedule'
import Settings from './pages/Settings'
import Todo from './pages/Todo'

import SubjectDetails from "./pages/SubjectDetails"

function App() {
    return (
        <BrowserRouter>

            <div className="app">

                <Sidebar />

                <div className="app-main">

                    <Topbar />

                    <main>
                        <Routes>

                            <Route path="StudyPilot/app/" element={<Home />} />

                            <Route path="StudyPilot/app/todo" element={<Todo />} />

                            <Route path="StudyPilot/app/planner" element={<Planner />} />

                            <Route path="StudyPilot/app/schedule" element={<Schedule />} />

                            <Route path="StudyPilot/app/subjects" element={<Subjects />} />

                            <Route path="StudyPilot/app/subjects/:subjectId" element={<SubjectDetails />} />

                            <Route path="StudyPilot/app/progress" element={<Progress />} />

                            <Route path="StudyPilot/app/settings" element={<Settings />} />

                        </Routes>
                    </main>

                </div>

            </div>

        </BrowserRouter>
    )
}

export default App
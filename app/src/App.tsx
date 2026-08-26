import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

import Home from './pages/Home'
import Subjects from './pages/Subjects'
import Progress from './pages/Progress'
import Schedule from './pages/Schedule'
import Settings from './pages/Settings'
import Tasks from './pages/Tasks'
import Auth from './pages/Auth'


import SubjectDetails from "./pages/SubjectDetails"

function App() {

    const { user, loading } = useAuth()

    if (loading) {
        return null
    }

    if (!user) {
        return <Auth />
    }

    return (
        <BrowserRouter>
            <div className="app">
                <Sidebar />
                <div className="app-main">
                    <Topbar />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/schedule" element={<Schedule />} />
                            <Route path="/subjects" element={<Subjects />} />
                            <Route path="/subjects/:subjectId" element={<SubjectDetails />} />
                            <Route path="/progress" element={<Progress />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
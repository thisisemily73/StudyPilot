import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

import Home from './pages/Home'
import Planner from './pages/Planner'
import Subjects from './pages/Subjects'
import Progress from './pages/Progress'
import Settings from './pages/Settings'

function App() {
    return (
        <BrowserRouter>

            <div className="app">

                <Sidebar />

                <div className="app-main">

                    <Topbar />

                    <main>
                        <Routes>

                            <Route path="/" element={<Home />} />

                            <Route path="/planner" element={<Planner />} />

                            <Route path="/subjects" element={<Subjects />} />

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
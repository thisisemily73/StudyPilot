import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import '../../shared/Variables.css'
import './styles/Global.css'
import './styles/Sidebar.css'
import './styles/Topbar.css'
import './styles/Home.css'
import './styles/Planner.css'
import './styles/Subjects.css'
import './styles/Progress.css'
import './styles/Settings.css'
import './styles/Subjects.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
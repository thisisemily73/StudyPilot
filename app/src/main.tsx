import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { ScheduleSettingsProvider } from "./context/ScheduleSettingsContext"
import { TaskProvider } from './context/TaskContext'
import { SubjectProvider } from "./context/SubjectContext"
import { StudyTimeProvider } from "./context/StudyTimeContext"
import { SchoolScheduleProvider } from './context/SchoolScheduleContext'


import '@shared/Variables.css'
import './styles/Global.css'

import './styles/Sidebar.css'
import './styles/Topbar.css'
import './styles/Home.css'
import './styles/Planner.css'
import './styles/Schedule.css'
import './styles/Subjects.css'
import './styles/Progress.css'
import './styles/Settings.css'
import './styles/Subjects.css'
import './styles/Todo.css'

import './styles/SubjectDetails.css'

import './styles/AddTaskModal.css'
import './styles/AddSubjectModal.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ScheduleSettingsProvider>
      <TaskProvider>
        <SubjectProvider>
          <StudyTimeProvider>
            <SchoolScheduleProvider>
              <App />
            </SchoolScheduleProvider>
          </StudyTimeProvider>
        </SubjectProvider>
      </TaskProvider>
    </ScheduleSettingsProvider>
  </React.StrictMode>,
)
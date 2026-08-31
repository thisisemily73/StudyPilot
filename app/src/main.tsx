import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { SettingsProvider } from "./context/SettingsContext"
import { TaskProvider } from './context/TaskContext'
import { SubjectProvider } from "./context/SubjectContext"
import { StudyTimeProvider } from "./context/StudyTimeContext"
import { EventProvider } from './context/EventContext'
import { AuthProvider } from "./context/AuthContext"
import { ProfileProvider } from "./context/ProfileContext"


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
import './styles/Tasks.css'
import './styles/Auth.css'

import './styles/SubjectDetails.css'

import './styles/AddTaskModal.css'
import './styles/AddSubjectModal.css'
import './styles/AddEventModal.css'

import "./config/firebase"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <ProfileProvider>
          <TaskProvider>
            <SubjectProvider>
              <StudyTimeProvider>
                  <EventProvider>
                    <App />
                  </EventProvider>
              </StudyTimeProvider>
            </SubjectProvider>
          </TaskProvider>
        </ProfileProvider>
      </SettingsProvider>
    </AuthProvider>
  </React.StrictMode>,
)
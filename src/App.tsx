import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import CaseStudyPage from './pages/CaseStudyPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/work/:slug" element={<CaseStudyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

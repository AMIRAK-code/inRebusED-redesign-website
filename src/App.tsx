import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import CaseStudyPage from './pages/CaseStudyPage'
import BriefPage from './pages/BriefPage'
import ScrollToTop from './components/ScrollToTop'

const DebugLogosPage = import.meta.env.DEV
  ? lazy(() => import('./pages/DebugLogosPage'))
  : null

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/"       element={<HomePage />} />
        <Route path="/work"   element={<WorkPage />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
        <Route path="/brief"  element={<BriefPage />} />
        {import.meta.env.DEV && DebugLogosPage && (
          <Route
            path="/debug/logos"
            element={
              <Suspense fallback={null}>
                <DebugLogosPage />
              </Suspense>
            }
          />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

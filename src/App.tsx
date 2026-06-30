import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import RouteLoader from './components/RouteLoader/RouteLoader'
import CookieBanner from './components/CookieBanner/CookieBanner'

const HomePage          = lazy(() => import('./pages/HomePage'))
const WorkPage          = lazy(() => import('./pages/WorkPage'))
const CaseStudyPage     = lazy(() => import('./pages/CaseStudyPage'))
const BriefPage         = lazy(() => import('./pages/BriefPage'))
const PrivacyPage       = lazy(() => import('./pages/PrivacyPage'))
const CookiesPage       = lazy(() => import('./pages/CookiesPage'))
const SustainabilityPage = lazy(() => import('./pages/SustainabilityPage'))
const NotFoundPage      = lazy(() => import('./pages/NotFoundPage'))

const DebugLogosPage = import.meta.env.DEV
  ? lazy(() => import('./pages/DebugLogosPage'))
  : null

export default function App() {
  return (
    <>
      <ScrollToTop />
      <CookieBanner />
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          {/* ── English routes ── */}
          <Route path="/"              element={<HomePage />} />
          <Route path="/work"          element={<WorkPage />} />
          <Route path="/work/:slug"    element={<CaseStudyPage />} />
          <Route path="/brief"         element={<BriefPage />} />
          <Route path="/privacy"       element={<PrivacyPage />} />
          <Route path="/cookies"       element={<CookiesPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />

          {/* ── Italian routes ── */}
          <Route path="/it"                   element={<HomePage />} />
          <Route path="/it/work"              element={<WorkPage />} />
          <Route path="/it/work/:slug"        element={<CaseStudyPage />} />
          <Route path="/it/brief"             element={<BriefPage />} />
          <Route path="/it/privacy"           element={<PrivacyPage />} />
          <Route path="/it/cookies"           element={<CookiesPage />} />
          <Route path="/it/sustainability"    element={<SustainabilityPage />} />

          {import.meta.env.DEV && DebugLogosPage && (
            <Route path="/debug/logos" element={<DebugLogosPage />} />
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

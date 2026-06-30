import { useState, useEffect } from 'react'

export const CONSENT_VERSION = 1
export const CONSENT_MAX_AGE_DAYS = 365

const CONSENT_KEY = 'inrebus-consent'

// Domains to warn about in dev mode if fetched without consent
const TRACKER_DOMAINS = [
  'google-analytics.com', 'analytics.google.com', 'googletagmanager.com',
  'facebook.net', 'connect.facebook.net', 'hotjar.com', 'clarity.ms',
  'segment.io', 'mixpanel.com', 'amplitude.com', 'heap.io', 'fullstory.com',
]

export type Consent = {
  essential: true
  analytics: boolean
  marketing: boolean
  timestamp: number
  version: number
}

export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Consent
    const maxAgeMs = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000
    if (Date.now() - parsed.timestamp > maxAgeMs) {
      localStorage.removeItem(CONSENT_KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function setConsent(c: Partial<Omit<Consent, 'essential' | 'timestamp' | 'version'>>) {
  const current = getConsent()
  const next: Consent = {
    essential: true,
    analytics: current?.analytics ?? false,
    marketing: current?.marketing ?? false,
    ...c,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  }
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(next))
    window.dispatchEvent(new CustomEvent('consent-changed', { detail: next }))
  } catch {
    // localStorage unavailable (private browsing, storage quota, etc.)
  }
}

export function useConsent(): Consent | null {
  const [consent, setConsentState] = useState<Consent | null>(() => getConsent())

  useEffect(() => {
    const handler = (e: Event) => {
      setConsentState((e as CustomEvent<Consent>).detail)
    }
    window.addEventListener('consent-changed', handler)
    return () => window.removeEventListener('consent-changed', handler)
  }, [])

  return consent
}

/**
 * All future analytics, marketing pixels, A/B testing scripts, and chat widgets
 * MUST gate themselves through this helper. Never load third-party tracking code
 * without calling this function first — it checks stored consent and runs the
 * loader only if the user has granted the relevant category.
 *
 * Usage:
 *   loadIfConsented('analytics', () => { initGoogleAnalytics() })
 *   loadIfConsented('marketing', () => { initFacebookPixel() })
 */
export function loadIfConsented(
  category: 'analytics' | 'marketing',
  loader: () => void,
): void {
  if (getConsent()?.[category]) {
    loader()
  }
}

// Dev-mode guard: warn if a potential tracker domain is fetched without consent
if (import.meta.env.DEV && typeof window !== 'undefined') {
  const origFetch = window.fetch
  window.fetch = function (input, init) {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.href
          : (input as Request).url
    const isTracker = TRACKER_DOMAINS.some(d => url.includes(d))
    if (isTracker) {
      const c = getConsent()
      if (!c?.analytics && !c?.marketing) {
        console.warn(
          `[inRebus consent] Potential tracker domain fetched without consent: "${url}". ` +
          `Gate this request with loadIfConsented('analytics', () => { ... }).`
        )
      }
    }
    return origFetch.call(this, input, init)
  }
}

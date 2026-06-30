import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import lenis from '../lib/lenis'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    lenis.scrollTo(0, { immediate: true })
  }, [pathname])
  return null
}

import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from './gsap'

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const lenis = new Lenis({
  duration: prefersReduced ? 0 : 1.6,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 1.5,
  syncTouch: false,
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(500, 33)

export default lenis

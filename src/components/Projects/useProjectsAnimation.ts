import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, Flip } from '../../lib/gsap'

type FilterValue = string

function buildCardOffsets(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    d0: {
      x: 0,
      y: 0,
      rotation: (i % 2 === 0 ? 1 : -1) * (1.2 + (i % 3) * 0.6),
    },
    d1: {
      x:        (i % 2 === 0 ? 28 : -24) + (i % 3 === 0 ? 10 : -6),
      y:        (i % 3 === 0 ? 16 : -14) + (i % 2 === 0 ? 6 : -4),
      rotation: (i % 2 === 0 ? 1 : -1) * (4.5 + (i % 3) * 1.2),
      scale:    0.96,
    },
    d2: {
      x:        (i % 2 === 0 ? 44 : -38) + (i % 3 === 0 ? 14 : -8),
      y:        (i % 3 === 0 ? 26 : -20) + (i % 2 === 0 ? 8 : -6),
      rotation: (i % 2 === 0 ? 1 : -1) * (8 + (i % 3) * 1.6),
      scale:    0.91,
    },
  }))
}

interface AnimationRefs {
  sectionRef:      React.RefObject<HTMLElement>
  cardWrapperRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  cardRefs:        React.MutableRefObject<(HTMLDivElement | null)[]>
  dimRefs:         React.MutableRefObject<(HTMLDivElement | null)[]>
  counterRef:      React.MutableRefObject<HTMLSpanElement | null>
  progressDotRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  progressFillRef: React.MutableRefObject<HTMLDivElement | null>
  filterBarRef:    React.MutableRefObject<HTMLDivElement | null>
  indicatorRef:    React.MutableRefObject<HTMLDivElement | null>
  pillRefs:        React.MutableRefObject<Map<string, HTMLButtonElement>>
}

export function useProjectsAnimation(
  refs: AnimationRefs,
  n: number,
  filter: FilterValue,
  moveIndicator: (f: string, animate: boolean) => void,
) {
  const isTransitioning = useRef(false)

  useGSAP(() => {
    const section = refs.sectionRef.current
    if (!section) return

    const CARD_OFFSETS = buildCardOffsets(n)

    refs.cardRefs.current.forEach((card, i) => {
      if (!card) return
      gsap.set(card, {
        y:        window.innerHeight * 1.15,
        x:        CARD_OFFSETS[i]?.d0.x ?? 0,
        rotation: CARD_OFFSETS[i]?.d0.rotation ?? 0,
      })
    })

    refs.cardWrapperRefs.current.forEach(w => {
      if (!w) return
      w.style.opacity = ''
      w.style.setProperty('--ty', '0')
      w.style.setProperty('--sc', '1')
      w.style.setProperty('--rot', '0')
    })
    refs.dimRefs.current.forEach(d => {
      if (d) d.style.removeProperty('--dim')
    })
    if (refs.counterRef.current) refs.counterRef.current.textContent = '01'
    if (refs.progressFillRef.current) refs.progressFillRef.current.style.width = '0%'
    if (refs.filterBarRef.current) {
      refs.filterBarRef.current.style.opacity      = '1'
      refs.filterBarRef.current.style.pointerEvents = 'auto'
    }

    requestAnimationFrame(() => moveIndicator(filter, false))

    const vh = () => window.innerHeight
    const triggers: ScrollTrigger[] = []
    const cleanups: (() => void)[] = []

    for (let i = 0; i < n; i++) {
      const idx = i

      const card = refs.cardRefs.current[idx]
      if (card) {
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect()
          const x = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2)
          const y = (e.clientY - r.top   - r.height / 2) / (r.height / 2)
          gsap.to(card, { rotateY: x * 7, rotateX: -y * 7, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
        }
        const onLeave = () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1,0.5)', overwrite: 'auto' })
        }
        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseleave', onLeave)
        cleanups.push(
          () => card.removeEventListener('mousemove', onMove),
          () => card.removeEventListener('mouseleave', onLeave),
        )
      }

      const st = ScrollTrigger.create({
        trigger: section,
        start: () => `top+=${idx * vh()} top`,
        end:   () => `top+=${(idx + 1) * vh()} top`,
        scrub: 1.2,
        invalidateOnRefresh: true,

        onUpdate(self) {
          const p = self.progress

          if (idx === 0 && refs.filterBarRef.current) {
            const op = 1 - p
            refs.filterBarRef.current.style.opacity       = String(op)
            refs.filterBarRef.current.style.pointerEvents = op < 0.05 ? 'none' : 'auto'
          }

          const entering = refs.cardRefs.current[idx]
          const eD0 = CARD_OFFSETS[idx]?.d0
          if (entering && eD0) {
            gsap.set(entering, {
              y:        window.innerHeight * 1.15 * (1 - p),
              x:        eD0.x * p,
              rotation: eD0.rotation,
              scale:    1,
            })
          }

          const c1   = refs.cardRefs.current[idx - 1]
          const dim1 = refs.dimRefs.current[idx - 1]
          if (c1 && idx >= 1) {
            const f = CARD_OFFSETS[idx - 1].d0
            const t = CARD_OFFSETS[idx - 1].d1
            gsap.set(c1, {
              x:        f.x        + (t.x        - f.x)        * p,
              y:        f.y        + (t.y        - f.y)        * p,
              rotation: f.rotation + (t.rotation - f.rotation) * p,
              scale:    1          + (t.scale    - 1)           * p,
              filter:   `blur(${(p * 1.4).toFixed(2)}px)`,
            })
            if (dim1) gsap.set(dim1, { opacity: 0.20 * p })
          }

          const c2   = refs.cardRefs.current[idx - 2]
          const dim2 = refs.dimRefs.current[idx - 2]
          if (c2 && idx >= 2) {
            const f = CARD_OFFSETS[idx - 2].d1
            const t = CARD_OFFSETS[idx - 2].d2
            gsap.set(c2, {
              x:        f.x        + (t.x        - f.x)        * p,
              y:        f.y        + (t.y        - f.y)        * p,
              rotation: f.rotation + (t.rotation - f.rotation) * p,
              scale:    f.scale    + (t.scale    - f.scale)    * p,
            })
            if (dim2) gsap.set(dim2, { opacity: 0.20 + 0.30 * p })
          }

          if (p >= 0.5 && refs.counterRef.current) {
            refs.counterRef.current.textContent = String(idx + 1).padStart(2, '0')
          }

          refs.progressDotRefs.current.forEach((dot, j) => {
            if (!dot) return
            const active    = j < idx || (j === idx && p >= 0.5)
            const isCurrent = active && (j === idx || (j === idx - 1 && p < 0.5))
            dot.style.background = active ? 'var(--orange)' : 'rgba(255,255,255,0.18)'
            dot.style.height     = isCurrent ? `${28 + p * 10}px` : active ? '36px' : '20px'
          })

          if (refs.progressFillRef.current) {
            refs.progressFillRef.current.style.width = `${((idx + p) / n) * 100}%`
          }
        },
      })

      triggers.push(st)
    }

    ScrollTrigger.refresh()

    return () => {
      triggers.forEach(st => st.kill())
      cleanups.forEach(fn => fn())
    }
  }, { scope: refs.sectionRef, dependencies: [filter] })

  return { isTransitioning }
}

export { buildCardOffsets, Flip, gsap }

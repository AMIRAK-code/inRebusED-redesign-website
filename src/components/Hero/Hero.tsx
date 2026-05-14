import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Hero.module.css'
import HeroMedia from './HeroMedia'

interface HeroProps {
  scrollTo: (id: string) => void
}

const STATS = [
  { key: 'founded',   num: '2003', labelKey: 'hero.stat.founded.label' },
  { key: 'years',     num: `${new Date().getFullYear() - 2003}+`, labelKey: 'hero.stat.years.label' },
  { key: 'clients',   num: '40+',  labelKey: 'hero.stat.clients.label' },
  { key: 'solutions', num: '100%', labelKey: 'hero.stat.solutions.label' },
]

function parseStatNum(s: string): { value: number; suffix: string } {
  const m = s.match(/^(\d+)(.*)$/)
  return m ? { value: parseInt(m[1]), suffix: m[2] } : { value: 0, suffix: s }
}

// ── Accent sweep flip ─────────────────────────────────────────────────────────

function buildLetterSpans(container: HTMLSpanElement, word: string): HTMLSpanElement[] {
  container.innerHTML = ''
  return [...word].map(char => {
    const s = document.createElement('span')
    s.dataset.al = '1'
    s.textContent = char
    s.style.cssText = 'display:inline-block;transform-style:preserve-3d;will-change:transform;'
    container.appendChild(s)
    return s
  })
}

function createBar(container: HTMLSpanElement): HTMLDivElement {
  const bar = document.createElement('div')
  bar.style.cssText = [
    'position:absolute',
    'bottom:-6px',
    'left:0',
    'width:100%',
    'height:4px',
    'background:var(--orange,#F58220)',
    'border-radius:2px',
    'transform:scaleX(0)',
    'transform-origin:left center',
  ].join(';')
  container.appendChild(bar)
  return bar
}

function sweepFlip(
  letters: HTMLSpanElement[],
  toWord: string,
  bar: HTMLDivElement,
  direction: 'ltr' | 'rtl',
  onDone?: () => void,
) {
  const stagger  = 0.07
  const exitDur  = 0.22
  const enterDur = 0.28
  // bar duration ≈ total letter flip time for visual sync
  const barDur   = 0.1 + stagger * (letters.length - 1) + exitDur + stagger * (letters.length - 1) + enterDur

  const tl = gsap.timeline({ onComplete: onDone })

  // Bar: draws in ltr (LEARNING→CREATIVE) or erases rtl (CREATIVE→LEARNING)
  if (direction === 'ltr') {
    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })
    tl.to(bar, { scaleX: 1, duration: barDur, ease: 'power2.inOut' }, 0)
  } else {
    gsap.set(bar, { scaleX: 1, transformOrigin: 'right center' })
    tl.to(bar, { scaleX: 0, duration: barDur, ease: 'power2.inOut' }, 0)
  }

  // Letters exit: roll top-forward to 90° (edge-on = invisible)
  tl.to(letters, {
    rotateX: 90, stagger, duration: exitDur,
    ease: 'power2.in', transformPerspective: 520,
  }, 0.1)

  // Swap text content at the moment all letters are edge-on
  const swapAt = 0.1 + stagger * (letters.length - 1) + exitDur
  tl.call(() => {
    ;[...toWord].forEach((ch, i) => { if (letters[i]) letters[i].textContent = ch })
  }, [], swapAt)

  // Letters enter: fromTo explicitly sets rotateX -90 for each element at its stagger start,
  // preventing the race condition where tl.to reads stale rotateX: 90 from the exit phase.
  tl.fromTo(
    letters,
    { rotateX: -90, transformPerspective: 520 },
    { rotateX: 0, stagger, duration: enterDur, ease: 'back.out(1.3)', transformPerspective: 520 },
    swapAt,
  )

  return tl
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function Hero({ scrollTo }: HeroProps) {
  const { t } = useT()
  const sectionRef   = useRef<HTMLElement>(null)
  const accentRef    = useRef<HTMLSpanElement>(null)
  const lettersRef   = useRef<HTMLSpanElement[]>([])
  const barRef       = useRef<HTMLDivElement | null>(null)
  const flipToutRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  // 'LEARNING' | 'CREATIVE' — tracks which word is visible so scroll callbacks
  // can guard against double-flipping.
  const wordRef      = useRef<'LEARNING' | 'CREATIVE'>('LEARNING')
  // Set to true once the letter spans are ready so ScrollTrigger callbacks
  // don't fire before the entrance animation has finished.
  const flipReadyRef = useRef(false)

  useGSAP(() => {
    // ── Entrance ─────────────────────────────────────────────────────────
    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'expo' } })

    tl.to(`.${styles.overline}`, { opacity: 1, y: 0, duration: 0.6 })

    // Animate the 3 headline lines directly — no SplitText needed.
    // headlineAccent (LEARNING), headlineLine2 (OUTSIDE), headlineOutline (THE BOX)
    // are each inline-block spans so GSAP can apply y/rotateX per element.
    tl.set(`.${styles.headline}`, { opacity: 1 }, '<')
    tl.from(
      ['.hero-word-0', '.hero-word-1'],
      { opacity: 0, y: 48, rotateX: -40, stagger: 0.15, duration: 0.9, transformPerspective: 800, display: 'inline-block' },
      '<',
    )

    tl.to(`.${styles.sub}`,        { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    tl.to(`.${styles.ctas}`,       { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    tl.to(`.${styles.statsRow}`,   { opacity: 1, duration: 0.8 },        '-=0.2')
    tl.to(`.${styles.scrollHint}`, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
    tl.to(`.${styles.flipWord}`,   { opacity: 1, duration: 1.4 },        '-=0.3')

    tl.add(() => {
      const els = Array.from(
        sectionRef.current!.querySelectorAll<HTMLElement>(`.${styles.statNum}`)
      )
      els.forEach((el, i) => {
        const { value, suffix } = parseStatNum(STATS[i].num)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: value, duration: 1.8, ease: 'power2.out', snap: { val: 1 },
          onUpdate: () => { el.textContent = String(Math.round(obj.val)) + suffix },
        })
      })
    }, '-=0.6')

    // ── Flip setup — runs after entrance finishes ─────────────────────────
    // Decoupled from SplitText: we revert the split first, then build our
    // own letter spans.  Using eventCallback('onComplete') is the most
    // reliable hook because it fires after EVERY tween in the timeline has
    // finished, regardless of where prior tl.add() calls placed their cursor.
    tl.eventCallback('onComplete', () => {
      if (!accentRef.current) return
      // accentRef always contains plain "LEARNING" text — React owns it,
      // no SplitText manipulation needed before building letter spans.
      lettersRef.current = buildLetterSpans(accentRef.current, 'LEARNING')
      barRef.current     = createBar(accentRef.current)
      wordRef.current    = 'LEARNING'
      flipReadyRef.current = true

      // First flip: LEARNING → CREATIVE after 3 s
      flipToutRef.current = setTimeout(() => {
        if (!flipReadyRef.current || !lettersRef.current.length || !barRef.current) return
        sweepFlip(lettersRef.current, 'CREATIVE', barRef.current, 'ltr', () => {
          wordRef.current = 'CREATIVE'
        })
      }, 3000)
    })

    // ── Scroll flip ───────────────────────────────────────────────────────
    // When the user scrolls ~20 % into the hero, CREATIVE flips back to
    // LEARNING.  If they scroll back to the top, it flips to CREATIVE again.
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top+=20% top',
      onEnter: () => {
        if (!flipReadyRef.current || !lettersRef.current.length || !barRef.current) return
        if (flipToutRef.current) { clearTimeout(flipToutRef.current); flipToutRef.current = null }
        if (wordRef.current === 'CREATIVE') {
          sweepFlip(lettersRef.current, 'LEARNING', barRef.current, 'rtl', () => { wordRef.current = 'LEARNING' })
        }
      },
      onLeaveBack: () => {
        if (!flipReadyRef.current || !lettersRef.current.length || !barRef.current) return
        if (wordRef.current === 'LEARNING') {
          sweepFlip(lettersRef.current, 'CREATIVE', barRef.current, 'ltr', () => { wordRef.current = 'CREATIVE' })
        }
      },
    })

    // ── Scroll exit ───────────────────────────────────────────────────────
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.4,
      animation: gsap.timeline()
        .to(`.${styles.heroBgMedia}`, { scale: 0.86, opacity: 0.18, ease: 'none' }, 0)
        .to([`.${styles.orbOrange}`, `.${styles.orbSpicy}`, `.${styles.orbBlue}`], { opacity: 0, ease: 'none' }, 0)
        .to(`.${styles.scrollHint}`, { opacity: 0, ease: 'none' }, 0)
        // typewriter effect smoothly transiting text
        .to('.hero-word-0', { color: 'var(--orange)', duration: 0.15 }, 0.1)
        .to('.hero-word-0', { text: 'Learning', duration: 0.3, ease: 'none' }, 0.1)
        
        .to('.hero-word-1', { color: 'inherit', duration: 0.15 }, 0.1)
        .to('.hero-word-1', { text: 'Outside', duration: 0.3, ease: 'none' }, 0.1)
        
        .to('.hero-word-2', { text: 'The Box', duration: 0.3, ease: 'none' }, 0.4)
        // headline rises and fades (delayed so it happens after text change is read)
        .to(`.${styles.overline}`,   { opacity: 0, y: -48, ease: 'none' }, 0.8)
        .to(`.${styles.headline}`,   { opacity: 0, y: -80, ease: 'none' }, 0.8)
        .to(`.${styles.sub}`,        { opacity: 0, y: -48, ease: 'none' }, 0.85)
        .to(`.${styles.ctas}`,       { opacity: 0, y: -36, ease: 'none' }, 0.9)
        .to(`.${styles.statsRow}`,   { opacity: 0, y: -24, ease: 'none' }, 0.95),
    })

    return () => {
      if (flipToutRef.current) clearTimeout(flipToutRef.current)
      flipReadyRef.current = false
    }
  }, { scope: sectionRef })

  const onMagMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.3
    const y = (e.clientY - r.top - r.height / 2) * 0.3
    gsap.to(e.currentTarget, { x, y, duration: 0.35, ease: 'power2.out' })
  }
  const onMagLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.75)' })
  }

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Hero">
      <div className={styles.sticky}>

        <div className={styles.bg} aria-hidden="true">
          <HeroMedia />
          <div className={styles.orbOrange} />
          <div className={styles.orbSpicy} />
          <div className={styles.orbBlue} />
          <div className={styles.gridLines} />
        </div>

        <div className={styles.inner}>
          <p className={styles.overline}>
            <span className={styles.overlineDot}>●</span>
            {t('hero.overline')}
          </p>

          <h1 className={styles.headline}>
            <span className="hero-word-0" style={{ color: 'inherit', display: 'inline-block' }}>Creative</span>
            <br /><span className="hero-word-1" style={{ color: 'var(--orange)', display: 'inline-block' }}>Learning</span>
            <br /><span className={`hero-word-2 ${styles.headlineOutline}`} style={{ minHeight: '1em', display: 'inline-block' }}></span>
          </h1>

          <p className={styles.sub}>{t('hero.sub')}</p>

          <div className={styles.ctas}>
            <button
              className={styles.btnPrimary}
              onClick={() => scrollTo('services')}
              onMouseMove={onMagMove}
              onMouseLeave={onMagLeave}
            >
              {t('hero.cta.services')}
            </button>
            <Link to="/work" className={styles.btnWork}>
              {t('hero.cta.work')}
            </Link>
            <button
              className={styles.btnSecondary}
              onClick={() => scrollTo('contact')}
            >
              {t('hero.cta.brochure')}
            </button>
          </div>

          <div className={styles.statsRow}>
            {STATS.map(({ key, num, labelKey }) => (
              <div key={key} className={styles.stat}>
                <div className={styles.statNum}>{num}</div>
                <div className={styles.statLabel}>{t(labelKey)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.flipWord} aria-hidden="true">TORINO</div>

        <div className={styles.scrollHint} aria-hidden="true">
          <div className={styles.scrollLine} />
          <span className={styles.scrollText}>{t('hero.scroll')}</span>
        </div>

      </div>
    </section>
  )
}

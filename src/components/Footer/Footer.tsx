import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import styles from './Footer.module.css'
import caseStudies, { type Category } from '../../data/case-studies'

const CATS: Category[] = ['digital-academy', 'onboarding', 'product-training', 'vertical-training']
const FEATURED_WORK = CATS.map(cat => caseStudies.find(cs => cs.category === cat)).filter(Boolean) as typeof caseStudies

interface FooterProps {
  scrollTo?: (id: string) => void
}

const NAV_LINKS = ['inSide', 'inPractice', 'inAction', 'inEvolution']
const SECTION_MAP: Record<string, string> = {
  inSide:      'about',
  inPractice:  'services',
  inAction:    'process',
  inEvolution: 'clients',
}

export default function Footer({ scrollTo = () => {} }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from(`.${styles.ctaOverline}`, {
      opacity: 0, y: 20, duration: 0.7, ease: 'expo',
      scrollTrigger: { trigger: footerRef.current, start: 'top 82%', once: true },
    })
    gsap.from(`.${styles.ctaTitle}`, {
      opacity: 0, y: 32, duration: 0.9, ease: 'expo', delay: 0.08,
      scrollTrigger: { trigger: footerRef.current, start: 'top 82%', once: true },
    })
    gsap.from([`.${styles.ctaDesc}`, `.${styles.ctaActions}`], {
      opacity: 0, y: 20, stagger: 0.1, duration: 0.7, ease: 'expo', delay: 0.16,
      scrollTrigger: { trigger: footerRef.current, start: 'top 82%', once: true },
    })
  }, { scope: footerRef })

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
    <footer ref={footerRef} className={styles.footer}>

      {/* CTA Banner */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaOrb} aria-hidden="true" />
        <div className={styles.ctaInner}>
          <span className={styles.ctaOverline}>inContact — How To Find Us</span>
          <h2 className={styles.ctaTitle}>
            The right training,<br />
            <span className={styles.ctaAccent}>delivered the right way.</span>
          </h2>
          <p className={styles.ctaDesc}>
            Want to meet us or need more information about our digital learning solutions?
            Get in touch — we respond within 24 hours.
          </p>
          <div className={styles.ctaActions}>
            <button
              className={styles.ctaBtn}
              onMouseMove={onMagMove}
              onMouseLeave={onMagLeave}
            >
              Send a Brief
            </button>
            <a href="mailto:info.educational@inrebus.it" className={styles.ctaEmail}>
              info.educational@inrebus.it
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className={styles.bottom}>
        <div className={styles.bottomGrid}>
          {/* Brand */}
          <div>
            <button className={styles.logo} onClick={() => scrollTo('hero')}>
              <span className={styles.logoIn}>in</span>Rebus
              <span className={styles.logoSub}>educational</span>
            </button>
          </div>

          {/* Contact */}
          <address className={styles.address}>
            <p>Corso Vinzaglio 23, 10121 — Torino, Italy</p>
            <p>Tel. <a href="tel:+390110201308">+39 011 0201308</a></p>
          </address>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className={styles.footLinks}>
              {NAV_LINKS.map((label) => (
                <li key={label}>
                  <button
                    className={styles.footLink}
                    onClick={() => scrollTo(SECTION_MAP[label] ?? 'hero')}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Featured Work */}
          <nav aria-label="Featured work">
            <p className={styles.columnTitle}>Featured Work</p>
            <ul className={styles.footLinks}>
              {FEATURED_WORK.map(cs => (
                <li key={cs.slug}>
                  <Link to={`/work/${cs.slug}`} className={styles.footLink}>
                    {cs.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <div className={styles.copyBlock}>
            <p>© 2003–2026 inRebus® Technologies S.r.l.</p>
            <p>P.IVA 08678030019</p>
          </div>
        </div>

        <div className={styles.legal}>
          <button className={styles.legalLink}>Privacy Policy</button>
          <span className={styles.legalDot}>·</span>
          <button className={styles.legalLink}>Cookie Policy</button>
        </div>
      </div>

    </footer>
  )
}

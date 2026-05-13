import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './ContactInfo.module.css'

const OFFICE_LAT = 45.0703
const OFFICE_LNG = 7.6722

export default function ContactInfo() {
  const { t } = useT()
  const sectionRef = useRef<HTMLElement>(null)
  const mapRef     = useRef<HTMLDivElement>(null)
  const mapInited  = useRef(false)

  useGSAP(() => {
    gsap.from(`.${styles.label}`, {
      opacity: 0, y: 20, duration: 0.7, ease: 'expo',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })
    gsap.from(`.${styles.title}`, {
      opacity: 0, y: 32, duration: 0.9, ease: 'expo', delay: 0.08,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })
    gsap.from(`.${styles.left}`, {
      opacity: 0, x: -40, duration: 0.9, ease: 'expo', delay: 0.12,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })
    gsap.from(`.${styles.mapWrap}`, {
      opacity: 0, x: 40, duration: 0.9, ease: 'expo', delay: 0.18,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })
  }, { scope: sectionRef })

  // Lazy-load Leaflet only when the map container scrolls into view
  useEffect(() => {
    if (mapInited.current) return

    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting || mapInited.current) return
        mapInited.current = true
        observer.disconnect()

        const [L] = await Promise.all([
          import('leaflet'),
          // @ts-ignore — leaflet CSS has no types
          import('leaflet/dist/leaflet.css'),
        ])

        if (!mapRef.current) return

        const map = L.default.map(mapRef.current, {
          center: [OFFICE_LAT, OFFICE_LNG],
          zoom: 16,
          zoomControl: true,
          scrollWheelZoom: false,
          attributionControl: true,
        })

        L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map)

        // Custom orange SVG pin
        const pinIcon = L.default.divIcon({
          className: '',
          html: `<svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 26 16 26S32 27 32 16C32 7.163 24.837 0 16 0Z" fill="#F58220"/>
            <circle cx="16" cy="16" r="6" fill="#fff"/>
          </svg>`,
          iconSize:   [32, 42],
          iconAnchor: [16, 42],
          popupAnchor: [0, -44],
        })

        L.default.marker([OFFICE_LAT, OFFICE_LNG], { icon: pinIcon })
          .addTo(map)
          .bindPopup('<strong>inRebus Educational</strong><br>Corso Vinzaglio 23, Torino')
      },
      { threshold: 0.1 },
    )

    if (mapRef.current) observer.observe(mapRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="contact-info" className={styles.section} aria-label={t('contact.label')}>
      <div className={styles.container}>

        <div className={styles.sectionHead}>
          <span className={styles.label}>{t('contact.label')}</span>
          <h2 className={styles.title}>
            {t('contact.title')}<br />
            <span className={styles.titleAccent}>{t('contact.title.accent')}</span>
          </h2>
        </div>

        <div className={styles.twoCol}>
          {/* Left — address block */}
          <address className={styles.left}>
            <p className={styles.addressHeading}>{t('contact.address.heading')}</p>

            <div className={styles.addressRow}>
              <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C8.134 2 5 5.134 5 9c0 6.627 7 13 7 13s7-6.373 7-13c0-3.866-3.134-7-7-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              <div>
                <p>{t('contact.address.street')}</p>
                <p>{t('contact.address.city')}</p>
              </div>
            </div>

            <div className={styles.addressRow}>
              <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C9.39 21 3 14.61 3 7a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              </svg>
              <a href={`tel:${t('contact.phone').replace(/\s/g, '')}`} className={styles.contactLink}>
                {t('contact.phone')}
              </a>
            </div>

            <div className={styles.addressRow}>
              <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
              <a href={`mailto:${t('contact.email')}`} className={styles.contactLink}>
                {t('contact.email')}
              </a>
            </div>

            <a
              href={`https://maps.google.com/?q=${OFFICE_LAT},${OFFICE_LNG}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsLink}
            >
              {t('contact.directions')}
            </a>
          </address>

          {/* Right — Leaflet map */}
          <div className={styles.mapWrap}>
            <div
              ref={mapRef}
              className={styles.map}
              role="application"
              aria-label={t('contact.map.title')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

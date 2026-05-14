import { useEffect, useRef } from 'react'
import { useT } from '../../i18n/LangContext'
import styles from './Footer.module.css'

const OFFICE_LAT = 45.0703
const OFFICE_LNG = 7.6722

export default function OfficeMap() {
  const { t } = useT()
  const mapRef    = useRef<HTMLDivElement>(null)
  const mapInited = useRef(false)

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

        const pinIcon = L.default.divIcon({
          className: '',
          html: `<svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 26 16 26S32 27 32 16C32 7.163 24.837 0 16 0Z" fill="#F58220"/>
            <circle cx="16" cy="16" r="6" fill="#fff"/>
          </svg>`,
          iconSize:    [32, 42],
          iconAnchor:  [16, 42],
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
    <div
      ref={mapRef}
      className={styles.officeMap}
      role="application"
      aria-label={t('contact.map.title')}
    />
  )
}

export { OFFICE_LAT, OFFICE_LNG }

import { useLocation } from 'react-router-dom'
import { useT } from '../i18n/LangContext'
import Seo from '../components/ui/Seo/Seo'
import styles from './SustainabilityPage.module.css'

// Update these values after running https://www.websitecarbon.com/website/www.inrebus.education/
const CARBON_GRAMS = '0.10'
const CARBON_GRADE = 'A'
const CARBON_PERCENTILE = '89'
const CARBON_RESULT_URL = 'https://www.websitecarbon.com/website/www.inrebus.education/'

const PRACTICES = [
  'images',
  'fonts',
  'motion',
  'codesplit',
  'noautoplay',
] as const

export default function SustainabilityPage() {
  const { t } = useT()
  const location = useLocation()

  return (
    <div className={styles.page}>
      <Seo
        title={t('meta.sustainability.title')}
        description={t('meta.sustainability.description')}
        path={location.pathname}
      />

      {/* Hero / score */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>{t('sustainability.hero.label')}</span>
          <h1 className={styles.heroTitle}>{t('sustainability.title')}</h1>
          <p className={styles.heroSub}>{t('sustainability.subtitle')}</p>

          <a
            href={CARBON_RESULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.scoreCard}
            aria-label={`${t('sustainability.score.label')}: ${CARBON_GRAMS}g CO₂ — ${t('sustainability.score.grade')} ${CARBON_GRADE}`}
          >
            <div className={styles.scoreGrade}>{CARBON_GRADE}</div>
            <div className={styles.scoreDetails}>
              <div className={styles.scoreNumber}>
                <span className={styles.scoreValue}>{CARBON_GRAMS}g</span>
                <span className={styles.scoreUnit}>CO₂</span>
              </div>
              <p className={styles.scoreCaption}>
                {t('sustainability.score.label')}
              </p>
              <p className={styles.scorePercentile}>
                {t('sustainability.score.cleaner')} {CARBON_PERCENTILE}%{' '}
                {t('sustainability.score.tested')}
              </p>
            </div>
          </a>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyInner}>

          {/* What we do */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('sustainability.practices.title')}</h2>
            <p className={styles.sectionIntro}>{t('sustainability.practices.intro')}</p>
            <ul className={styles.practiceList}>
              {PRACTICES.map(p => (
                <li key={p} className={styles.practiceItem}>
                  <svg className={styles.practiceIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t(`sustainability.practices.${p}`)}
                </li>
              ))}
            </ul>
          </section>

          {/* Our commitment */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('sustainability.commitment.title')}</h2>
            <p className={styles.sectionBody}>{t('sustainability.commitment.body')}</p>
          </section>

          {/* Hosting */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('sustainability.hosting.title')}</h2>
            <p className={styles.sectionBody}>{t('sustainability.hosting.body')}</p>
            <a
              href="https://www.thegreenwebfoundation.org"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.extLink}
            >
              Green Web Foundation →
            </a>
          </section>

        </div>
      </div>
    </div>
  )
}

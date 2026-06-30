import { useLocation } from 'react-router-dom'
import { useT } from '../i18n/LangContext'
import Seo from '../components/ui/Seo/Seo'
import styles from './LegalPage.module.css'

const SECTIONS = [
  'controller',
  'data',
  'legal',
  'retention',
  'thirdparties',
  'rights',
  'contact',
] as const

export default function PrivacyPage() {
  const { t } = useT()
  const location = useLocation()

  return (
    <div className={styles.page}>
      <Seo
        title={t('meta.privacy.title')}
        description={t('meta.privacy.description')}
        path={location.pathname}
      />

      <div className={styles.inner}>
        <header className={styles.hero}>
          <span className={styles.heroLabel}>{t('privacy.hero.label')}</span>
          <h1 className={styles.heroTitle}>{t('privacy.title')}</h1>
          <p className={styles.updated}>{t('privacy.updated')}</p>
        </header>

        <div className={styles.content}>
          {SECTIONS.map(section => (
            <section key={section} className={styles.section}>
              <h2 className={styles.sectionTitle}>{t(`privacy.${section}.title`)}</h2>
              <div className={styles.sectionBody}>
                {t(`privacy.${section}.body`).split('\n').map((line, i) =>
                  line === '' ? null : (
                    <p key={i}>{line}</p>
                  )
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

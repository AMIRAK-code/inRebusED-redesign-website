import { useLocation } from 'react-router-dom'
import { useT } from '../i18n/LangContext'
import Seo from '../components/ui/Seo/Seo'
import styles from './LegalPage.module.css'

const STORAGE_ITEMS = ['item1', 'item2', 'item3'] as const

export default function CookiesPage() {
  const { t } = useT()
  const location = useLocation()

  return (
    <div className={styles.page}>
      <Seo
        title={t('meta.cookies.title')}
        description={t('meta.cookies.description')}
        path={location.pathname}
      />

      <div className={styles.inner}>
        <header className={styles.hero}>
          <span className={styles.heroLabel}>{t('cookies.hero.label')}</span>
          <h1 className={styles.heroTitle}>{t('cookies.title')}</h1>
          <p className={styles.updated}>{t('cookies.updated')}</p>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <p className={styles.intro}>{t('cookies.intro')}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('cookies.table.heading')}</h2>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{t('cookies.table.name')}</th>
                    <th>{t('cookies.table.purpose')}</th>
                    <th>{t('cookies.table.type')}</th>
                    <th>{t('cookies.table.retention')}</th>
                  </tr>
                </thead>
                <tbody>
                  {STORAGE_ITEMS.map(item => (
                    <tr key={item}>
                      <td><code>{t(`cookies.${item}.name`)}</code></td>
                      <td>{t(`cookies.${item}.purpose`)}</td>
                      <td>{t(`cookies.${item}.type`)}</td>
                      <td>{t(`cookies.${item}.retention`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{t('cookies.future.heading')}</h2>
            <div className={styles.sectionBody}>
              <p>{t('cookies.future.body')}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

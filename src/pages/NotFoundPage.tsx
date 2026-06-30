import { Link, useLocation } from 'react-router-dom'
import { useT } from '../i18n/LangContext'
import Seo from '../components/ui/Seo/Seo'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  const { t } = useT()
  const location = useLocation()

  return (
    <div className={styles.page}>
      <Seo
        title={t('meta.notFound.title')}
        description={t('meta.notFound.description')}
        path={location.pathname}
        noIndex={true}
      />
      <p className={styles.code}>{t('notFound.title')}</p>
      <p className={styles.body}>{t('notFound.body')}</p>
      <Link to="/" className={styles.cta}>{t('notFound.cta')}</Link>
    </div>
  )
}

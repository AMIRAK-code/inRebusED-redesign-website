import { useT } from '../../i18n/LangContext'
import styles from './PartnersLockup.module.css'

export function PartnersLockup() {
  const { t } = useT()

  return (
    <div className={styles.partners}>
      <span className={styles.partnersLabel}>{t('footer.partners.label')}</span>
      <div className={styles.partnerLogos}>
        <img src="/partners/gruppo-fos.png" alt="Gruppo FOS" className={styles.fosLogo} />
      </div>
    </div>
  )
}




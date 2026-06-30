import { useT } from '../../../i18n/LangContext'
import styles from '../Brief.module.css'

interface Props {
  projectType: string
  audience: number
  timeline: string
  name: string
  company: string
  email: string
  message: string
  typeOptions: { label: string; value: string }[]
  timeOptions: { label: string; value: string }[]
  hasError: boolean
}

function formatAudience(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
  return String(n)
}

export function Step5Review({
  projectType, audience, timeline,
  name, company, email, message,
  typeOptions, timeOptions, hasError,
}: Props) {
  const { t } = useT()
  const typeLabel = typeOptions.find(o => o.value === projectType)?.label ?? projectType
  const timeLabel = timeOptions.find(o => o.value === timeline)?.label ?? timeline

  return (
    <div>
      <p className={styles.stepQuestion}>{t('brief.s5.label')}</p>
      <dl className={styles.reviewList}>
        <div className={styles.reviewRow}>
          <dt>{t('brief.s5.type')}</dt>
          <dd>{typeLabel}</dd>
        </div>
        <div className={styles.reviewRow}>
          <dt>{t('brief.s5.audience')}</dt>
          <dd>{formatAudience(audience)} {t('brief.s2.hint')}</dd>
        </div>
        <div className={styles.reviewRow}>
          <dt>{t('brief.s5.timeline')}</dt>
          <dd>{timeLabel}</dd>
        </div>
        <div className={styles.reviewRow}>
          <dt>{t('brief.s5.contact')}</dt>
          <dd>
            {name}{company ? ` · ${company}` : ''}<br />
            {email}
          </dd>
        </div>
        {message && (
          <div className={`${styles.reviewRow} ${styles.reviewRowFull}`}>
            <dt>Message</dt>
            <dd>{message}</dd>
          </div>
        )}
      </dl>
      {hasError && (
        <p className={styles.submitError}>{t('brief.error')}</p>
      )}
    </div>
  )
}

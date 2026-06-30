import { useT } from '../../../i18n/LangContext'
import styles from '../Brief.module.css'

interface Props {
  name: string
  company: string
  email: string
  message: string
  errors: { name?: string; email?: string }
  onNameChange: (v: string) => void
  onCompanyChange: (v: string) => void
  onEmailChange: (v: string) => void
  onMessageChange: (v: string) => void
  clearError: (field: string) => void
}

export function Step4Contact({
  name, company, email, message, errors,
  onNameChange, onCompanyChange, onEmailChange, onMessageChange, clearError,
}: Props) {
  const { t } = useT()

  return (
    <div className={styles.fields}>
      <p className={styles.stepQuestion}>{t('brief.s4.label')}</p>

      <div className={styles.fieldRow}>
        <label className={styles.fieldLabel} htmlFor="brief-name">{t('brief.s4.name')}</label>
        <input
          id="brief-name"
          type="text"
          className={`${styles.field} ${errors.name ? styles.fieldError : ''}`}
          value={name}
          autoComplete="name"
          onChange={e => { onNameChange(e.target.value); clearError('name') }}
        />
        {errors.name && <p className={styles.errorHint}>{errors.name}</p>}
      </div>

      <div className={styles.fieldRow}>
        <label className={styles.fieldLabel} htmlFor="brief-company">{t('brief.s4.company')}</label>
        <input
          id="brief-company"
          type="text"
          className={styles.field}
          value={company}
          autoComplete="organization"
          onChange={e => onCompanyChange(e.target.value)}
        />
      </div>

      <div className={styles.fieldRow}>
        <label className={styles.fieldLabel} htmlFor="brief-email">{t('brief.s4.email')}</label>
        <input
          id="brief-email"
          type="email"
          className={`${styles.field} ${errors.email ? styles.fieldError : ''}`}
          value={email}
          autoComplete="email"
          onChange={e => { onEmailChange(e.target.value); clearError('email') }}
        />
        {errors.email && <p className={styles.errorHint}>{errors.email}</p>}
      </div>

      <div className={styles.fieldRow}>
        <label className={styles.fieldLabel} htmlFor="brief-msg">{t('brief.s4.message')}</label>
        <textarea
          id="brief-msg"
          className={`${styles.field} ${styles.textarea}`}
          value={message}
          rows={4}
          onChange={e => onMessageChange(e.target.value)}
        />
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useT } from '../../i18n/LangContext'
import styles from './NewsletterForm.module.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function NewsletterForm() {
  const { t } = useT()
  const [newsletter, setNewsletter]     = useState('')
  const [nlStatus, setNlStatus]         = useState<'idle' | 'ok' | 'err'>('idle')
  const [nlSubmitting, setNlSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(newsletter) || nlSubmitting) return
    setNlSubmitting(true)

    const endpoint = import.meta.env.VITE_FORMSPREE_NEWSLETTER_ENDPOINT as string | undefined
    if (!endpoint) {
      console.info('[Newsletter] No VITE_FORMSPREE_NEWSLETTER_ENDPOINT set.')
      setNlStatus('ok')
      setNlSubmitting(false)
      return
    }

    try {
      const res = await fetch(endpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: newsletter }),
      })
      setNlStatus(res.ok ? 'ok' : 'err')
    } catch {
      setNlStatus('err')
    } finally {
      setNlSubmitting(false)
    }
  }

  if (nlStatus === 'ok') {
    return <p className={styles.nlSuccess}>{t('footer.newsletter.success')}</p>
  }

  return (
    <>
      <form className={styles.nlForm} onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          className={styles.nlInput}
          placeholder={t('footer.newsletter.placeholder')}
          value={newsletter}
          onChange={e => setNewsletter(e.target.value)}
          aria-label={t('footer.newsletter.placeholder')}
          required
        />
        <button
          type="submit"
          className={styles.nlBtn}
          disabled={nlSubmitting}
          aria-label={t('footer.newsletter.btn')}
        >
          {nlSubmitting ? '…' : t('footer.newsletter.btn')}
        </button>
      </form>
      {nlStatus === 'err' && (
        <p className={styles.nlError}>{t('footer.newsletter.error')}</p>
      )}
    </>
  )
}

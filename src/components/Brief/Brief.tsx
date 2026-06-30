import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Brief.module.css'
import { Step1ProjectType } from './steps/Step1ProjectType'
import { Step2Audience }    from './steps/Step2Audience'
import { Step3Timeline }    from './steps/Step3Timeline'
import { Step4Contact }     from './steps/Step4Contact'
import { Step5Review }      from './steps/Step5Review'

interface BriefData { projectType: string; audience: number; timeline: string; name: string; company: string; email: string; message: string }
type Status = 'idle' | 'submitting' | 'success' | 'error'
const TOTAL_STEPS = 5
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Brief() {
  const { t } = useT()
  const [step, setStep]     = useState(1)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})

  const [data, setData] = useState<BriefData>({
    projectType: '',
    audience: 500,
    timeline: '',
    name: '',
    company: '',
    email: '',
    message: '',
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const stepRef      = useRef<HTMLDivElement>(null)

  const TYPE_OPTIONS = [
    { label: t('brief.s1.academy'),    value: 'digital-academy'   },
    { label: t('brief.s1.onboarding'), value: 'onboarding'        },
    { label: t('brief.s1.product'),    value: 'product-training'  },
    { label: t('brief.s1.vertical'),   value: 'vertical-training' },
    { label: t('brief.s1.other'),      value: 'other'             },
  ]
  const TIMELINE_OPTIONS = [
    { label: t('brief.s3.lt1mo'), value: '<1mo'  },
    { label: t('brief.s3.1to3'),  value: '1-3mo' },
    { label: t('brief.s3.3to6'),  value: '3-6mo' },
    { label: t('brief.s3.6plus'), value: '6mo+'  },
  ]

  function animateToStep(nextStep: number) {
    const el = stepRef.current
    if (!el) { setStep(nextStep); return }

    const dir = nextStep > step ? 1 : -1
    gsap.timeline()
      .to(el, { opacity: 0, x: -60 * dir, duration: 0.25, ease: 'power2.in' })
      .call(() => setStep(nextStep))
      .set(el, { x: 60 * dir, opacity: 0 })
      .to(el, { opacity: 1, x: 0, duration: 0.4, ease: 'expo.out' })
  }

  useGSAP(() => {
    gsap.from(containerRef.current, {
      opacity: 0, y: 40, duration: 0.9, ease: 'expo', delay: 0.1,
    })
  }, { scope: containerRef })

  function validate(): boolean {
    const errs: Partial<Record<string, string>> = {}
    if (step === 1 && !data.projectType) errs.projectType = ' '
    if (step === 3 && !data.timeline)    errs.timeline    = ' '
    if (step === 4) {
      if (!data.name.trim())         errs.name  = t('brief.s4.name.error')
      if (!EMAIL_RE.test(data.email)) errs.email = t('brief.s4.email.error')
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function next() { if (!validate()) return; animateToStep(step + 1) }
  function back() { animateToStep(step - 1) }

  async function submit() {
    if (!validate()) return
    setStatus('submitting')

    const endpoint = import.meta.env.VITE_FORMSPREE_BRIEF_ENDPOINT as string | undefined
    if (!endpoint) {
      console.info('[Brief] No VITE_FORMSPREE_BRIEF_ENDPOINT set; form not submitted.')
      setStatus('success')
      return
    }

    try {
      const res = await fetch(endpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          project_type: data.projectType,
          audience:     data.audience,
          timeline:     data.timeline,
          name:         data.name,
          company:      data.company,
          email:        data.email,
          message:      data.message,
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  function renderStep() {
    switch (step) {
      case 1:
        return (
          <Step1ProjectType
            value={data.projectType}
            error={errors.projectType}
            onChange={v => { setData(d => ({ ...d, projectType: v })); setErrors({}) }}
          />
        )
      case 2:
        return (
          <Step2Audience
            value={data.audience}
            onChange={v => setData(d => ({ ...d, audience: v }))}
          />
        )
      case 3:
        return (
          <Step3Timeline
            value={data.timeline}
            error={errors.timeline}
            onChange={v => { setData(d => ({ ...d, timeline: v })); setErrors({}) }}
          />
        )
      case 4:
        return (
          <Step4Contact
            name={data.name}
            company={data.company}
            email={data.email}
            message={data.message}
            errors={errors}
            onNameChange={v => setData(d => ({ ...d, name: v }))}
            onCompanyChange={v => setData(d => ({ ...d, company: v }))}
            onEmailChange={v => setData(d => ({ ...d, email: v }))}
            onMessageChange={v => setData(d => ({ ...d, message: v }))}
            clearError={field => setErrors(err => ({ ...err, [field]: undefined }))}
          />
        )
      case 5:
        return (
          <Step5Review
            projectType={data.projectType}
            audience={data.audience}
            timeline={data.timeline}
            name={data.name}
            company={data.company}
            email={data.email}
            message={data.message}
            typeOptions={TYPE_OPTIONS}
            timeOptions={TIMELINE_OPTIONS}
            hasError={status === 'error'}
          />
        )
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.successWrap} ref={containerRef}>
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <h2 className={styles.successTitle}>{t('brief.success.title')}</h2>
        <p className={styles.successBody}>{t('brief.success.body')}</p>
        <Link to="/" className={styles.successBack}>{t('brief.success.back')}</Link>
      </div>
    )
  }

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <div className={styles.card}>
        <div className={styles.progressTrack} aria-hidden="true">
          <div
            className={styles.progressFill}
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        <div className={styles.header}>
          <h1 className={styles.formTitle}>{t('brief.title')}</h1>
          <p className={styles.formSub}>{t('brief.subtitle')}</p>
          <p className={styles.stepCount} aria-live="polite">
            {t('brief.step')} {step} {t('brief.of')} {TOTAL_STEPS}
          </p>
        </div>

        <div ref={stepRef} className={styles.stepContent}>
          {renderStep()}
        </div>

        <div className={styles.nav}>
          {step > 1 && (
            <button
              type="button"
              className={styles.btnBack}
              onClick={back}
              disabled={status === 'submitting'}
            >
              {t('brief.back')}
            </button>
          )}

          <div className={styles.dots} aria-hidden="true">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${i < step ? styles.dotActive : ''} ${i + 1 === step ? styles.dotCurrent : ''}`}
              />
            ))}
          </div>

          {step < TOTAL_STEPS ? (
            <button type="button" className={styles.btnNext} onClick={next}>
              {t('brief.next')}
            </button>
          ) : (
            <button
              type="button"
              className={styles.btnNext}
              onClick={submit}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? t('brief.submitting') : t('brief.submit')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

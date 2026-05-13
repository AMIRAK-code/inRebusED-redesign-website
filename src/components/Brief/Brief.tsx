import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { useT } from '../../i18n/LangContext'
import styles from './Brief.module.css'

// ── Types ────────────────────────────────────────────────────────────────────

interface BriefData {
  projectType: string
  audience: number
  timeline: string
  name: string
  company: string
  email: string
  message: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const TOTAL_STEPS = 5
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatAudience(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
  return String(n)
}

function logSlider(position: number): number {
  const minPos = 0, maxPos = 100
  const minVal = Math.log(1), maxVal = Math.log(50000)
  const scale = (maxVal - minVal) / (maxPos - minPos)
  return Math.round(Math.exp(minVal + scale * (position - minPos)))
}

function reverseLogSlider(value: number): number {
  const minPos = 0, maxPos = 100
  const minVal = Math.log(1), maxVal = Math.log(50000)
  const scale = (maxVal - minVal) / (maxPos - minPos)
  return ((Math.log(value) - minVal) / scale) + minPos
}

// ── Sub-components ────────────────────────────────────────────────────────────

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className={styles.radioGroup} role="radiogroup">
      {options.map(opt => (
        <label
          key={opt.value}
          className={`${styles.radioLabel} ${value === opt.value ? styles.radioLabelActive : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className={styles.radioInput}
          />
          <span className={styles.radioDot} aria-hidden="true" />
          {opt.label}
        </label>
      ))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

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
    { label: t('brief.s1.academy'),  value: 'digital-academy'   },
    { label: t('brief.s1.onboarding'), value: 'onboarding'      },
    { label: t('brief.s1.product'),  value: 'product-training'  },
    { label: t('brief.s1.vertical'), value: 'vertical-training' },
    { label: t('brief.s1.other'),    value: 'other'             },
  ]

  const TIMELINE_OPTIONS = [
    { label: t('brief.s3.lt1mo'), value: '<1mo'  },
    { label: t('brief.s3.1to3'),  value: '1-3mo' },
    { label: t('brief.s3.3to6'),  value: '3-6mo' },
    { label: t('brief.s3.6plus'), value: '6mo+'  },
  ]

  // Animate step transition
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

  // Entry animation
  useGSAP(() => {
    gsap.from(containerRef.current, {
      opacity: 0, y: 40, duration: 0.9, ease: 'expo', delay: 0.1,
    })
  }, { scope: containerRef })

  // Validate current step before advancing
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

  function next() {
    if (!validate()) return
    animateToStep(step + 1)
  }

  function back() {
    animateToStep(step - 1)
  }

  async function submit() {
    if (!validate()) return
    setStatus('submitting')

    const endpoint = import.meta.env.VITE_FORMSPREE_BRIEF_ENDPOINT as string | undefined
    if (!endpoint) {
      // No endpoint configured — treat as success in dev
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

  const sliderPos = reverseLogSlider(data.audience)

  // ── Render steps ─────────────────────────────────────────────────────────

  function renderStep() {
    switch (step) {
      case 1:
        return (
          <div>
            <p className={styles.stepQuestion}>{t('brief.s1.label')}</p>
            <RadioGroup
              name="projectType"
              options={TYPE_OPTIONS}
              value={data.projectType}
              onChange={v => { setData(d => ({ ...d, projectType: v })); setErrors({}) }}
            />
            {errors.projectType && <p className={styles.errorHint}>{errors.projectType}</p>}
          </div>
        )

      case 2:
        return (
          <div>
            <p className={styles.stepQuestion}>{t('brief.s2.label')}</p>
            <div className={styles.sliderWrap}>
              <div className={styles.sliderValue}>
                {formatAudience(data.audience)}
                <span className={styles.sliderUnit}> {t('brief.s2.hint')}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={0.5}
                value={sliderPos}
                className={styles.slider}
                aria-label={t('brief.s2.label')}
                aria-valuemin={1}
                aria-valuemax={50000}
                aria-valuenow={data.audience}
                onChange={e => {
                  const v = logSlider(parseFloat(e.target.value))
                  setData(d => ({ ...d, audience: v }))
                }}
              />
              <div className={styles.sliderTicks}>
                <span>1</span><span>100</span><span>1k</span><span>10k</span><span>50k</span>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <p className={styles.stepQuestion}>{t('brief.s3.label')}</p>
            <RadioGroup
              name="timeline"
              options={TIMELINE_OPTIONS}
              value={data.timeline}
              onChange={v => { setData(d => ({ ...d, timeline: v })); setErrors({}) }}
            />
            {errors.timeline && <p className={styles.errorHint}>{errors.timeline}</p>}
          </div>
        )

      case 4:
        return (
          <div className={styles.fields}>
            <p className={styles.stepQuestion}>{t('brief.s4.label')}</p>

            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel} htmlFor="brief-name">{t('brief.s4.name')}</label>
              <input
                id="brief-name"
                type="text"
                className={`${styles.field} ${errors.name ? styles.fieldError : ''}`}
                value={data.name}
                autoComplete="name"
                onChange={e => { setData(d => ({ ...d, name: e.target.value })); setErrors(err => ({ ...err, name: undefined })) }}
              />
              {errors.name && <p className={styles.errorHint}>{errors.name}</p>}
            </div>

            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel} htmlFor="brief-company">{t('brief.s4.company')}</label>
              <input
                id="brief-company"
                type="text"
                className={styles.field}
                value={data.company}
                autoComplete="organization"
                onChange={e => setData(d => ({ ...d, company: e.target.value }))}
              />
            </div>

            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel} htmlFor="brief-email">{t('brief.s4.email')}</label>
              <input
                id="brief-email"
                type="email"
                className={`${styles.field} ${errors.email ? styles.fieldError : ''}`}
                value={data.email}
                autoComplete="email"
                onChange={e => { setData(d => ({ ...d, email: e.target.value })); setErrors(err => ({ ...err, email: undefined })) }}
              />
              {errors.email && <p className={styles.errorHint}>{errors.email}</p>}
            </div>

            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel} htmlFor="brief-msg">{t('brief.s4.message')}</label>
              <textarea
                id="brief-msg"
                className={`${styles.field} ${styles.textarea}`}
                value={data.message}
                rows={4}
                onChange={e => setData(d => ({ ...d, message: e.target.value }))}
              />
            </div>
          </div>
        )

      case 5: {
        const typeLabel = TYPE_OPTIONS.find(o => o.value === data.projectType)?.label ?? data.projectType
        const timeLabel = TIMELINE_OPTIONS.find(o => o.value === data.timeline)?.label ?? data.timeline
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
                <dd>{formatAudience(data.audience)} {t('brief.s2.hint')}</dd>
              </div>
              <div className={styles.reviewRow}>
                <dt>{t('brief.s5.timeline')}</dt>
                <dd>{timeLabel}</dd>
              </div>
              <div className={styles.reviewRow}>
                <dt>{t('brief.s5.contact')}</dt>
                <dd>
                  {data.name}{data.company ? ` · ${data.company}` : ''}<br />
                  {data.email}
                </dd>
              </div>
              {data.message && (
                <div className={`${styles.reviewRow} ${styles.reviewRowFull}`}>
                  <dt>Message</dt>
                  <dd>{data.message}</dd>
                </div>
              )}
            </dl>
            {status === 'error' && (
              <p className={styles.submitError}>{t('brief.error')}</p>
            )}
          </div>
        )
      }
    }
  }

  // ── Success screen ────────────────────────────────────────────────────────

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

  // ── Main form ─────────────────────────────────────────────────────────────

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <div className={styles.card}>
        {/* Progress bar */}
        <div className={styles.progressTrack} aria-hidden="true">
          <div
            className={styles.progressFill}
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.formTitle}>{t('brief.title')}</h1>
          <p className={styles.formSub}>{t('brief.subtitle')}</p>
          <p className={styles.stepCount} aria-live="polite">
            {t('brief.step')} {step} {t('brief.of')} {TOTAL_STEPS}
          </p>
        </div>

        {/* Step content */}
        <div ref={stepRef} className={styles.stepContent}>
          {renderStep()}
        </div>

        {/* Navigation */}
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
            <button
              type="button"
              className={styles.btnNext}
              onClick={next}
            >
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

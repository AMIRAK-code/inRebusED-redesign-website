import { useT } from '../../../i18n/LangContext'
import styles from '../Brief.module.css'

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

interface Props {
  value: number
  onChange: (v: number) => void
}

export function Step2Audience({ value, onChange }: Props) {
  const { t } = useT()
  const sliderPos = reverseLogSlider(value)

  return (
    <div>
      <p className={styles.stepQuestion}>{t('brief.s2.label')}</p>
      <div className={styles.sliderWrap}>
        <div className={styles.sliderValue}>
          {formatAudience(value)}
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
          aria-valuenow={value}
          onChange={e => onChange(logSlider(parseFloat(e.target.value)))}
        />
        <div className={styles.sliderTicks}>
          <span>1</span><span>100</span><span>1k</span><span>10k</span><span>50k</span>
        </div>
      </div>
    </div>
  )
}

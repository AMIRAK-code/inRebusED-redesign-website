import { useT } from '../../../i18n/LangContext'
import { RadioGroup } from '../../ui/RadioGroup/RadioGroup'
import styles from '../Brief.module.css'

interface Props {
  value: string
  error?: string
  onChange: (v: string) => void
}

export function Step3Timeline({ value, error, onChange }: Props) {
  const { t } = useT()

  const options = [
    { label: t('brief.s3.lt1mo'), value: '<1mo'  },
    { label: t('brief.s3.1to3'),  value: '1-3mo' },
    { label: t('brief.s3.3to6'),  value: '3-6mo' },
    { label: t('brief.s3.6plus'), value: '6mo+'  },
  ]

  return (
    <div>
      <p className={styles.stepQuestion}>{t('brief.s3.label')}</p>
      <RadioGroup name="timeline" options={options} value={value} onChange={onChange} />
      {error && <p className={styles.errorHint}>{error}</p>}
    </div>
  )
}

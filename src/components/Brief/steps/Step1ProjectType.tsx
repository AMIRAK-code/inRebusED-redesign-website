import { useT } from '../../../i18n/LangContext'
import { RadioGroup } from '../../ui/RadioGroup/RadioGroup'
import styles from '../Brief.module.css'

interface Props {
  value: string
  error?: string
  onChange: (v: string) => void
}

export function Step1ProjectType({ value, error, onChange }: Props) {
  const { t } = useT()

  const options = [
    { label: t('brief.s1.academy'),    value: 'digital-academy'   },
    { label: t('brief.s1.onboarding'), value: 'onboarding'        },
    { label: t('brief.s1.product'),    value: 'product-training'  },
    { label: t('brief.s1.vertical'),   value: 'vertical-training' },
    { label: t('brief.s1.other'),      value: 'other'             },
  ]

  return (
    <div>
      <p className={styles.stepQuestion}>{t('brief.s1.label')}</p>
      <RadioGroup name="projectType" options={options} value={value} onChange={onChange} />
      {error && <p className={styles.errorHint}>{error}</p>}
    </div>
  )
}

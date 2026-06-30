import styles from './RadioGroup.module.css'

interface RadioGroupProps {
  name: string
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
}

export function RadioGroup({ name, options, value, onChange }: RadioGroupProps) {
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

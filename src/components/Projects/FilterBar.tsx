import { useT } from '../../i18n/LangContext'
import styles from './FilterBar.module.css'
import type { Category } from '../../data/case-studies'

type FilterValue = Category | 'all'

interface FilterBarProps {
  filter: FilterValue
  pills: { labelKey: string; value: FilterValue }[]
  onFilterChange: (v: FilterValue) => void
  filterBarRef: React.MutableRefObject<HTMLDivElement | null>
  indicatorRef: React.MutableRefObject<HTMLDivElement | null>
  pillRefs: React.MutableRefObject<Map<string, HTMLButtonElement>>
}

export function FilterBar({
  filter, pills, onFilterChange,
  filterBarRef, indicatorRef, pillRefs,
}: FilterBarProps) {
  const { t } = useT()

  return (
    <div
      ref={filterBarRef}
      className={styles.filterBar}
      role="group"
      aria-label="Filter by category"
    >
      {pills.map(pill => (
        <button
          key={pill.value}
          ref={el => { if (el) pillRefs.current.set(pill.value, el) }}
          className={`${styles.filterPill}${filter === pill.value ? ` ${styles.filterPillActive}` : ''}`}
          onClick={() => onFilterChange(pill.value)}
          aria-pressed={filter === pill.value}
        >
          {t(pill.labelKey)}
        </button>
      ))}
      <div ref={indicatorRef} className={styles.filterIndicator} aria-hidden="true" />
    </div>
  )
}

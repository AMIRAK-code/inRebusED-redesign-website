import { useState, useEffect, useCallback } from 'react'
import styles from './DebugLogosPage.module.css'
import clients from '../data/clients'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — JSON import, no type declaration needed
import existingMap from '../../scripts/client-logo-map.json'

const TOTAL = 40
const IS_PROD = import.meta.env.PROD

const clientNames = clients.map((c) => c.name)

function pad(n: number) {
  return String(n).padStart(2, '0')
}

type MapState = Record<string, string | null>   // "01.png" -> name or null
type SkipState = Record<string, boolean>

function buildInitialMap(): MapState {
  const map: MapState = {}
  for (let i = 1; i <= TOTAL; i++) {
    const key = pad(i) + '.png'
    const existingKey = pad(i)
    const val = (existingMap as Record<string, string | null>)[existingKey]
    map[key] = val && typeof val === 'string' ? val : null
  }
  return map
}

export default function DebugLogosPage() {
  const [map, setMap] = useState<MapState>(buildInitialMap)
  const [skipped, setSkipped] = useState<SkipState>({})
  const [toast, setToast] = useState<string | null>(null)
  const [hidden, setHidden] = useState<Record<string, boolean>>({})

  const mappedCount = Object.entries(map).filter(
    ([k, v]) => v && v.trim() && !skipped[k]
  ).length

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 2200)
  }

  function setName(file: string, value: string) {
    setMap((prev) => ({ ...prev, [file]: value || null }))
  }

  function toggleSkip(file: string) {
    setSkipped((prev) => {
      const next = { ...prev, [file]: !prev[file] }
      if (next[file]) setMap((m) => ({ ...m, [file]: null }))
      return next
    })
  }

  function buildOutput(): Record<string, string | null> {
    const out: Record<string, string | null> = {}
    for (let i = 1; i <= TOTAL; i++) {
      const key = pad(i) + '.png'
      out[key] = skipped[key] ? null : (map[key] ?? null)
    }
    return out
  }

  function handleCopy() {
    const json = JSON.stringify(buildOutput(), null, 2)
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(json).then(() => showToast('Copied!'))
    } else {
      const ta = document.createElement('textarea')
      ta.value = json
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      showToast('Copied!')
    }
  }

  async function handleApply() {
    const body = buildOutput()
    try {
      const res = await fetch('/__debug/apply-logo-map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      showToast(`Applied! mapped=${data.mapped} skipped=${data.skipped} unmatched=${data.unmatched}`)
    } catch {
      showToast('Error — is the dev server running?')
    }
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        if (!IS_PROD) handleApply()
      }
      if (e.key === 'Escape') {
        (document.activeElement as HTMLElement)?.blur()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map, skipped]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (IS_PROD) {
    return (
      <div className={styles.page}>
        <div className={styles.prodBanner}>
          This page is only available in development.
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <span className={styles.toolbarBrand}>inRebus</span>
        <span className={styles.toolbarTitle}>Logo Mapper · DEBUG ONLY</span>
        <div className={styles.toolbarSpacer} />
        <span className={styles.mappedCount}>
          Mapped: <span className={styles.mappedCountNum}>{mappedCount}</span> / {TOTAL}
        </span>
        <button className={`${styles.btn} ${styles.btnCopy}`} onClick={handleCopy}>
          Copy JSON
        </button>
        <button
          className={`${styles.btn} ${styles.btnApply}`}
          onClick={handleApply}
          disabled={mappedCount === 0}
        >
          Apply to clients.ts
        </button>
      </div>

      <datalist id="client-names">
        {clientNames.map((n) => (
          <option key={n} value={n} />
        ))}
      </datalist>

      <div className={styles.grid}>
        {Array.from({ length: TOTAL }, (_, i) => {
          const num = pad(i + 1)
          const file = num + '.png'
          const src = `/clients/${file}`
          const isSkipped = !!skipped[file]
          const value = map[file] ?? ''
          const isMapped = !isSkipped && value.trim().length > 0

          if (hidden[file]) return null

          return (
            <div
              key={file}
              className={`${styles.tile} ${isSkipped ? styles.tileSkipped : ''}`}
            >
              {isMapped && <span className={styles.check}>✓</span>}
              <span className={styles.filename}>{file}</span>
              <div className={styles.imgWrap}>
                <img
                  src={src}
                  alt={file}
                  onError={() =>
                    setHidden((prev) => ({ ...prev, [file]: true }))
                  }
                />
              </div>
              <div className={styles.inputRow}>
                {isSkipped ? (
                  <>
                    <span className={styles.skipLabel}>Skipped</span>
                    <div className={styles.toolbarSpacer} />
                    <button
                      className={styles.skipBtn}
                      onClick={() => toggleSkip(file)}
                      title="Un-skip"
                    >
                      ↩
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      className={styles.nameInput}
                      type="text"
                      placeholder="Client name"
                      autoComplete="off"
                      list="client-names"
                      value={value}
                      tabIndex={i + 1}
                      onChange={(e) => setName(file, e.target.value)}
                    />
                    <button
                      className={styles.skipBtn}
                      onClick={() => toggleSkip(file)}
                      title="Skip this tile"
                    >
                      ✕
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  )
}

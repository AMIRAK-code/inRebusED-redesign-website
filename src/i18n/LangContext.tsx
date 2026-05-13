import { createContext, useContext, useEffect, useState } from 'react'
import en from './en'
import it from './it'

export type Lang = 'en' | 'it'

const DICTS: Record<Lang, Record<string, string>> = { en, it }
const STORAGE_KEY = 'inrebus-lang'

function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'it' || stored === 'en') return stored
    const browser = navigator.language.slice(0, 2).toLowerCase()
    return browser === 'it' ? 'it' : 'en'
  } catch {
    return 'en'
  }
}

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const LangContext = createContext<LangCtx>({
  lang: 'en',
  setLang: () => {},
  t: (k) => en[k] ?? k,
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch { /* noop */ }
  }

  const t = (key: string): string =>
    DICTS[lang][key] ?? en[key] ?? key

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useT = () => useContext(LangContext)

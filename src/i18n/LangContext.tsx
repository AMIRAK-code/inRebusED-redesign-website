import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import en from './en'
import it from './it'

export type Lang = 'en' | 'it'

const DICTS: Record<Lang, Record<string, string>> = { en, it }
const STORAGE_KEY = 'inrebus-lang'

function langFromPath(path: string): Lang {
  return path === '/it' || path.startsWith('/it/') ? 'it' : 'en'
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
  const location = useLocation()
  const urlLang = langFromPath(location.pathname)

  const [lang, setLangState] = useState<Lang>(urlLang)

  // URL prefix is the source of truth — sync whenever it changes
  useEffect(() => {
    setLangState(urlLang)
  }, [urlLang])

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

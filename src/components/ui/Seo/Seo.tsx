import { useEffect, useLayoutEffect } from 'react'
import { useT } from '../../../i18n/LangContext'

const BASE = 'https://www.inrebus.education'
const DEFAULT_IMAGE = `${BASE}/og.jpg`
const MANAGED = 'data-seo'

interface SeoProps {
  title?: string
  description?: string
  path: string
  image?: string
  type?: 'website' | 'article'
  lang?: 'en' | 'it'
  jsonLd?: object | object[]
  noIndex?: boolean
}

function toAbsolute(src: string): string {
  return src.startsWith('http') ? src : `${BASE}${src}`
}

function enPath(path: string): string {
  if (path.startsWith('/it/')) return path.slice(3)
  if (path === '/it') return '/'
  return path
}

function itPath(path: string): string {
  if (path.startsWith('/it')) return path
  if (path === '/') return '/it'
  return `/it${path}`
}

function setMeta(attrs: Record<string, string>): HTMLMetaElement {
  const selector = Object.entries(attrs)
    .filter(([k]) => k !== 'content')
    .map(([k, v]) => `[${k}="${CSS.escape(v)}"]`)
    .join('')
  const existing = document.head.querySelector(`meta${selector}`) as HTMLMetaElement | null
  const el = existing ?? document.createElement('meta')
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
  if (!existing) {
    el.setAttribute(MANAGED, '')
    document.head.appendChild(el)
  }
  return el
}

function setLink(attrs: Record<string, string>): HTMLLinkElement {
  const selector = Object.entries(attrs)
    .filter(([k]) => k !== 'href')
    .map(([k, v]) => `[${k}="${CSS.escape(v)}"]`)
    .join('')
  const existing = document.head.querySelector(`link${selector}`) as HTMLLinkElement | null
  const el = existing ?? document.createElement('link')
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
  if (!existing) {
    el.setAttribute(MANAGED, '')
    document.head.appendChild(el)
  }
  return el
}

export default function Seo({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  lang: langProp,
  jsonLd,
  noIndex = false,
}: SeoProps) {
  const { lang: ctxLang } = useT()
  const lang = langProp ?? ctxLang

  const fullTitle = title
    ? `${title} — inRebus`
    : lang === 'it'
      ? 'inRebus Digital Learning — Creativi Fuori Dagli Schemi'
      : 'inRebus Digital Learning — Creative Outside the Box'

  const desc = description ?? (
    lang === 'it'
      ? 'inRebus progetta esperienze di digital learning su misura — eLearning, LMS e formazione immersiva dal 2013.'
      : 'inRebus designs and delivers tailored digital learning experiences — eLearning, LMS platforms, and immersive training since 2013.'
  )

  const canonical = `${BASE}${path}`
  const ogImage = toAbsolute(image)
  const ogLocale = lang === 'it' ? 'it_IT' : 'en_US'
  const enHref = `${BASE}${enPath(path)}`
  const itHref = `${BASE}${itPath(path)}`
  const jsonLdItems = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  // Sync <html lang> immediately before paint
  useLayoutEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    const prev = document.title
    document.title = fullTitle
    return () => { document.title = prev }
  }, [fullTitle])

  useEffect(() => {
    // meta tags — update or create, then clean up on unmount
    const managed: Element[] = []

    const track = (el: Element) => { if (el.hasAttribute(MANAGED)) managed.push(el) }

    track(setMeta({ name: 'description', content: desc }))
    track(setLink({ rel: 'canonical', href: canonical }))
    track(setLink({ rel: 'alternate', hrefLang: 'en', href: enHref }))
    track(setLink({ rel: 'alternate', hrefLang: 'it', href: itHref }))
    track(setLink({ rel: 'alternate', hrefLang: 'x-default', href: enHref }))

    // OG
    track(setMeta({ property: 'og:type',        content: type }))
    track(setMeta({ property: 'og:url',          content: canonical }))
    track(setMeta({ property: 'og:title',        content: fullTitle }))
    track(setMeta({ property: 'og:description',  content: desc }))
    track(setMeta({ property: 'og:image',        content: ogImage }))
    track(setMeta({ property: 'og:image:width',  content: '1200' }))
    track(setMeta({ property: 'og:image:height', content: '630' }))
    track(setMeta({ property: 'og:locale',       content: ogLocale }))

    // Twitter
    track(setMeta({ name: 'twitter:card',        content: 'summary_large_image' }))
    track(setMeta({ name: 'twitter:title',       content: fullTitle }))
    track(setMeta({ name: 'twitter:description', content: desc }))
    track(setMeta({ name: 'twitter:image',       content: ogImage }))

    if (noIndex) track(setMeta({ name: 'robots', content: 'noindex' }))

    // JSON-LD scripts — always new elements, always tracked
    jsonLdItems.forEach(item => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.textContent = JSON.stringify(item)
      s.setAttribute(MANAGED, '')
      document.head.appendChild(s)
      managed.push(s)
    })

    return () => {
      // Only remove elements WE created (marked data-seo); existing index.html tags get their values updated in-place
      managed.forEach(el => el.parentNode?.removeChild(el))
    }
  }, [desc, canonical, enHref, itHref, type, fullTitle, ogImage, ogLocale, noIndex, jsonLdItems.length])

  return null
}

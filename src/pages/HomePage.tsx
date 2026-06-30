import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Context from '../components/Context/Context'
import Promise from '../components/Promise/Promise'
import Services from '../components/Services/Services'
import Products from '../components/Products/Products'
import Process from '../components/Process/Process'
import Clients from '../components/Clients/Clients'
import Projects from '../components/Projects/Projects'
import Footer from '../components/Footer/Footer'
import Seo from '../components/ui/Seo/Seo'
import lenis from '../lib/lenis'
import { useT } from '../i18n/LangContext'
import { buildOrganization, buildLocalBusiness } from '../lib/seo/jsonLd'

const SECTION_IDS = [
  'hero', 'about', 'context', 'promise', 'services', 'products',
  'process', 'clients', 'projects', 'contact',
]

export default function HomePage() {
  const { t } = useT()
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    lenis.scrollTo(el, { offset: -68 })
  }

  return (
    <>
      <Seo
        description={t('meta.home.description')}
        path={location.pathname}
        jsonLd={[buildOrganization(), buildLocalBusiness()]}
      />
      <Nav activeSection={activeSection} scrollTo={scrollTo} />
      <main>
        <div id="hero"><Hero scrollTo={scrollTo} /></div>
        <div id="about"><About /></div>
        <div id="context"><Context /></div>
        <div id="promise"><Promise /></div>
        <div id="services"><Services /></div>
        <div id="products"><Products /></div>
        <div id="process"><Process /></div>
        <div id="clients"><Clients /></div>
        <div id="projects"><Projects /></div>
        <div id="contact"><Footer scrollTo={scrollTo} /></div>
      </main>
    </>
  )
}

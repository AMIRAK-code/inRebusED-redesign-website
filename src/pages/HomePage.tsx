import { useEffect, useState } from 'react'
import Nav from '../components/Nav/Nav'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Services from '../components/Services/Services'
import Process from '../components/Process/Process'
import Clients from '../components/Clients/Clients'
import Projects from '../components/Projects/Projects'
import Footer from '../components/Footer/Footer'

const SECTION_IDS = ['hero', 'about', 'services', 'process', 'clients', 'projects', 'contact']

export default function HomePage() {
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
    const top = el.getBoundingClientRect().top + window.scrollY - 68
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      <Nav activeSection={activeSection} scrollTo={scrollTo} />
      <main>
        <div id="hero"><Hero scrollTo={scrollTo} /></div>
        <div id="about"><About scrollTo={scrollTo} /></div>
        <div id="services"><Services /></div>
        <div id="process"><Process /></div>
        <div id="clients"><Clients /></div>
        <div id="projects"><Projects /></div>
        <div id="contact"><Footer scrollTo={scrollTo} /></div>
      </main>
    </>
  )
}

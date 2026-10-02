import { useCallback, useEffect, useState } from 'react'
import { About } from './components/About'
import { AiDoor } from './components/AiDoor'
import { AiPanel } from './components/AiPanel'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Now } from './components/Now'
import { Services } from './components/Services'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { LanguageProvider, useLang } from './i18n/LanguageContext'

function Shell() {
  const { t } = useLang()
  const [aiOpen, setAiOpen] = useState(false)
  const [atEnd, setAtEnd] = useState(false)

  const openAi = useCallback(() => {
    setAiOpen(true)
    window.history.replaceState(null, '', '#ai')
  }, [])
  const closeAi = useCallback(() => {
    setAiOpen(false)
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }, [])

  // #ai deep link
  useEffect(() => {
    if (window.location.hash === '#ai') setAiOpen(true)
    const onHash = () => window.location.hash === '#ai' && setAiOpen(true)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // the footer carries its own AI policy link, so the small-screen pill steps aside there
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const io = new IntersectionObserver(([e]) => setAtEnd(e.isIntersecting))
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {t.nav.skip}
      </a>
      <Header />
      <AiDoor visible={!aiOpen} hideMobile={atEnd} onOpen={openAi} />
      <AiPanel open={aiOpen} onClose={closeAi} />
      <main>
        <Hero />
        <Projects />
        <Services />
        <About />
        <Now />
        <Contact />
      </main>
      <Footer onOpenAi={openAi} />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Shell />
    </LanguageProvider>
  )
}

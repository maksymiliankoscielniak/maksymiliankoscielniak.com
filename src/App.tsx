import { useCallback, useEffect, useState } from 'react'
import { AiDoor } from './components/AiDoor'
import { AiPanel } from './components/AiPanel'
import { About } from './components/About'
import { Credits } from './components/Credits'
import { Curtain } from './components/Curtain'
import { Footer } from './components/Footer'
import { FrameFlash } from './components/FrameFlash'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { SideDrapes } from './components/SideDrapes'
import { LanguageProvider, useLang } from './i18n/LanguageContext'
import { goToSection } from './lib/goToSection'

function Shell() {
  const { t } = useLang()
  const [opened, setOpened] = useState(false)
  const [done, setDone] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)

  const openAi = useCallback(() => {
    setAiOpen(true)
    window.history.replaceState(null, '', '#ai')
  }, [])
  const closeAi = useCallback(() => {
    setAiOpen(false)
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }, [])

  // #ai deep link: open the booth once the curtain is up
  useEffect(() => {
    if (done && window.location.hash === '#ai') setAiOpen(true)
  }, [done])
  // in-page anchors: short hops glide, long jumps (past the trailer) cut
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      const id = a?.getAttribute('href')?.slice(1)
      if (id && id !== 'ai' && goToSection(id)) e.preventDefault()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    const onHash = () => window.location.hash === '#ai' && setAiOpen(true)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-brass focus:px-4 focus:py-2 focus:text-stage"
      >
        {t.nav.skip}
      </a>
      <Curtain onOpen={() => setOpened(true)} onDone={() => setDone(true)} />
      <SideDrapes />
      <Header visible={opened} />
      <AiDoor visible={done && !aiOpen} onOpen={openAi} />
      <AiPanel open={aiOpen} onClose={closeAi} />
      <FrameFlash />
      <main>
        <Hero opened={opened} />
        <About />
        <Projects />
        <Credits />
      </main>
      <Footer />
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

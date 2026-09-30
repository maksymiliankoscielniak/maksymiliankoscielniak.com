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
      <Header visible={opened} onOpenAi={openAi} />
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

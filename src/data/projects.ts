import type { Lang } from '../i18n/copy'
import nexusriskScreen from '../assets/screens/nexusrisk.webp'
import countitScreen from '../assets/screens/countit.webp'
import gymgalleryScreen from '../assets/screens/gymgallery.webp'
import peppinScreen from '../assets/screens/peppin.webp'

export type L = Record<Lang, string>
export type ProjectId = 'nexusrisk' | 'countit' | 'gymgallery' | 'peppin'

export type Project = {
  id: ProjectId
  title: string
  kind: L
  tagline: L
  description: L
  stack: string[]
  /** Screenshot of the live site, and which part of it stays in frame */
  screen: { src: string; position: string }
  /** Links with an empty href are hidden. */
  links: { label: L; href: string }[]
}

const live: L = { en: 'Live demo', pl: 'Demo na żywo' }
const code: L = { en: 'Source code', pl: 'Kod źródłowy' }

export const projects: Project[] = [
  {
    id: 'nexusrisk',
    title: 'NexusRisk',
    kind: { en: 'Risk dashboard', pl: 'Dashboard ryzyka' },
    tagline: {
      en: 'Break the portfolio before the market does.',
      pl: 'Złam portfel, zanim zrobi to rynek.',
    },
    description: {
      en: 'A standalone, interactive portfolio macro and risk stress-testing dashboard. Features dynamic asset-allocation rebalancing, historical crisis simulation (2008 crash, stagflation shocks), Monte Carlo stochastic modeling, and real-time risk metrics (Sharpe ratio, VaR 95%).',
      pl: 'Samodzielny, interaktywny dashboard do stress-testów makro i ryzyka portfela. Dynamiczne przebalansowanie alokacji aktywów, symulacje historycznych kryzysów (krach 2008, szoki stagflacyjne), modelowanie Monte Carlo i metryki ryzyka w czasie rzeczywistym (wskaźnik Sharpe’a, VaR 95%).',
    },
    stack: ['React', 'TypeScript', 'Vite'],
    screen: { src: nexusriskScreen, position: 'center' },
    links: [
      { label: live, href: 'https://maksymiliankoscielniak.github.io/NexusRisk/' },
      { label: code, href: 'https://github.com/maksymiliankoscielniak/NexusRisk' },
    ],
  },
  {
    id: 'countit',
    title: 'countIT',
    kind: { en: 'Nutrition tracker', pl: 'Śledzenie żywienia' },
    tagline: { en: 'Every gram counts.', pl: 'Liczy się każdy gram.' },
    description: {
      en: 'A modern, full-stack calorie and macro tracking application featuring secure user authentication, drag-and-drop meal management, and dynamic macro calculation using the Mifflin-St Jeor equation. Integrated with the government USDA FoodData Central API.',
      pl: 'Nowoczesna aplikacja full-stack do śledzenia kalorii i makroskładników: bezpieczne logowanie, zarządzanie posiłkami metodą przeciągnij i upuść oraz dynamiczne obliczanie makr wzorem Mifflina-St Jeora. Zintegrowana z rządowym API USDA FoodData Central.',
    },
    stack: ['React', 'TypeScript', 'FastAPI', 'USDA FoodData Central'],
    screen: { src: countitScreen, position: 'center' },
    links: [
      { label: live, href: 'https://maksymiliankoscielniak.github.io/countIT/' },
      { label: code, href: 'https://github.com/maksymiliankoscielniak/countIT' },
    ],
  },
  {
    id: 'gymgallery',
    title: 'GymGallery',
    kind: { en: 'Training planner', pl: 'Planer treningowy' },
    tagline: { en: 'Sketch. Paint. Carve.', pl: 'Szkicuj. Maluj. Rzeźb.' },
    description: {
      en: 'An art-inspired hypertrophy planner: sketch your split on parchment, paint your exercise selection in oil, then carve the final physique in marble. Built with React and TypeScript, with no backend - all data stays in the browser.',
      pl: 'Planer hipertrofii inspirowany sztuką: naszkicuj split na pergaminie, namaluj wybór ćwiczeń olejem, a na końcu wyrzeźb sylwetkę w marmurze. Zbudowany w React i TypeScript, bez backendu - wszystkie dane zostają w przeglądarce.',
    },
    stack: ['React', 'TypeScript'],
    screen: { src: gymgalleryScreen, position: 'center' },
    links: [
      { label: live, href: 'https://maksymiliankoscielniak.github.io/GymGallery/' },
      { label: code, href: 'https://github.com/maksymiliankoscielniak/GymGallery' },
    ],
  },
  {
    id: 'peppin',
    title: 'Peppin',
    kind: { en: 'Calculator and library', pl: 'Kalkulator i biblioteka' },
    tagline: { en: 'Half-life, explained.', pl: 'Okres półtrwania, wyjaśniony.' },
    description: {
      en: 'A clean, client-side reconstitution calculator and educational compound library with a goal finder and half-life simulator. Deployed on GitHub Pages. Educational only - not medical advice.',
      pl: 'Czysty, działający po stronie klienta kalkulator rekonstytucji oraz edukacyjna biblioteka związków z wyszukiwarką celów i symulatorem okresu półtrwania. Wdrożony na GitHub Pages. Wyłącznie w celach edukacyjnych - to nie porada medyczna.',
    },
    stack: ['React', 'TypeScript', 'Vite', 'GitHub Pages'],
    screen: { src: peppinScreen, position: 'center' },
    links: [
      { label: live, href: 'https://maksymiliankoscielniak.github.io/Peppin/' },
      { label: code, href: 'https://github.com/maksymiliankoscielniak/Peppin' },
    ],
  },
]

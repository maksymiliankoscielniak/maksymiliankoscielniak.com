export type Lang = 'en' | 'pl'

export const en = {
  meta: {
    title: 'Maksymilian Kościelniak — Full-stack developer & web designer',
    description:
      'Portfolio of Maksymilian Kościelniak, full-stack developer and web designer. Websites and web apps built with React, TypeScript and Python.',
  },
  nav: {
    label: 'Main navigation',
    about: 'About',
    projects: 'Projects',
    ai: 'AI policy',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    home: 'Back to the top',
    skip: 'Skip to content',
  },
  lang: {
    label: 'Language',
    en: 'English',
    pl: 'Polski',
    switchTo: 'Switch language to',
  },
  curtain: {
    hint: 'Tap anywhere to begin',
    opening: 'Opening curtain',
  },
  hero: {
    role: 'Full-stack developer & web designer',
    tagline:
      'I design and build clear, fast websites and web apps, from data-heavy dashboards to everyday tools.',
    cta: 'See the projects',
  },
  about: {
    heading: 'About',
    cards: [
      'He designs it.',
      'He builds it.',
      'From stress-testing portfolios to counting macros.',
      'React and TypeScript up front. FastAPI and Python behind the scenes.',
    ],
    finale: 'Coming soon to your team.',
    scroll: 'Scroll to roll the trailer',
    bodyTitle: 'Maksymilian Kościelniak',
    body: [
      'I’m a full-stack developer and web designer who likes turning complicated things into interfaces people can use without a manual: risk models, nutrition maths and pharmacokinetics.',
      'I start with the problem, pick the simplest stack that solves it, and keep the details tidy: considered design, typed code, honest empty states, pages that load fast.',
    ],
    stack: [
      { label: 'Front of house', items: 'React, TypeScript, Vite, Tailwind CSS' },
      { label: 'Backstage', items: 'FastAPI, Python' },
    ],
  },
  projects: {
    heading: 'Now showing',
    intro: 'Tune in to any screen to see the full poster.',
    tuneIn: 'Open poster',
    channel: 'CH',
    modal: {
      genre: 'Genre',
      cast: 'Starring',
      links: 'Watch it',
      close: 'Close poster',
      directed: 'A Maksymilian Kościelniak production',
      posterOf: 'Poster for',
      noLinks: 'Links coming soon.',
    },
  },
  ai: {
    heading: 'AI policy',
    tagline: 'The prompter whispers. The actor performs.',
    intro:
      'I use AI tools every day, the way a theatre uses a prompter: to keep the show moving, never to play the part.',
    scene: 'INT. PROMPTER’S BOX, NIGHT',
    prompterName: 'Prompter',
    prompterDirection: '(whispering)',
    prompterItems: [
      'Drafts boilerplate, test cases and alternative approaches.',
      'Explains unfamiliar APIs and cryptic error messages.',
      'Reviews my code and catches what I missed.',
      'Helps polish documentation and translations.',
    ],
    actorName: 'Me',
    actorDirection: '(on stage)',
    actorItems: [
      'I decide the architecture and what ships.',
      'I read, run and understand every line before it’s committed.',
      'I own the bugs, the security and the data.',
    ],
    curtain: '(Curtain.)',
    close: 'Close AI policy',
  },
  contact: {
    heading: 'Credits',
    lead: 'Written, directed and developed by',
    name: 'Maksymilian Kościelniak',
    intro: 'Want to work together, or just say hello? Find me at the stage door.',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'Email',
  },
  footer: {
    end: 'The End',
    built: 'Built with Vite, React, TypeScript, Tailwind CSS and Framer Motion.',
    rights: 'All rights reserved.',
  },
}

export type Dict = typeof en

export const pl: Dict = {
  meta: {
    title: 'Maksymilian Kościelniak — Full-stack developer i projektant stron',
    description:
      'Portfolio Maksymiliana Kościelniaka, full-stack developera i projektanta stron internetowych. Strony i aplikacje webowe w React, TypeScript i Pythonie.',
  },
  nav: {
    label: 'Nawigacja główna',
    about: 'O mnie',
    projects: 'Projekty',
    ai: 'Polityka AI',
    contact: 'Kontakt',
    openMenu: 'Otwórz menu',
    closeMenu: 'Zamknij menu',
    home: 'Wróć na górę',
    skip: 'Przejdź do treści',
  },
  lang: {
    label: 'Język',
    en: 'English',
    pl: 'Polski',
    switchTo: 'Zmień język na',
  },
  curtain: {
    hint: 'Dotknij, aby zacząć',
    opening: 'Kurtyna idzie w górę',
  },
  hero: {
    role: 'Full-stack developer i projektant stron',
    tagline:
      'Projektuję i buduję czytelne, szybkie strony i aplikacje webowe, od dashboardów pełnych danych po codzienne narzędzia.',
    cta: 'Zobacz projekty',
  },
  about: {
    heading: 'O mnie',
    cards: [
      'Zaprojektuje to.',
      'Zbuduje to.',
      'Od stress-testów portfela po liczenie makroskładników.',
      'React i TypeScript na froncie. FastAPI i Python za kulisami.',
    ],
    finale: 'Wkrótce w Twoim zespole.',
    scroll: 'Przewijaj, by odtworzyć zwiastun',
    bodyTitle: 'Maksymilian Kościelniak',
    body: [
      'Jestem full-stack developerem i projektantem stron internetowych, który lubi zamieniać skomplikowane rzeczy w interfejsy obsługiwane bez instrukcji: modele ryzyka, rachunek żywieniowy, farmakokinetykę.',
      'Zaczynam od problemu, wybieram najprostszy stack, który go rozwiązuje, i dbam o szczegóły: przemyślany projekt, otypowany kod, sensowne puste stany, strony, które szybko się ładują.',
    ],
    stack: [
      { label: 'Przed kurtyną', items: 'React, TypeScript, Vite, Tailwind CSS' },
      { label: 'Za kulisami', items: 'FastAPI, Python' },
    ],
  },
  projects: {
    heading: 'Teraz w kinach',
    intro: 'Włącz dowolny ekran, żeby zobaczyć pełny plakat.',
    tuneIn: 'Otwórz plakat',
    channel: 'KAN',
    modal: {
      genre: 'Gatunek',
      cast: 'W rolach głównych',
      links: 'Obejrzyj',
      close: 'Zamknij plakat',
      directed: 'Produkcja Maksymilian Kościelniak',
      posterOf: 'Plakat projektu',
      noLinks: 'Linki wkrótce.',
    },
  },
  ai: {
    heading: 'Polityka AI',
    tagline: 'Sufler podpowiada. Aktor gra.',
    intro:
      'Na co dzień korzystam z narzędzi AI tak, jak teatr korzysta z suflera: żeby przedstawienie nie stanęło, a nie po to, by zagrać rolę za mnie.',
    scene: 'WNĘTRZE. BUDKA SUFLERA, NOC',
    prompterName: 'Sufler',
    prompterDirection: '(szeptem)',
    prompterItems: [
      'Szkicuje boilerplate, przypadki testowe i alternatywne podejścia.',
      'Tłumaczy nieznane API i niejasne komunikaty błędów.',
      'Przegląda mój kod i wyłapuje to, co przeoczyłem.',
      'Pomaga szlifować dokumentację i tłumaczenia.',
    ],
    actorName: 'Ja',
    actorDirection: '(na scenie)',
    actorItems: [
      'Sam decyduję o architekturze i o tym, co trafia na produkcję.',
      'Czytam, uruchamiam i rozumiem każdą linijkę, zanim trafi do repozytorium.',
      'Odpowiadam za błędy, bezpieczeństwo i dane.',
    ],
    curtain: '(Kurtyna.)',
    close: 'Zamknij politykę AI',
  },
  contact: {
    heading: 'Napisy końcowe',
    lead: 'Scenariusz, reżyseria i kod',
    name: 'Maksymilian Kościelniak',
    intro: 'Chcesz współpracować albo po prostu się przywitać? Znajdziesz mnie przy wejściu dla artystów.',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'E-mail',
  },
  footer: {
    end: 'Koniec',
    built: 'Zbudowane w Vite, React, TypeScript, Tailwind CSS i Framer Motion.',
    rights: 'Wszelkie prawa zastrzeżone.',
  },
}

export const dictionaries: Record<Lang, Dict> = { en, pl }

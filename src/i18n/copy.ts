export type Lang = 'en' | 'pl'

export const en = {
  meta: {
    title: 'Maksymilian Kościelniak | Full-stack developer & web designer',
    description:
      'Portfolio of Maksymilian Kościelniak, full-stack developer and web designer. Websites and web apps built with React, TypeScript and Python.',
  },
  nav: {
    label: 'Main navigation',
    projects: 'Projects',
    about: 'About',
    contact: 'Contact',
    ai: 'AI policy',
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
  hero: {
    role: 'Full-stack developer and web designer',
    tagline:
      'I design and build clear, fast websites and web apps, from data-heavy dashboards to everyday tools.',
    where: 'Computer Science student in Łódź',
    ctaProjects: 'See the projects',
    ctaContact: 'Get in touch',
  },
  work: {
    heading: 'Selected work',
    builtWith: 'Built with',
    live: 'Live demo',
    code: 'Source code',
    openLive: 'Open the live demo of',
  },
  about: {
    heading: 'About',
    body: [
      'I’m a full-stack developer and web designer. What interests me most is the point where a design meets the person using it: clear hierarchy, readable typography, restrained colour, and motion that explains rather than decorates.',
      'I begin with the problem, choose the simplest stack that solves it, and keep the details in order: considered interfaces, typed code, honest empty states and pages that load quickly. Because I work across the whole stack, a design decision never gets lost between mockup and production.',
      'I’m studying Computer Science in Łódź, and the projects above are what I build alongside it.',
    ],
    groups: [
      { label: 'Languages', items: 'JavaScript, TypeScript, Python, C, C++, HTML, CSS, PHP, SQL' },
      { label: 'Frameworks', items: 'React, Angular, FastAPI, Node.js, Django, Flask, Tailwind CSS' },
      { label: 'Tools', items: 'VS Code, Vite, Git, PostgreSQL' },
    ],
    signature: 'Maksymilian',
  },
  ai: {
    heading: 'AI policy',
    intro:
      'I use AI tools every day as an assistant. They speed up routine work; the decisions, and the responsibility for them, stay with me.',
    helpsTitle: 'Where it helps',
    helps: [
      'Drafts boilerplate, test cases and alternative approaches.',
      'Explains unfamiliar APIs and cryptic error messages.',
      'Reviews my code and catches what I missed.',
      'Helps polish documentation and translations.',
    ],
    ownTitle: 'What stays with me',
    own: [
      'I decide the architecture and what ships.',
      'I read, run and understand every line before it’s committed.',
      'I own the bugs, the security and the data.',
    ],
    close: 'Close AI policy',
  },
  contact: {
    heading: 'Contact',
    title: 'Have a project in mind? Let’s talk.',
    intro: 'I’m open to new projects and good conversations.',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'Email',
    copy: 'Copy email address',
    copied: 'Copied',
  },
  footer: {
    built: 'Built with Vite, React, TypeScript and Tailwind CSS.',
    rights: 'All rights reserved.',
  },
}

export type Dict = typeof en

export const pl: Dict = {
  meta: {
    title: 'Maksymilian Kościelniak | Full-stack developer i projektant stron',
    description:
      'Portfolio Maksymiliana Kościelniaka, full-stack developera i projektanta stron internetowych. Strony i aplikacje webowe w React, TypeScript i Pythonie.',
  },
  nav: {
    label: 'Nawigacja główna',
    projects: 'Projekty',
    about: 'O mnie',
    contact: 'Kontakt',
    ai: 'Polityka AI',
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
  hero: {
    role: 'Full-stack developer i projektant stron',
    tagline:
      'Projektuję i buduję czytelne, szybkie strony i aplikacje webowe, od dashboardów pełnych danych po codzienne narzędzia.',
    where: 'Student informatyki w Łodzi',
    ctaProjects: 'Zobacz projekty',
    ctaContact: 'Napisz do mnie',
  },
  work: {
    heading: 'Wybrane projekty',
    builtWith: 'Technologie',
    live: 'Demo na żywo',
    code: 'Kod źródłowy',
    openLive: 'Otwórz demo projektu',
  },
  about: {
    heading: 'O mnie',
    body: [
      'Jestem full-stack developerem i projektantem stron. Najbardziej interesuje mnie moment, w którym projekt spotyka się z osobą, która z niego korzysta: czytelna hierarchia, dobra typografia, stonowane kolory i animacja, która wyjaśnia, a nie tylko ozdabia.',
      'Zaczynam od problemu, wybieram najprostszy stack, który go rozwiązuje, i dbam o szczegóły: przemyślane interfejsy, otypowany kod, sensowne puste stany i szybko ładujące się strony. Pracuję na całym stosie, więc decyzje projektowe nie giną między makietą a produkcją.',
      'Studiuję informatykę w Łodzi, a projekty powyżej to to, co buduję obok studiów.',
    ],
    groups: [
      { label: 'Języki', items: 'JavaScript, TypeScript, Python, C, C++, HTML, CSS, PHP, SQL' },
      { label: 'Frameworki', items: 'React, Angular, FastAPI, Node.js, Django, Flask, Tailwind CSS' },
      { label: 'Narzędzia', items: 'VS Code, Vite, Git, PostgreSQL' },
    ],
    signature: 'Maksymilian',
  },
  ai: {
    heading: 'Polityka AI',
    intro:
      'Na co dzień korzystam z narzędzi AI jak z asystenta. Przyspieszają rutynową pracę, a decyzje i odpowiedzialność za nie zostają po mojej stronie.',
    helpsTitle: 'W czym pomaga',
    helps: [
      'Szkicuje boilerplate, przypadki testowe i alternatywne podejścia.',
      'Tłumaczy nieznane API i niejasne komunikaty błędów.',
      'Przegląda mój kod i wyłapuje to, co przeoczyłem.',
      'Pomaga szlifować dokumentację i tłumaczenia.',
    ],
    ownTitle: 'Co zostaje u mnie',
    own: [
      'Sam decyduję o architekturze i o tym, co trafia na produkcję.',
      'Czytam, uruchamiam i rozumiem każdą linijkę, zanim trafi do repozytorium.',
      'Odpowiadam za błędy, bezpieczeństwo i dane.',
    ],
    close: 'Zamknij politykę AI',
  },
  contact: {
    heading: 'Kontakt',
    title: 'Masz pomysł na projekt? Porozmawiajmy.',
    intro: 'Chętnie podejmę nowe projekty i dobre rozmowy.',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'E-mail',
    copy: 'Skopiuj adres e-mail',
    copied: 'Skopiowano',
  },
  footer: {
    built: 'Zbudowane w Vite, React, TypeScript i Tailwind CSS.',
    rights: 'Wszelkie prawa zastrzeżone.',
  },
}

export const dictionaries: Record<Lang, Dict> = { en, pl }

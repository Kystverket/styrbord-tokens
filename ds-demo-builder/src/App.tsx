import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import BrandSection from './BrandSection';
import ColorSection from './ColorSection';
import TypographySection from './TypographySection';
import BorderRadiusSection from './BorderRadiusSection';
import SizesSection from './SizesSection';
import ShadowSection from './ShadowSection';
import GlobalSection from './GlobalSection';
import { colors, semanticColors } from './tokens';

type Scheme = 'light' | 'dark';

type SectionDef = { id: string; title: string; desc: string; render: (scheme: Scheme) => ReactNode };

const NAV: { group: string; sections: SectionDef[] }[] = [
  {
    group: 'Farger',
    sections: [
      {
        id: 'brand',
        title: 'Profilfarger',
        desc: 'Kystverkets profilfarger, med kontrastfarge for tekst',
        render: () => <BrandSection />,
      },
      {
        id: 'semantic-colors',
        title: 'Semantiske farger',
        desc: 'Fargeroller med 16 varianter hver',
        // Re-mount on scheme change so the hex labels are re-read from computed style
        render: (scheme) => <ColorSection key={scheme} palettes={semanticColors} />,
      },
      {
        id: 'palettes',
        title: 'Paletter',
        desc: 'Kystverkets fargepaletter med 16 varianter hver',
        render: (scheme) => <ColorSection key={scheme} palettes={colors} />,
      },
    ],
  },
  {
    group: 'Typografi og form',
    sections: [
      { id: 'typography', title: 'Typografi', desc: 'Skala for overskrifter og brødtekst', render: () => <TypographySection /> },
      { id: 'border-radius', title: 'Hjørneradius', desc: 'Tokens for avrunding av hjørner', render: () => <BorderRadiusSection /> },
      { id: 'sizes', title: 'Størrelser', desc: 'Skala for mellomrom og størrelser', render: () => <SizesSection /> },
      { id: 'shadows', title: 'Skygger', desc: 'Skyggenivåer for dybde og høyde', render: () => <ShadowSection /> },
      {
        id: 'global',
        title: 'Globale stilverdier',
        desc: 'Fokusring, kantstørrelser, skrifttype og deaktivert tilstand',
        render: () => <GlobalSection />,
      },
    ],
  },
];

const ALL_SECTIONS = NAV.flatMap((g) => g.sections);

/** Id of the last section whose top has scrolled past the top of the viewport. */
function useActiveSection(): string {
  const [active, setActive] = useState(ALL_SECTIONS[0].id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(ALL_SECTIONS[ALL_SECTIONS.length - 1].id);
        return;
      }
      let current = ALL_SECTIONS[0].id;
      for (const { id } of ALL_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}

export default function App() {
  const [scheme, setScheme] = useState<Scheme>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );
  const active = useActiveSection();

  // On narrow screens the nav is a horizontal bar: keep the active link in view.
  // Only touches the bar's own scrollLeft, so the page itself never moves.
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('.sidebar-nav');
    const link = nav?.querySelector<HTMLElement>('.sidebar-link[aria-current]');
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    const navBox = nav.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    if (linkBox.left < navBox.left || linkBox.right > navBox.right) {
      nav.scrollTo({ left: nav.scrollLeft + linkBox.left - navBox.left - 16, behavior: 'smooth' });
    }
  }, [active]);

  // The browser tries to jump to #hash before React has rendered the sections, so do it after mount
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
  }, []);

  // Layout effect so the attribute is set before child effects read computed colours
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', scheme);
  }, [scheme]);

  return (
    <div className="layout">
      <aside className="sidebar">
        <a className="sidebar-brand" href="#top">
          Styrbord <em>tokens</em>
        </a>
        <nav className="sidebar-nav" aria-label="Innhold">
          {NAV.map((group) => (
            <div key={group.group} className="sidebar-group">
              <p className="sidebar-group-label">{group.group}</p>
              <ul className="sidebar-list">
                {group.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      className="sidebar-link"
                      href={`#${s.id}`}
                      aria-current={active === s.id ? 'location' : undefined}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="scheme-toggle" role="group" aria-label="Fargemodus">
          {(['light', 'dark'] as const).map((s) => (
            <button
              key={s}
              type="button"
              className="scheme-toggle-btn"
              aria-pressed={scheme === s}
              onClick={() => setScheme(s)}
            >
              {s === 'light' ? 'Lys' : 'Mørk'}
            </button>
          ))}
        </div>
      </aside>

      <main className="main-content" id="top">
        <div className="intro">
          <h1 className="intro-title">Kystverkets design tokens</h1>
          <p className="intro-body">
            Denne siden dokumenterer Kystverkets verdier for{' '}
            <a className="intro-link" href="https://designsystemet.no/" target="_blank" rel="noreferrer">
              Designsystemet.no
            </a>{' '}
            sine design tokens — farger, typografi, størrelser og øvrige stilvariabler som brukes i{' '}
            <a className="intro-link" href="https://kystverket.github.io/styrbord/" target="_blank" rel="noreferrer">
              Styrbord
            </a>
            , Kystverkets komponentbibliotek.
          </p>
        </div>

        {ALL_SECTIONS.map((s) => (
          <Section key={s.id} id={s.id} title={s.title} desc={s.desc}>
            {s.render(scheme)}
          </Section>
        ))}
      </main>
    </div>
  );
}

function Section({ id, title, desc, children }: { id: string; title: string; desc: string; children: ReactNode }) {
  return (
    <section id={id} className="page-section">
      <div className="section-head">
        <h2 className="section-title">{title}</h2>
        <p className="section-desc">{desc}</p>
      </div>
      {children}
    </section>
  );
}

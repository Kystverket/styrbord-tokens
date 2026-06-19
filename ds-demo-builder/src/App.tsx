import { ReactNode } from 'react';
import ColorSection from './ColorSection';
import TypographySection from './TypographySection';
import BorderRadiusSection from './BorderRadiusSection';
import SizesSection from './SizesSection';

const navItems = [
  { id: 'colors', label: 'Farger' },
  { id: 'typography', label: 'Typografi' },
  { id: 'border-radius', label: 'Hjørneradius' },
  { id: 'sizes', label: 'Størrelser' },
];

export default function App() {
  return (
    <>
      <header className="top-nav">
        <span className="top-nav-brand">
          styrbord<em>tokens</em>
        </span>
        <div className="top-nav-sep" />
        <nav className="top-nav-links">
          {navItems.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className="top-nav-link">
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main className="main-content">
        <Section id="colors" title="Farger" desc="9 fargepaletter · 16 semantiske varianter per palett">
          <ColorSection />
        </Section>
        <Section id="typography" title="Typografi" desc="Skala for overskrifter og brødtekst">
          <TypographySection />
        </Section>
        <Section id="border-radius" title="Hjørneradius" desc="Tokens for avrunding av hjørner">
          <BorderRadiusSection />
        </Section>
        <Section id="sizes" title="Størrelser" desc="Skala for mellomrom og størrelser">
          <SizesSection />
        </Section>
      </main>
    </>
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

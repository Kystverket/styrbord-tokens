import { ReactNode } from 'react';
import ColorSection from './ColorSection';
import TypographySection from './TypographySection';
import BorderRadiusSection from './BorderRadiusSection';
import SizesSection from './SizesSection';
import ShadowSection from './ShadowSection';
import GlobalSection from './GlobalSection';

export default function App() {
  return (
    <>
      <main className="main-content">
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
        <Section id="shadows" title="Skygger" desc="Skyggenivåer for dybde og høyde">
          <ShadowSection />
        </Section>
        <Section id="global" title="Globale stilverdier" desc="Fokusring, kantstørrelser, skrifttype og deaktivert tilstand">
          <GlobalSection />
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

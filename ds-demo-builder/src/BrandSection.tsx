import { useEffect, useState } from 'react';
import { brandColors } from './tokens';
import { contrastRatio, parsedToHex, useCopyFeedback, wcagLevel } from './colorUtils';

const v = (role: string, slot: string) => `var(--ds-color-${role}-${slot})`;

function useBrandHexMap(): Record<string, string> {
  const [map, setMap] = useState<Record<string, string>>({});
  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};
    for (const { role, slot } of brandColors) {
      for (const token of [`--ds-color-${role}-${slot}`, `--ds-color-${role}-${slot}-contrast`]) {
        next[token] = parsedToHex(style.getPropertyValue(token).trim());
      }
    }
    setMap(next);
  }, []);
  return map;
}

function BrandHero() {
  return (
    <div className="brand-hero">
      <div className="brand-hero-main" style={{ background: v('primary', 'brand'), color: v('primary', 'brand-contrast') }}>
        <span
          className="brand-hero-pill"
          style={{ background: v('primary', 'brand-secondary'), color: v('primary', 'brand-secondary-contrast') }}
        >
          Profilfarger
        </span>
        <h3 className="brand-hero-title">Trygg ferdsel langs kysten</h3>
        <p className="brand-hero-body">
          Mørk blå bærer identiteten. Lys blå og sand gir luft, og de sterke fargene brukes sparsomt
          for å trekke blikket.
        </p>
        <span className="brand-hero-cta" style={{ background: v('accent', 'brand'), color: v('accent', 'brand-contrast') }}>
          Rødoransje for det viktigste
        </span>
      </div>
      <div
        className="brand-hero-side"
        style={{ background: v('primary', 'brand-background'), color: v('primary', 'brand-background-contrast') }}
      >
        <p className="brand-hero-side-label">Aksentfarger</p>
        <div className="brand-hero-chips">
          {brandColors
            .filter((c) => c.role !== 'primary' && c.slot === 'brand')
            .map((c) => (
              <span
                key={c.role}
                className="brand-hero-chip"
                style={{ background: v(c.role, c.slot), color: v(c.role, `${c.slot}-contrast`) }}
              >
                {c.name}
              </span>
            ))}
          <span
            className="brand-hero-chip"
            style={{ background: v('extra1', 'brand-secondary'), color: v('extra1', 'brand-secondary-contrast') }}
          >
            Lys grønn
          </span>
        </div>
      </div>
      <div className="brand-hero-stripe" aria-hidden>
        {brandColors.map((c) => (
          <span key={`${c.role}-${c.slot}`} style={{ background: v(c.role, c.slot) }} />
        ))}
      </div>
    </div>
  );
}

export default function BrandSection() {
  const hexMap = useBrandHexMap();
  const { copied, copy } = useCopyFeedback();

  return (
    <div className="brand-section">
      <BrandHero />

      <div className="brand-grid">
        {brandColors.map(({ role, slot, name }) => {
          const token = `--ds-color-${role}-${slot}`;
          const contrastToken = `${token}-contrast`;
          const hex = hexMap[token] ?? '';
          const contrastHex = hexMap[contrastToken] ?? '';
          const ratio = contrastRatio(hex, contrastHex);
          return (
            <article key={token} className="brand-card">
              <button
                type="button"
                className="brand-card-swatch"
                style={{ background: `var(${token})`, color: `var(${contrastToken})` }}
                title={`Kopier ${hex}`}
                onClick={() => copy(hex)}
              >
                <span className="brand-card-aa">Aa</span>
                <span className="brand-card-hex">{copied === hex ? '✓ kopiert' : hex}</span>
              </button>
              <div className="brand-card-body">
                <p className="brand-card-name">{name}</p>
                <p className="brand-card-meta">
                  {role} · {slot}
                </p>
                <button type="button" className="token-badge brand-card-token" title={token} onClick={() => copy(token)}>
                  {copied === token ? '✓ kopiert' : token}
                </button>
                <button type="button" className="token-badge brand-card-token" title={contrastToken} onClick={() => copy(contrastToken)}>
                  {copied === contrastToken ? '✓ kopiert' : contrastToken}
                </button>
                {ratio && (
                  <p className="brand-card-contrast">
                    Kontrast {ratio.toFixed(1)}:1 <span className="brand-card-level">{wcagLevel(ratio)}</span>
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <p className="brand-note">
        Profilfargene er like i lys og mørk modus og er ment for enkeltelementer, ikke flater med mye innhold.
        Inne i <code>[data-color]</code> er de også tilgjengelige som <code>--ds-color-brand</code>,{' '}
        <code>--ds-color-brand-contrast</code> osv.
      </p>
    </div>
  );
}

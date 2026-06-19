import { borderWidths } from './tokens';

export default function GlobalSection() {
  return (
    <div className="global-section">

      <p className="type-group-label">Fokusring</p>
      <div className="global-group">
        <div className="focus-demo-row">
          <button className="focus-demo-btn" tabIndex={0}>
            Trykk Tab for å se fokus
          </button>
          <div className="focus-demo-tokens">
            <code className="token-badge">--ds-color-focus-outer</code>
            <code className="token-badge">--ds-color-focus-inner</code>
            <code className="token-badge">--ds-border-width-focus</code>
          </div>
        </div>
      </div>

      <p className="type-group-label" style={{ marginTop: '40px' }}>Kantstørrelser</p>
      <div className="global-group">
        {borderWidths.map((width) => (
          <div key={width} className="border-width-row">
            <div
              className="border-width-sample"
              style={{ borderBottomWidth: `var(--ds-border-width-${width})`, borderBottomStyle: 'solid', borderBottomColor: `var(--ds-color-neutral-border-strong)` }}
            />
            <code className="token-badge">--ds-border-width-{width}</code>
          </div>
        ))}
      </div>

      <p className="type-group-label" style={{ marginTop: '40px' }}>Skrifttype</p>
      <div className="global-group">
        <div className="font-family-row">
          <span className="font-family-sample">
            Museo sans — Aa Bb Cc 0123
          </span>
          <code className="token-badge">--ds-font-family</code>
        </div>
      </div>

      <p className="type-group-label" style={{ marginTop: '40px' }}>Deaktivert tilstand</p>
      <div className="global-group">
        <div className="opacity-demo-row">
          <div className="opacity-demo-items">
            <div className="opacity-demo-full">
              <div className="opacity-demo-chip">Aktiv</div>
              <span className="opacity-demo-note">100%</span>
            </div>
            <div className="opacity-demo-disabled">
              <div className="opacity-demo-chip" style={{ opacity: 'var(--ds-opacity-disabled)' as never }}>Deaktivert</div>
              <span className="opacity-demo-note">30%</span>
            </div>
          </div>
          <code className="token-badge">--ds-opacity-disabled</code>
        </div>
      </div>

    </div>
  );
}

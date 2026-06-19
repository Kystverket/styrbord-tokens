const HEADING_SIZES = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs'] as const;
const BODY_SIZES = ['xl', 'lg', 'md', 'sm', 'xs'] as const;

const HEADING_SPECIMEN = 'Trygg navigasjon i norske farvann';
const BODY_SPECIMEN =
  'Kystverket sikrer trygg sjøtrafikk og forvalter kystinfrastruktur langs norskekysten – fra fyrlykter til trafikksentraler.';

export default function TypographySection() {
  return (
    <div>
      <p className="type-group-label">Overskriftsskala</p>
      <div className="type-specimens">
        {HEADING_SIZES.map((size) => (
          <TypeRow key={size} name="heading" size={size} text={HEADING_SPECIMEN} />
        ))}
      </div>

      <p className="type-group-label">Brødtekstskala</p>
      <div className="type-specimens">
        {BODY_SIZES.map((size) => (
          <TypeRow key={size} name="body" size={size} text={BODY_SPECIMEN} />
        ))}
      </div>
    </div>
  );
}

function TypeRow({ name, size, text }: { name: string; size: string; text: string }) {
  return (
    <div className="type-row">
      <span
        className="type-sample"
        style={{
          fontSize: `var(--ds-${name}-${size}-font-size)`,
          fontWeight: `var(--ds-${name}-${size}-font-weight)`,
          letterSpacing: `var(--ds-${name}-${size}-letter-spacing)`,
          lineHeight: `var(--ds-${name}-${size}-line-height)`,
        }}
      >
        {text}
      </span>
      <div className="type-meta">
        <code className="token-badge">
          --ds-{name}-{size}
        </code>
      </div>
    </div>
  );
}

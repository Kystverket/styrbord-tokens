import { spacings } from './tokens';

export default function SizesSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {spacings.map((size) => (
        <div key={size}>
          <div
            style={{
              backgroundColor: 'var(--ds-color-extra2-surface-hover)',
              display: 'block',
              width: `var(--ds-size-${size})`,
              height: `var(--ds-size-${size})`,
            }}
          />
          --ds-size-{size}
        </div>
      ))}
    </div>
  );
}

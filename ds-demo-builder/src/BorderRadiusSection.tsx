import { borderRadiusSizes } from './tokens';

export default function BorderRadiusSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {borderRadiusSizes.map((size) => (
        <div
          key={size}
          style={{
            backgroundColor: 'var(--ds-color-extra1-surface-hover)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '300px',
            height: '100px',
            borderRadius: `var(--ds-border-radius-${size})`,
          }}
        >
          --ds-border-radius-{size}
        </div>
      ))}
    </div>
  );
}

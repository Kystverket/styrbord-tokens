import { shadowSizes } from './tokens';

export default function ShadowSection() {
  return (
    <div className="shadow-gallery">
      {shadowSizes.map((size, i) => (
        <div key={size} className="shadow-card">
          <div
            className="shadow-box"
            style={{
              boxShadow: `var(--ds-shadow-${size})`,
              width: `${64 + i * 16}px`,
              height: `${64 + i * 16}px`,
            }}
          />
          <code className="token-badge">--ds-shadow-{size}</code>
        </div>
      ))}
    </div>
  );
}

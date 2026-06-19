import { spacings } from './tokens';

export default function SizesSection() {
  return (
    <div className="size-scale">
      {spacings.map((size) => (
        <div key={size} className="size-row">
          <span className="size-number">{size}</span>
          <div className="size-bar-track">
            {size === '0' ? (
              <div className="size-bar-zero" />
            ) : (
              <div
                className="size-bar"
                style={{ width: `var(--ds-size-${size})` }}
              />
            )}
          </div>
          <code className="token-badge">--ds-size-{size}</code>
        </div>
      ))}
    </div>
  );
}

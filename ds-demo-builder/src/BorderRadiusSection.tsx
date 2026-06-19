import { borderRadiusSizes } from './tokens';

export default function BorderRadiusSection() {
  return (
    <div className="radius-gallery">
      {borderRadiusSizes.map((size) => (
        <div key={size} className="radius-card">
          <div
            className="radius-shape"
            style={{ borderRadius: `var(--ds-border-radius-${size})` }}
          />
          <div className="radius-label">
            <span className="radius-size">{size}</span>
            <code className="token-badge">--ds-border-radius-{size}</code>
          </div>
        </div>
      ))}
    </div>
  );
}

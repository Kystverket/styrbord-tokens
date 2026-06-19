import { fontVariants, fontSizes } from './tokens';

export default function TypographySection() {
  return (
    <>
      {fontVariants.map(([name, sizes]) => (
        <div key={name}>
          {sizes.map((size) => (
            <div
              key={size}
              style={{
                fontSize: `var(--ds-${name}-${size}-font-size)`,
                fontWeight: `var(--ds-${name}-${size}-font-weight)`,
                letterSpacing: `var(--ds-${name}-${size}-letter-spacing)`,
                lineHeight: `var(--ds-${name}-${size}-line-height)`,
              }}
            >
              {name} {size}
            </div>
          ))}
        </div>
      ))}

      <table>
        <tbody>
          <tr>
            <th>data-size=[md]</th>
            <th>data-size=[sm]</th>
            <th>data-size=[lg]</th>
          </tr>
          {fontSizes.map((n) => (
            <tr key={n}>
              <td
                style={{
                  fontSize: `var(--ds-font-size-${n})`,
                  fontWeight: `var(--ds-font-weight-${n})`,
                  letterSpacing: `var(--ds-letter-spacing-${n})`,
                  lineHeight: `var(--ds-line-height-${n})`,
                }}
              >
                font size {n}
              </td>
              <td
                data-size="sm"
                style={{
                  fontSize: `var(--ds-font-size-${n})`,
                  fontWeight: `var(--ds-font-weight-${n})`,
                  letterSpacing: `var(--ds-letter-spacing-${n})`,
                  lineHeight: `var(--ds-line-height-${n})`,
                }}
              >
                font size {n}
              </td>
              <td
                data-size="lg"
                style={{
                  fontSize: `var(--ds-font-size-${n})`,
                  fontWeight: `var(--ds-font-weight-${n})`,
                  letterSpacing: `var(--ds-letter-spacing-${n})`,
                  lineHeight: `var(--ds-line-height-${n})`,
                }}
              >
                font size {n}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

import { colors, colorVariants } from './tokens';

export default function ColorSection() {
  return (
    <table
      style={{
        width: 'auto',
        borderCollapse: 'separate',
        borderSpacing: '5px',
      }}
    >
      <tbody>
        <tr>
          <th style={thStyle} />
          {colorVariants.map((variant) => (
            <th key={variant} style={thStyle}>
              {variant}
            </th>
          ))}
        </tr>
        {colors.map((color) => (
          <tr key={color}>
            <th style={thStyle}>{color}</th>
            {colorVariants.map((variant) => (
              <td
                key={variant}
                style={{
                  width: '96px',
                  height: '48px',
                  border: '1px solid #ccc',
                  textAlign: 'center',
                  backgroundColor: `var(--ds-color-${color}-${variant})`,
                }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle: React.CSSProperties = {
  width: '40px',
  height: '64px',
  fontWeight: 'normal',
  backgroundColor: '#eee',
  border: '1px solid #ddd',
  color: '#666',
  textAlign: 'center',
};

import { Fragment, useEffect, useState } from 'react';
import { colors } from './tokens';

const GROUPS = [
  {
    label: 'Bakgrunn',
    variants: [
      { key: 'background-default', abbr: 'standard' },
      { key: 'background-tinted', abbr: 'tonet' },
    ],
  },
  {
    label: 'Overflate',
    variants: [
      { key: 'surface-default', abbr: 'standard' },
      { key: 'surface-tinted', abbr: 'tonet' },
      { key: 'surface-hover', abbr: 'hover' },
      { key: 'surface-active', abbr: 'aktiv' },
    ],
  },
  {
    label: 'Kant',
    variants: [
      { key: 'border-subtle', abbr: 'subtil' },
      { key: 'border-default', abbr: 'standard' },
      { key: 'border-strong', abbr: 'sterk' },
    ],
  },
  {
    label: 'Tekst',
    variants: [
      { key: 'text-subtle', abbr: 'subtil' },
      { key: 'text-default', abbr: 'standard' },
    ],
  },
  {
    label: 'Base',
    variants: [
      { key: 'base-default', abbr: 'standard' },
      { key: 'base-hover', abbr: 'hover' },
      { key: 'base-active', abbr: 'aktiv' },
      { key: 'base-contrast-subtle', abbr: 'k·subtil' },
      { key: 'base-contrast-default', abbr: 'k·standard' },
    ],
  },
];

function parsedToHex(raw: string): string {
  const m = raw.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
  if (m) {
    return (
      '#' +
      [m[1], m[2], m[3]]
        .map((n) => parseInt(n).toString(16).padStart(2, '0'))
        .join('')
    );
  }
  if (raw.startsWith('#')) return raw;
  return '';
}

function hexContrastColor(hex: string): string {
  if (hex.length < 7) return 'rgba(0,0,0,0.5)';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.45 ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.8)';
}

function useColorHexMap(): Record<string, string> {
  const [hexMap, setHexMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const map: Record<string, string> = {};
    for (const color of colors) {
      for (const group of GROUPS) {
        for (const v of group.variants) {
          const token = `--ds-color-${color}-${v.key}`;
          const raw = style.getPropertyValue(token).trim();
          map[token] = parsedToHex(raw);
        }
      }
    }
    setHexMap(map);
  }, []);

  return hexMap;
}

export default function ColorSection() {
  const hexMap = useColorHexMap();

  return (
    <div className="color-table-scroll">
      <table className="color-table">
        <thead>
          <tr>
            <th className="color-th-corner" />
            {GROUPS.map((group, gi) => (
              <Fragment key={group.label}>
                {gi > 0 && <th className="color-th-group-spacer" />}
                <th
                  colSpan={group.variants.length}
                  className="color-th-group color-th-group-cell"
                >
                  {group.label}
                </th>
              </Fragment>
            ))}
          </tr>
          <tr>
            <th className="color-th-corner" />
            {GROUPS.map((group, gi) => (
              <Fragment key={group.label}>
                {gi > 0 && <th className="color-th-spacer-row" />}
                {group.variants.map((v) => (
                  <th key={v.key} className="color-th-variant">
                    {v.abbr}
                  </th>
                ))}
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {colors.map((color) => (
            <tr key={color}>
              <td className="color-td-name">{color}</td>
              {GROUPS.map((group, gi) => (
                <Fragment key={group.label}>
                  {gi > 0 && <td className="color-td-gap" />}
                  {group.variants.map((v, vi) => {
                    const token = `--ds-color-${color}-${v.key}`;
                    const hex = hexMap[token] ?? '';
                    const textColor = hex ? hexContrastColor(hex) : 'transparent';
                    return (
                      <td
                        key={v.key}
                        className={`color-td-swatch${vi === 0 ? ' group-start' : ''}`}
                      >
                        <div
                          className="color-swatch-box"
                          style={{ backgroundColor: `var(--ds-color-${color}-${v.key})` }}
                          title={`${token}\n${hex}`}
                        >
                          {hex && (
                            <span className="swatch-hex" style={{ color: textColor }}>
                              {hex}
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

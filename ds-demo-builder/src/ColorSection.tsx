import { useEffect, useState } from 'react';
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
    return '#' + [m[1], m[2], m[3]].map((n) => parseInt(n).toString(16).padStart(2, '0')).join('');
  }
  if (raw.startsWith('#')) return raw;
  return '';
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
    <div className="color-list">
      {colors.map((color) => (
        <div key={color} className="color-list-color">
          <h3 className="color-list-color-heading">{color}</h3>
          {GROUPS.map((group) => (
            <div key={group.label} className="color-list-group">
              <span className="color-list-group-label">{group.label}</span>
              <div className="color-list-variants">
                {group.variants.map((v) => {
                  const token = `--ds-color-${color}-${v.key}`;
                  const hex = hexMap[token] ?? '';
                  return (
                    <div key={v.key} className="color-list-item">
                      <div
                        className="color-list-swatch"
                        style={{ backgroundColor: `var(${token})` }}
                      />
                      <div className="color-list-meta">
                        <span className="color-list-token">{token}</span>
                        {hex && <span className="color-list-hex">{hex}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

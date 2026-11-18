import { Fragment, useEffect, useState } from 'react';
import { parsedToHex, useCopyFeedback } from './colorUtils';

const GROUPS = [
  {
    label: 'background',
    variants: [
      { key: 'background-default', abbr: 'default' },
      { key: 'background-tinted', abbr: 'tinted' },
    ],
  },
  {
    label: 'surface',
    variants: [
      { key: 'surface-default', abbr: 'default' },
      { key: 'surface-tinted', abbr: 'tinted' },
      { key: 'surface-hover', abbr: 'hover' },
      { key: 'surface-active', abbr: 'active' },
    ],
  },
  {
    label: 'border',
    variants: [
      { key: 'border-subtle', abbr: 'subtle' },
      { key: 'border-default', abbr: 'default' },
      { key: 'border-strong', abbr: 'strong' },
    ],
  },
  {
    label: 'text',
    variants: [
      { key: 'text-subtle', abbr: 'subtle' },
      { key: 'text-default', abbr: 'default' },
    ],
  },
  {
    label: 'base',
    variants: [
      { key: 'base-default', abbr: 'default' },
      { key: 'base-hover', abbr: 'hover' },
      { key: 'base-active', abbr: 'active' },
      { key: 'base-contrast-subtle', abbr: 'contrast-subtle' },
      { key: 'base-contrast-default', abbr: 'contrast-default' },
    ],
  },
];

function hexContrastColor(hex: string): string {
  if (hex.length < 7) return 'rgba(0,0,0,0.5)';
  // 8-digit hex (#rrggbbaa): composite over white so translucent tokens
  // (border-subtle, background-tinted in light mode) get a readable label.
  const a = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;
  const over = (c: number) => c * a + 255 * (1 - a);
  const r = over(parseInt(hex.slice(1, 3), 16));
  const g = over(parseInt(hex.slice(3, 5), 16));
  const b = over(parseInt(hex.slice(5, 7), 16));
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.45 ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.8)';
}

function useColorHexMap(palettes: readonly string[]): Record<string, string> {
  const [hexMap, setHexMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const map: Record<string, string> = {};
    for (const color of palettes) {
      for (const group of GROUPS) {
        for (const v of group.variants) {
          const token = `--ds-color-${color}-${v.key}`;
          const raw = style.getPropertyValue(token).trim();
          map[token] = parsedToHex(raw);
        }
      }
    }
    setHexMap(map);
  }, [palettes]);

  return hexMap;
}

/** Table of all 16 variants for each of the given palettes (e.g. semantic roles or brand palettes). */
export default function ColorSection({ palettes }: { palettes: readonly string[] }) {
  const hexMap = useColorHexMap(palettes);
  const { copied, copy } = useCopyFeedback();

  return (
    <div className="color-table-scroll">
      <table className="color-table">
        <thead>
          <tr>
            <th className="color-th-corner" />
            {GROUPS.map((group, gi) => (
              <Fragment key={group.label}>
                {gi > 0 && <th className="color-th-group-spacer" />}
                <th colSpan={group.variants.length} className="color-th-group color-th-group-cell">
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
          {palettes.map((color) => (
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
                      <td key={v.key} className={`color-td-swatch${vi === 0 ? ' group-start' : ''}`}>
                        <div
                          className="color-swatch-box"
                          style={{ backgroundColor: `var(--ds-color-${color}-${v.key})`, cursor: 'pointer' }}
                          title={`Click to copy: ${token}`}
                          onClick={(e) => { e.stopPropagation(); copy(token); }}
                        >
                          {hex && (
                            <span
                              className="swatch-hex"
                              style={{ color: textColor, cursor: 'pointer' }}
                              title={`Click to copy: ${hex}`}
                              onClick={(e) => { e.stopPropagation(); copy(hex); }}
                            >
                              {copied === token ? '✓ var' : copied === hex ? '✓ hex' : hex}
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

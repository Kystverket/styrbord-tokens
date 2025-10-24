import fs from 'fs';
import { globSync as glob } from 'glob';

const css = fs.readFileSync('dist/kystverket.css', 'utf-8');
const htmlTemplate = fs.readFileSync('ds-demo-builder/template.html', 'utf-8');

const colors = ['primary', 'accent', 'extra1', 'extra2', 'neutral', 'info', 'success', 'warning', 'danger'];
const colorVariants = [
  'background-default',
  'background-tinted',
  'surface-default',
  'surface-tinted',
  'surface-hover',
  'surface-active',
  'border-subtle',
  'border-default',
  'border-strong',
  'text-subtle',
  'text-default',
  'base-default',
  'base-hover',
  'base-active',
  'base-contrast-subtle',
  'base-contrast-default',
];

function htmlColorHeadersRow(colorVariants: string[]): string {
  return `<tr className="color-strip">
    <th></th>
    ${colorVariants.map((variant) => `<th>${variant}</th>`).join('')}
  </tr>`;
}

function htmlColorStripRow(colorName: string, colorVariants: string[]): string {
  return `<tr className="color-strip">
    <th>${colorName}</th>
    ${colorVariants
      .map((variant) => `<td style="background-color: var(--ds-color-${colorName}-${variant});"></td>`)
      .join('')}
  </tr>`;
}

const fontVariants: [string, string[]][] = [
  ['body', ['xs', 'sm', 'md', 'lg', 'xl']],
  ['body-short', ['xs', 'sm', 'md', 'lg', 'xl']],
  ['body-long', ['xs', 'sm', 'md', 'lg', 'xl']],
  ['heading', ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']],
];

function htmlFontRow(name: string, sizes: string[]): string {
  return `<div>
      ${sizes
        .map(
          (size) =>
            `<div style="font-size: var(--ds-${name}-${size}-font-size);font-weight: var(--ds-${name}-${size}-font-weight);letter-spacing: var(--ds-${name}-${size}-letter-spacing);line-height: var(--ds-${name}-${size}-line-height);">${name} ${size}</div>`,
        )
        .join('')}
    </div>`;
}

const borderRadiusSizes: string[] = ['sm', 'md', 'lg', 'xl', 'default', 'full'];

function htmlBorderRadiusRow(name: string, sizes: string[]): string {
  return `<div style="display: flex; flex-direction: column; gap: 10px;">
      ${sizes
        .map(
          (size) =>
            `<div style="background-color: var(--ds-color-extra1-surface-hover); display: flex; align-items: center; justify-content: center; width: 300px; height: 100px; border-radius: var(--ds-border-radius-${size});">--ds-border-radius-${size}</div>`,
        )
        .join('')}
    </div>`;
}

const spacings: string[] = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '18',
  '22',
  '26',
  '30',
];

function spacingBoxes(): string {
  return `<div style="display: flex; flex-direction: column; gap: 32px;">
      ${spacings
        .map(
          (size) =>
            '<div>' +
            `<div style="background-color: var(--ds-color-extra2-surface-hover); display: block;  width: var(--ds-size-${size}); height: var(--ds-size-${size});"></div>` +
            `--ds-size-${size}` +
            '</div>',
        )
        .join('')}
    </div>`;
}

const replacements: Record<string, string> = {
  '/*STYLE*/': css,
  '<!-- COLOR ROWS -->':
    htmlColorHeadersRow(colorVariants) + colors.map((color) => htmlColorStripRow(color, colorVariants)).join('\n'),
  '<!-- FONT SIZES -->': fontVariants.map((fontVariant) => htmlFontRow(fontVariant[0], fontVariant[1])).join('\n'),
  '<!-- BORDER RADIUS -->': htmlBorderRadiusRow('border-radius', borderRadiusSizes),
  '<!-- SIZES -->': spacingBoxes(),
};

// Generate HTML file based on the ColorMap objects
fs.mkdirSync('static', { recursive: true });
fs.writeFileSync(
  'static/index.html',
  Object.entries(replacements).reduce((previousValue, [key, value]) => {
    return previousValue.replace(key, value);
  }, htmlTemplate),
  'utf-8',
);

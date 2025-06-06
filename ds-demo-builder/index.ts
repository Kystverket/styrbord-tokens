import fs from 'fs';
import { globSync as glob } from 'glob';

const css = fs.readFileSync('dist/kystverket.css', 'utf-8');
const htmlTemplate = fs.readFileSync('ds-demo-builder/template.html', 'utf-8');

const colors = ['primary', 'accent', 'extra1', 'neutral', 'info', 'success', 'warning', 'danger'];
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

function htmlColorStripRow(colorName, colorVariants: string[]): string {
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

const replacements: Record<string, string> = {
  '/*STYLE*/': css,
  '<!-- COLOR ROWS -->':
    htmlColorHeadersRow(colorVariants) + colors.map((color) => htmlColorStripRow(color, colorVariants)).join('\n'),
  '<!-- FONT SIZES -->': fontVariants.map((fontVariant) => htmlFontRow(fontVariant[0], fontVariant[1])).join('\n'),
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

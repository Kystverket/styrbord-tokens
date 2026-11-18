export const semanticColors = [
  'primary',
  'accent',
  'extra1',
  'extra2',
  'neutral',
  'info',
  'success',
  'warning',
  'danger',
];

export const colors = ['dyphav', 'hav', 'himmel', 'stein', 'sand', 'sol', 'fyr', 'gress', 'skog', 'lyng'];

export const colorVariants = [
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

export const fontVariants: [string, string[]][] = [
  ['body', ['xs', 'sm', 'md', 'lg', 'xl']],
  ['body-short', ['xs', 'sm', 'md', 'lg', 'xl']],
  ['body-long', ['xs', 'sm', 'md', 'lg', 'xl']],
  ['heading', ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']],
];

export const fontSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const borderRadiusSizes = ['sm', 'md', 'lg', 'xl', 'default', 'full'];

export const spacings = [
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

export const shadowSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const borderWidths = ['default', 'focus'] as const;

export const focusColors = ['inner', 'outer'] as const;

/**
 * Profile colours from the brand guidelines (`--ds-color-<role>-<slot>`),
 * each paired with `--ds-color-<role>-<slot>-contrast`. Same in light and dark mode.
 */
export const brandColors = [
  { role: 'primary', slot: 'brand', name: 'Mørk blå' },
  { role: 'primary', slot: 'brand-secondary', name: 'Lys blå' },
  { role: 'primary', slot: 'brand-background', name: 'Sand' },
  { role: 'accent', slot: 'brand', name: 'Rødoransje' },
  { role: 'extra1', slot: 'brand', name: 'Grønn' },
  { role: 'extra1', slot: 'brand-secondary', name: 'Lys grønn' },
  { role: 'extra2', slot: 'brand', name: 'Mellomblå' },
  { role: 'sol', slot: 'brand', name: 'Gul' },
  { role: 'lyng', slot: 'brand', name: 'Lyng' },
  { role: 'neutral', slot: 'brand', name: 'Grå' },
] as const;

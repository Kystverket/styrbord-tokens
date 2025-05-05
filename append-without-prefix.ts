import fs from 'fs';

const inputFiles = ['dist/kystverket.css'];
const spacingCss = fs.readFileSync('spacing.css', 'utf-8');

const mainFn = async (inputFile) => {
  const css = fs.readFileSync(inputFile, 'utf-8');
  const outLines: string[] = [];

  css.split('\n').forEach((line) => {
    outLines.push(line);
    if (line.includes('--ds-')) {
      const newLine = line.replaceAll('--ds-', '--');
      outLines.push(newLine);
    }
  });

  outLines.push(spacingCss);

  fs.writeFileSync(inputFile, outLines.join('\n'), 'utf-8');
};

inputFiles.forEach((inputFile) => {
  mainFn(inputFile);
});

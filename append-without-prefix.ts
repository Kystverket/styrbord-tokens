import fs from 'fs';

const inputFile = 'dist/kystverket.css';

const mainFn = async () => {
  const css = fs.readFileSync(inputFile, 'utf-8');

  const css2 = css
    .split('\n')
    .filter((line) => {
      if (line.includes('@charset')) {
        return false;
      }
      if (line.includes('@layer') && line.includes(';')) {
        return false;
      }
      return true;
    })
    .map((line) => line.replaceAll('--ds-', '--'))
    .join('\n');

  fs.writeFileSync(inputFile, css + '\n\n\n\n' + css2, 'utf-8');
};

mainFn();

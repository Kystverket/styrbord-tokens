import { glob } from 'glob';
import fs from 'fs';

const outputFolder = 'design-tokens-out';
const inputFile = 'tokens.json';

const mainFn = async () => {
  const superFile = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

  Object.keys(superFile).forEach((key) => {
    const fileContent = superFile[key];
    const filePath = key.split('/').slice(0, -1).join('/');
    const fileName = key.split('/').slice(-1)[0];
    const file = `${outputFolder}/${filePath}/${fileName}.json`;
    const folder = `${outputFolder}/${filePath}`;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    fs.writeFileSync(file, JSON.stringify(fileContent, null, 2), 'utf-8');
    console.log(`File ${file} created`);
  });
};

mainFn();

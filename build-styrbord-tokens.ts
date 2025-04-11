import fs from 'node:fs';
import StyleDictionary, { type Config } from 'style-dictionary';

import { logBrokenReferenceLevels, logVerbosityLevels, logWarningLevels } from 'style-dictionary/enums';

const rawTokens = await import('./tokens.json');
const brands = ['theme-etat1'];
const dir = './temp';
let fileLocation: string;

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const typographyRenames = [
  ['fontfamily', 'font-family'],
  ['fontweight', 'font-weight'],
  ['lineheight', 'line-height'],
  ['fontsize', 'font-size'],
  ['letterspacing', 'letter-spacing'],
  ['paragraphspacing', 'paragraph-spacing'],
  ['paragraphindent', 'paragraph-indent'],
  ['textcase', 'text-case'],
  ['textdecoration', 'text-decoration'],
];

// --typography-heading-2xl-fontfamily: museo-sans;
// --typography-heading-2xl-fontweight: 500;
// --typography-heading-2xl-lineheight: 130%;
// --typography-heading-2xl-fontsize: 60;
// --typography-heading-2xl-letter-spacing: -1%;
// --typography-heading-2xl-paragraphspacing: 0;
// --typography-heading-2xl-paragraphindent: 0rem;
// --typography-heading-2xl-textcase: none;
// --typography-heading-2xl-textdecoration: none;

//Make everything lowercase to avoid wrong transforms
const tokens = JSON.parse(JSON.stringify(rawTokens).toLocaleLowerCase());

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const excludeSource = (token) => !token.filePath.includes('mode-light.json');

function processItem(key): Promise<boolean> {
  const brand = key.replace(/(['"/ ])/g, '-');
  const token = JSON.stringify(tokens[key], null, 2).replace('\"font-size\"', '\"fontsize\"');
  fileLocation = `${dir}/${brand}.json`;
  return new Promise((resolve, reject) => {
    fs.writeFile(fileLocation, token, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        // brands.push(brand)
        resolve(true);
      }
    });
  });
}

async function writeFiles() {
  for (const key in tokens) {
    if (!key.includes('$')) {
      console.log(`Outputting to temp: ${key}`);
      await processItem(key);
    }
  }
}

function getStyleDictionaryConfig(brand: string): Config {
  const source = [
    // `${dir}/default.json`,
    `${dir}/global.json`,
    `${dir}/color-scheme-light.json`,
    // `${dir}/color-scheme-dark.json`,
    `${dir}/size-small.json`,
    // `${dir}/size-medium.json`,
    // `${dir}/size-large.json`,
    `${dir}/main-color-primary.json`,
    // `${dir}/main-color-accent.json`,
    `${dir}/semantic-semantic.json`,
    // `${dir}/support-color-extra1.json`,
    // `${dir}/support-color-extra2.json`,
    `${dir}/typography-primary.json`,
    // `${dir}/typography-secondary.json`,
  ];

  return {
    include: [
      // "input/mode-dark.json",
      `${dir}/${brand}.json`,
    ],
    source,
    platforms: {
      web: {
        expand: {
          include: ['typography'],
          // more info about typesMap later...
          typesMap: {
            // all width props are mapped to 'dimension' type
            width: 'dimension',
            typography: {
              // fontSize prop is mapped to 'dimension' type if inside a typography composite type token
              fontSize: 'dimension',
            },
          },
        },
        transformGroup: 'ssnn',
        buildPath: `dist/`,
        files: [
          {
            destination: `${brand.replace('theme-etat1', 'style-tokens')}.css`,
            format: 'css/variables',
            // selector: `.${brand}-theme`,
            // Exclude the source file, so that we avoid having styles for every brand in every file.
            filter: excludeSource,
          },
        ],
      },
    },
    log: {
      warnings: logWarningLevels.warn, // 'warn' | 'error' | 'disabled'
      verbosity: logVerbosityLevels.verbose, // 'default' | 'silent' | 'verbose'
      errors: {
        brokenReferences: logBrokenReferenceLevels.throw, // 'throw' | 'console'
      },
    },
    hooks: {
      transforms: {
        'name/cti/kebab': {
          type: 'name',
          transform: (token) => {
            return (
              token.path
                //.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                .join('-')
                .replaceAll(',', '-')
                .replaceAll(' ', '-')
                .toLowerCase()
            );
          },
        },
        'value/cti/kebab': {
          type: 'value',
          transform: (token) => {
            if (token.path.includes('font-family')) {
              return token.value.replace(' ', '-').toLowerCase();
            }
          },
        },
        'size/px': {
          type: 'value',
          transform: (token) => {
            const val = Number.parseFloat(token.value);
            // if (isNaN(val)) throwSizeError(token.name, token.value, 'rem');
            return `${val}rem`;
          },
        },
        shadows: {
          type: 'value',
          filter: (token) => token.path.includes('shadows') || token.path.includes('shadow'),
          transform: (token) => {
            return token.value
              .map((shadow) => `drop-shadow(${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.color})`)
              .join(' ');
          },
        },
        renametypo: {
          type: 'name',
          filter: (token) => typographyRenames.some((r) => token.path.includes(r[0])),
          transform: (token) => {
            console.log('token', token);
            return typographyRenames.reduce(
              (prev, arrval) => {
                return prev.replace(arrval[0], arrval[1]);
              },
              token.name.replace('typography-', ''),
            );
          },
        },
        fontsize: {
          type: 'value',
          filter: (token) => token.path.includes('fontsize'),
          transform: (token) => {
            return token.value.includes('rem') || token.value.includes('px') ? token.value : `${token.value}px`;
          },
        },
      },
    },
  };
}

writeFiles().then(async () => {
  console.log('Build started...');

  // PROCESS THE DESIGN TOKENS FOR THE DIFFERENT BRANDS AND PLATFORMS

  brands.map(async (brand) => {
    console.log('\n==============================================');
    console.log(`\nProcessing: [${brand}]`);
    const sd = new StyleDictionary(getStyleDictionaryConfig(brand));
    sd.registerTransform({
      name: 'value/fontName',
      type: 'value',
      filter: (token) => {
        return token.value === 'museo sans';
      },
      transform: (token) => {
        return token.original.value.replace(' ', '-').toLowerCase();
      },
    });
    sd.registerTransform({
      name: 'opacity',
      type: 'value',
      filter: (token) => {
        return token.path.includes('opacity');
      },
      transform: (token) => {
        // Figma turns the opacity value into px, and then to rem. 1rem = 16px
        return (Number.parseFloat(token.original.value) * 16) / 100;
      },
    });
    sd.registerTransformGroup({
      name: 'ssnn',
      transforms: [
        'attribute/cti',
        'name/kebab',
        'size/px',
        'color/css',
        'value/fontName',
        'opacity',
        'shadows',
        'renametypo',
        'fontsize',
        // 'typography/css/shorthand',
      ],
    });

    await sd.buildPlatform('web');

    console.log('\nEnd processing');
  });

  console.log('\n==============================================');
  console.log('\nBuild completed!');
});

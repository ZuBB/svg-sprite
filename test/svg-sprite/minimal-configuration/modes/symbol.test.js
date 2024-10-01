'use strict';

import SVGSpriter from '../../../../lib/svg-sprite.mjs';
import { addFixtureFiles } from '../../../helpers/add-files.mjs';
import { paths } from '../../../helpers/constants.mjs';
import writeFiles from '../../../helpers/write-files.mjs';
import writeFile from '../../../helpers/write-file.mjs';
import { constants } from '../../../helpers/test-configs.mjs';
import removeTmpPath from '../../../helpers/remove-temp-path.mjs';
const path = require('node:path');
const { readFile } = require('node:fs/promises');
const mustache = require('mustache');

describe.each`
        name          | testConfigKey
        ${'default'}  | ${'DEFAULT'}
        ${'w/o dims'} | ${'WITHOUT_DIMS'}
`('svg-sprite: $name: «symbol» mode', ({ testConfigKey }) => {
  const testConfig = constants[testConfigKey];

  const tmpPath = path.join(paths.tmp, `symbol${testConfig.namespace}`);

  let svg;
  let spriter;
  let data;

  beforeAll(async() => {
    await removeTmpPath(tmpPath);
    data = {};

    spriter = new SVGSpriter({ dest: tmpPath });
    addFixtureFiles(spriter, testConfig.files, testConfig.cwd);
    const { result, data: cssData } = await spriter.compileAsync({
      symbol: {
        sprite: `svg/symbol${testConfig.namespace}.svg`, render: {
          css: true
        }
      }
    });
    writeFiles(result);
    data = cssData.symbol;
    svg = path.basename(result.symbol.sprite.path);
  });

  it('creates a visually correct stylesheet resource in CSS format', async() => {
    expect.hasAssertions();

    data.svg = await readFile(path.join(tmpPath, 'symbol/svg', svg), 'utf8');
    data.css = '../sprite.css';

    expect(data.svg).toMatchSnapshot();

    const previewTemplate = await readFile(path.join(__dirname, '../../../tmpl/symbol.html'), 'utf8');
    const out = mustache.render(previewTemplate, data);
    const preview = await writeFile(path.join(tmpPath, 'symbol/html/symbol.html'), out);
    const expected = path.join(paths.expectations, `png/symbol.html${testConfig.namespace}.png`);

    await expect(preview).toBeVisuallyCorrectAsHTMLTo(expected);
  });
});

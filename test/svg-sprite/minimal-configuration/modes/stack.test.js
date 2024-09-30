'use strict';

import SVGSpriter from '../../../../lib/svg-sprite.mjs';
import { addFixtureFiles } from '../../../helpers/add-files.mjs';
import { paths } from '../../../helpers/constants.mjs';
import writeFiles from '../../../helpers/write-files.mjs';
import writeFile from '../../../helpers/write-file.mjs';
import { constants } from '../../../helpers/test-configs.mjs';
const path = require('node:path');
const { readFile } = require('node:fs/promises');
const mustache = require('mustache');
const removeTmpPath = require('../../../helpers/remove-temp-path.js');

describe.each`
        name          | testConfigKey
        ${'default'}  | ${'DEFAULT'}
        ${'w/o dims'} | ${'WITHOUT_DIMS'}
`('svg-sprite: $name: «stack» mode', ({ testConfigKey }) => {
  const testConfig = constants[testConfigKey];

  const tmpPath = path.join(paths.tmp, `stack${testConfig.namespace}`);

  let svg;
  let spriter;
  let data;

  beforeAll(async() => {
    await removeTmpPath(tmpPath);
    data = {};

    spriter = new SVGSpriter({ dest: tmpPath });
    addFixtureFiles(spriter, testConfig.files, testConfig.cwd);
    const { result, data: cssData } = await spriter.compileAsync({
      stack: {
        sprite: `svg/stack${testConfig.namespace}.svg`, render: {
          css: true
        }
      }
    });
    writeFiles(result);
    data = cssData.stack;
    svg = path.basename(result.stack.sprite.path);
  });

  it('creates a visually correct stylesheet resource in CSS format', async() => {
    expect.hasAssertions();

    data.svg = await readFile(path.join(tmpPath, 'stack/svg', svg), 'utf8');
    data.css = '../sprite.css';

    expect(data.svg).toMatchSnapshot();

    const previewTemplate = await readFile(path.join(__dirname, '../../../tmpl/stack.html'), 'utf8');
    const out = mustache.render(previewTemplate, data);
    const preview = await writeFile(path.join(tmpPath, `stack/html/stack${testConfig.namespace}.html`), out);
    const expected = path.join(paths.expectations, `png/stack${testConfig.namespace}.html.png`);

    await expect(preview).toBeVisuallyCorrectAsHTMLTo(expected);
  });
});

describe('without viewbox', () => {
  const testConfig = constants.WITHOUT_DIMS;
  const tmpPath = path.join(paths.tmp, 'stack-without-viewbox');
  let svg;
  let spriter;
  let data;

  beforeAll(async() => {
    await removeTmpPath(tmpPath);
    data = {};

    spriter = new SVGSpriter({ dest: tmpPath });
    addFixtureFiles(spriter, testConfig.files, testConfig.cwd);
    const { result, data: cssData } = await spriter.compileAsync({
      stack: {
        sprite: `svg/stack${testConfig.namespace}.svg`, render: {
          css: true
        },
        rootviewbox: false
      }
    });
    writeFiles(result);
    data = cssData.stack;
    svg = path.basename(result.stack.sprite.path);
  });

  it('creates a visually correct stylesheet resource in CSS format', async() => {
    expect.hasAssertions();

    data.svg = await readFile(path.join(tmpPath, 'stack/svg', svg), 'utf8');
    data.css = '../sprite.css';

    expect(data.svg).toMatchSnapshot();

    const previewTemplate = await readFile(path.join(__dirname, '../../../tmpl/stack.html'), 'utf8');
    const out = mustache.render(previewTemplate, data);
    const preview = await writeFile(path.join(tmpPath, 'stack/html/stack-without-viewbox.html'), out);
    const expected = path.join(paths.expectations, 'png/stack-without-viewbox.html.png');

    await expect(preview).toBeVisuallyCorrectAsHTMLTo(expected);
  });
});

import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import mustache from 'mustache';
import * as sass from 'sass';
import glob from 'glob';
import SVGSpriter from '../../../lib/svg-sprite.mjs';
import { addFixtureFiles } from '../../helpers/add-files.mjs';
import writeFiles from '../../helpers/write-files.mjs';
import writeFile from '../../helpers/write-file.mjs';
import removeTmpPath from '../../helpers/remove-temp-path.mjs';
import { less } from '../../helpers/async-renderers.mjs';
import { paths } from '../../helpers/constants.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cwdAlign = path.join(paths.fixtures, 'svg/css');
const align = glob.sync('**/*.svg', { cwd: cwdAlign });
const previewTemplate = fs.readFileSync(path.join(__dirname, '../../tmpl/css.html'), 'utf8');

const tmpPath = path.join(paths.tmp, 'center');

describe(`svg-sprite: with centered alignment and ${align.length} SVG files`, () => {
  beforeAll(removeTmpPath.bind(null, tmpPath));

  describe('with «css» mode, vertical layout and CSS render type', () => {
    let spriter = null;
    let data = null;
    let svgPath = null;

    beforeAll(async() => {
      spriter = new SVGSpriter({
        dest: tmpPath,
        shape: {
          align: path.join(paths.fixtures, 'yaml/align.centered.yaml'),
          dimension: {
            maxWidth: 200,
            maxHeight: 200
          }
        }
      });
      addFixtureFiles(spriter, align, cwdAlign);
      const { result, data: cssData } = await spriter.compileAsync({
        css: {
          sprite: 'svg/css.vertical.centered.svg',
          layout: 'vertical',
          dimensions: true,
          render: {
            css: {
              dest: 'sprite.centered.css'
            }
          }
        }
      });
      writeFiles(result);
      data = cssData.css;
      svgPath = path.basename(result.css.sprite.path);
    });

    it('creates visually correct sprite', async() => {
      expect.hasAssertions();

      const input = path.join(tmpPath, 'css/svg', svgPath);
      const actual = fs.readFileSync(input, 'utf8');
      const expected = path.join(paths.expectations, 'png/css.vertical.centered.png');

      expect(actual).toMatchSnapshot();
      await expect(input).toBeVisuallyEqualTo(expected);
    });

    it('creates a visually correct stylesheet resource', async() => {
      expect.hasAssertions();

      data.css = '../sprite.centered.css';

      const out = mustache.render(previewTemplate, data);
      const preview = await writeFile(path.join(tmpPath, 'css/html/css.vertical.centered.html'), out);

      const expected = path.join(paths.expectations, 'png/css.vertical.centered.html.png');

      await expect(preview).toBeVisuallyCorrectAsHTMLTo(expected);
    });
  });

  describe('with «css» mode, horizontal layout and Sass render type', () => {
    let spriter = null;
    let data = null;
    let svgPath = null;

    beforeAll(async() => {
      spriter = new SVGSpriter({
        dest: tmpPath,
        shape: {
          align: path.join(paths.fixtures, 'yaml/align.centered.yaml'),
          dimension: {
            maxWidth: 200,
            maxHeight: 200
          }
        }
      });
      addFixtureFiles(spriter, align, cwdAlign);
      const { result, data: cssData } = await spriter.compileAsync({
        css: {
          sprite: 'svg/css.horizontal.centered.svg',
          layout: 'horizontal',
          dimensions: true,
          render: {
            scss: {
              dest: 'sprite.centered.scss'
            }
          }
        }
      });
      data = cssData.css;
      writeFiles(result.css);
      svgPath = path.basename(result.css.sprite.path);
    });

    it('creates visually correct sprite', async() => {
      expect.hasAssertions();

      const input = path.join(tmpPath, 'css/svg', svgPath);
      const actual = fs.readFileSync(input, 'utf8');
      const expected = path.join(paths.expectations, 'png/css.horizontal.centered.png');

      expect(actual).toMatchSnapshot();
      await expect(input).toBeVisuallyEqualTo(expected);
    });

    it('creates a visually correct stylesheet resource', async() => {
      expect.hasAssertions();

      const scssText = sass.renderSync({ file: path.join(tmpPath, 'css/sprite.centered.scss') });

      await writeFile(path.join(tmpPath, 'css/sprite.centered.scss.css'), scssText.css);

      data.css = '../sprite.centered.scss.css';

      const out = mustache.render(previewTemplate, data);
      const preview = await writeFile(path.join(tmpPath, 'css/html/scss.horizontal.centered.html'), out);
      const expected = path.join(paths.expectations, 'png/css.horizontal.centered.html.png');

      await expect(preview).toBeVisuallyCorrectAsHTMLTo(expected);
    });
  });

  describe('with «css» mode, packed layout and LESS render type', () => {
    let spriter = null;
    let data = null;
    let svgPath = null;

    beforeAll(async() => {
      spriter = new SVGSpriter({
        dest: tmpPath,
        shape: {
          align: path.join(paths.fixtures, 'yaml/align.centered.yaml'),
          dimension: {
            maxWidth: 200,
            maxHeight: 200
          }
        }
      });
      addFixtureFiles(spriter, align, cwdAlign);
      const { result, data: cssData } = await spriter.compileAsync({
        css: {
          sprite: 'svg/css.packed.centered.svg',
          layout: 'packed',
          dimensions: true,
          render: {
            less: {
              dest: 'sprite.centered.less'
            }
          }
        }
      });
      writeFiles(result);
      data = cssData.css;
      svgPath = path.basename(result.css.sprite.path);
    });

    it('creates visually correct sprite', async() => {
      expect.hasAssertions();

      const input = path.join(tmpPath, 'css/svg', svgPath);
      const actual = fs.readFileSync(input, 'utf8');
      const expected = path.join(paths.expectations, 'png/css.packed.centered.png');

      expect(actual).toMatchSnapshot();
      await expect(input).toBeVisuallyEqualTo(expected);
    });

    it('creates a visually correct stylesheet resource', async() => {
      expect.hasAssertions();

      const lessFile = path.join(tmpPath, 'css/sprite.centered.less');
      const lessText = fs.readFileSync(lessFile, 'utf8');
      const output = await less(lessText, {});

      await writeFile(path.join(tmpPath, 'css/sprite.centered.less.css'), output.css);

      data.css = '../sprite.centered.less.css';

      const out = mustache.render(previewTemplate, data);
      const preview = await writeFile(path.join(tmpPath, 'css/html/less.packed.centered.html'), out);
      const expected = path.join(paths.expectations, 'png/css.packed.aligned.html.png');

      await expect(preview).toBeVisuallyCorrectAsHTMLTo(expected);
    });
  });
});
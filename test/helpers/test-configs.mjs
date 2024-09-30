import path from 'node:path';
import glob from 'glob';
import { paths } from './constants.mjs';

const cwdWeather = path.join(paths.fixtures, 'svg/single');
const cwdWithoutDims = path.join(paths.fixtures, 'svg/special/without-dims');
const weather = glob.sync('**/weather*.svg', { cwd: cwdWeather });
const withoutDims = glob.sync('**/*.svg', { cwd: cwdWithoutDims });

const constants = {
  DEFAULT: {
    name: 'weather',
    namespace: '',
    files: weather,
    cwd: cwdWeather
  },
  WITHOUT_DIMS: {
    name: 'without-dims',
    namespace: '-without-dims',
    files: withoutDims,
    cwd: cwdWithoutDims
  }

};

export { constants };

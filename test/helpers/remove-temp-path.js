'use strict';

import { paths } from './constants.mjs';
const { rm } = require('node:fs/promises');

/**
 * Removing tempPath for tests
 *
 * @param {string} pathName path
 * @returns {Promise<void>}
 */
module.exports = async(pathName = paths.tmp) => {
  await rm(pathName, { force: true, recursive: true });
};

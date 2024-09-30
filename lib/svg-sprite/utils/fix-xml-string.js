'use strict';

import { XmlFixingError } from '../errors.mjs';
const { DOMParser } = require('@xmldom/xmldom');

/**
 * @param {string} svgString    svg string to fix
 * @returns {string}            fixed svg string
 */
module.exports = svgString => {
  let domParserError = false;
  const errorHandler = () => {
    domParserError = true;
  };

  const fixedSVG = new DOMParser({ errorHandler })
    .parseFromString(svgString)
    .toString()
    .replaceAll(/(\s)(\s+)/g, ' ');

  if (!domParserError) {
    return fixedSVG;
  }

  throw new XmlFixingError('Invalid XML string');
};

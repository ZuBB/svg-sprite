import { DOMParser } from '@xmldom/xmldom';
import { XmlFixingError } from '../errors.mjs';

/**
 * @param {string} svgString    svg string to fix
 * @returns {string}            fixed svg string
 */
export default function fixXmlString(svgString) {
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
}

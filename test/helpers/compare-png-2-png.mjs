import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const MAX_MISMATCH = 5;

/**
 * @param {PNG} diff        diff PNG
 * @param {string} filePath where to store the diff
 */
const storeDiff = async(diff, filePath) => {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, PNG.sync.write(diff));
};

/**
 * @param {string} input                                                          input png
 * @param {string} expected                                                       expected png
 * @returns {Promise<{isEqual: boolean, matched: (number|*), diff: exports.PNG}>} matching results
 */
export default async function comparePngToPng(input, expected) {
  const inputPng = PNG.sync.read(await readFile(input));
  const expectedPng = PNG.sync.read(await readFile(expected));

  const { width, height } = inputPng;

  const diff = new PNG({ width, height });

  const matched = pixelmatch(
    inputPng.data,
    expectedPng.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  if (matched <= MAX_MISMATCH) {
    return { isEqual: true, matched, diff };
  }

  await storeDiff(
    diff,
    path.join(
      path.dirname(input),
      path.basename(input).replace('.png', '.diff.png')
    )
  );

  return { isEqual: false, matched, diff };
}

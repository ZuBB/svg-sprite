import os from 'node:os';

const THREADS = Math.max(os.cpus().length - 2, 2);
const jestConfig = {
  clearMocks: true,
  testEnvironment: 'jest-environment-node',
  maxConcurrency: THREADS,
  maxWorkers: THREADS,
  workerThreads: true,
  resetMocks: true,
  coverageProvider: 'v8',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'lib/**/*.mjs',
    '!**/node_modules/**'
  ],
  moduleFileExtensions: [
    'js',
    'mjs',
    'json'
  ],
  testMatch: [
    '**/*.test.mjs'
  ],
  // TODO
  testPathIgnorePatterns: [
    'node_modules/',

    // TODO
    'test/svg-sprite/config',
    'test/svg-sprite/minimal-configuration',
    'test/svg-sprite/mode',
    'test/svg-sprite/shape',
    'test/svg-sprite/special',
    'test/svg-sprite/transform',
    'test/svg-sprite/layouter.test.js',
    'test/svg-sprite/queue.test.js',
    'test/svg-sprite/sprite.test.js',
    'test/calculate-svg-dimensions.test.mjs',
    'test/fix-xml-string.test.mjs',
    'test/shape.test.mjs',
    'test/spriter.test.mjs',
    'test/svg-shape.test.mjs',
    'test/svg-sprite/alignment/mixed.test.mjs'
  ],
  transform: {},
  setupFilesAfterEnv: ['<rootDir>/test/jest/setup.mjs'],
  globalSetup: '<rootDir>/test/jest/setup.global.mjs',
  testTimeout: 20_000
};

export default jestConfig;

'use strict';

/* eslint-disable unicorn/new-for-builtins, no-new-wrappers, prefer-regex-literals */

const {
  isObject
} = require('../lib/svg-sprite/utils/index.js');

describe('utils', () => {
  describe('isObject', () => {
    it('should return true for an object', () => {
      expect(isObject({})).toBe(true);
    });

    it('should return true for a new String', () => {
      expect(isObject(new String(''))).toBe(true);
    });

    it('should return true for a new Regexp', () => {
      expect(isObject(new RegExp(''))).toBe(true);
    });

    it('should return true for a new Number', () => {
      expect(isObject(new Number(1))).toBe(true);
    });

    it('should return true for a new Boolean', () => {
      expect(isObject(new Boolean())).toBe(true);
    });

    it('should return true for an array (lodash backport)', () => {
      // todo: must return false
      expect(isObject([1, 2, 3])).toBe(true);
    });

    it('should return false for a Function constructor', () => {
      expect(isObject(Function)).toBe(false);
    });

    it('should return false for a null value', () => {
      expect(isObject(null)).toBe(false);
    });

    it('should return false for an undefined value', () => {
      expect(isObject(undefined)).toBe(false);
    });

    it('should return false for a string value', () => {
      expect(isObject('test')).toBe(false);
    });

    it('should return false for a boolean value', () => {
      expect(isObject(false)).toBe(false);
    });

    it('should return false for a function', () => {
      expect(isObject(() => {})).toBe(false);
    });

    it('should return false for a Symbol', () => {
      expect(isObject(Symbol('test'))).toBe(false);
    });
  });
});

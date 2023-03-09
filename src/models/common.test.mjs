import { describe, expect, test } from '@jest/globals';
import { validateEmail } from './common.mjs';

describe('validateEmail', () => {
  describe('valid email addresses', () => {
    test.each([
      ['test@example.com'],
      ['a@b.co'],
      ['john.doe@bbc.co.uk'],
      ['user+tag@gmail.com'],
    ])('%p => true', (email) => {
      expect(validateEmail(email)).toBe(true);
    });
  });

  describe('invalid email addresses', () => {
    test.each([
      [undefined],
      [null],
      [''],
      ['test@example'],
      ['example.com'],
      ['john.doe@'],
    ])('%p => false', (email) => {
      expect(validateEmail(email)).toBe(false);
    });
  });
});

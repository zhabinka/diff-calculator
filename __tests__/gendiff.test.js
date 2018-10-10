// @flow

import genDiff from '../src';
import fs from 'fs';
/*
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('null', () => {
  const n = undefined;
  expect(n).toBeUndefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
})
*/
test('diff configuration', () => {
  const before = JSON.parse(fs.readFileSync('./__tests__/__fixtures__/before.json'));
  const after = JSON.parse(fs.readFileSync('./__tests__/__fixtures__/after.json'));
  const result = fs.readFileSync('./__tests__/__fixtures__/result.txt', 'utf-8');
  expect(genDiff(before, after)).toBe(result);
});

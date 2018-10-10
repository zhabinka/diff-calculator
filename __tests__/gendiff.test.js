// @flow
import fs from 'fs';
import genDiff from '../src';

test('diff configuration', () => {
  const before = JSON.parse(fs.readFileSync('./__tests__/__fixtures__/before.json'));
  const after = JSON.parse(fs.readFileSync('./__tests__/__fixtures__/after.json'));
  const result = fs.readFileSync('./__tests__/__fixtures__/result.txt', 'utf-8');
  expect(genDiff(before, after)).toBe(result);
});

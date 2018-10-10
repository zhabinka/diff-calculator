// @flow
import fs from 'fs';
import yaml from 'js-yaml';
import genDiff from '../src';

const result = fs.readFileSync('./__tests__/__fixtures__/result.txt', 'utf-8');

test('JSON diff configuration', () => {
  const before = './__tests__/__fixtures__/before.json';
  const after = './__tests__/__fixtures__/after.json';
  expect(genDiff(before, after)).toBe(result);
});

test('YAML diff configuration', () => {
  const beforeYAML = './__tests__/__fixtures__/before.yml';
  const afterYAML = './__tests__/__fixtures__/after.yml';
  expect(genDiff(beforeYAML, afterYAML)).toBe(result);
});

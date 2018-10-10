// @flow
import fs from 'fs';
import yaml from 'js-yaml';
import genDiff from '../src';

const result = fs.readFileSync('./__tests__/__fixtures__/result.txt', 'utf-8');

test('JSON diff configuration', () => {
  const before = JSON.parse(fs.readFileSync('./__tests__/__fixtures__/before.json'));
  const after = JSON.parse(fs.readFileSync('./__tests__/__fixtures__/after.json'));
  expect(genDiff(before, after)).toBe(result);
});

test('YAML diff configuration', () => {
  const beforeYAML = yaml.safeLoad(fs.readFileSync('./__tests__/__fixtures__/before.yml', 'utf-8'));
  const afterYAML = yaml.safeLoad(fs.readFileSync('./__tests__/__fixtures__/after.yml', 'utf-8'));
  expect(genDiff(beforeYAML, afterYAML)).toBe(result);
});

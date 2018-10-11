// @flow
import fs from 'fs';
import genDiff from '../src';

test('JSON diff configuration', () => {
  const beforeJSON = './__tests__/__fixtures__/before.json';
  const afterJSON = './__tests__/__fixtures__/after.json';
  const result = fs.readFileSync('./__tests__/__fixtures__/result.txt', 'utf-8');
  expect(genDiff(beforeJSON, afterJSON)).toBe(result);
});

test('YAML diff configuration', () => {
  const beforeYAML = './__tests__/__fixtures__/before.yml';
  const afterYAML = './__tests__/__fixtures__/after.yml';
  const result = fs.readFileSync('./__tests__/__fixtures__/result.txt', 'utf-8');
  expect(genDiff(beforeYAML, afterYAML)).toBe(result);
});

test('.ini diff configuration', () => {
  const beforeINI = './__tests__/__fixtures__/before.ini';
  const afterINI = './__tests__/__fixtures__/after.ini';
  const result = fs.readFileSync('./__tests__/__fixtures__/result.txt', 'utf-8');
  expect(genDiff(beforeINI, afterINI)).toBe(result);
});

import fs from 'fs';
import genDiff from '../src';

test('JSON diff to Tree', () => {
  const beforeJSON = './__tests__/__fixtures__/before.json';
  const afterJSON = './__tests__/__fixtures__/after.json';
  const result = fs.readFileSync('./__tests__/__fixtures__/result.txt', 'utf-8');
  expect(genDiff(beforeJSON, afterJSON, 'tree')).toBe(result);
});

test('YAML diff to Tree', () => {
  const beforeYAML = './__tests__/__fixtures__/before.yml';
  const afterYAML = './__tests__/__fixtures__/after.yml';
  const result = fs.readFileSync('./__tests__/__fixtures__/result.txt', 'utf-8');
  expect(genDiff(beforeYAML, afterYAML, 'tree')).toBe(result);
});

test('.ini diff to Tree', () => {
  const beforeINI = './__tests__/__fixtures__/before.ini';
  const afterINI = './__tests__/__fixtures__/after.ini';
  const result = fs.readFileSync('./__tests__/__fixtures__/result.txt', 'utf-8');
  expect(genDiff(beforeINI, afterINI, 'tree')).toBe(result);
});

test('JSON deep diff to Tree', () => {
  const beforeJSON = './__tests__/__fixtures__/beforeDeep.json';
  const afterJSON = './__tests__/__fixtures__/afterDeep.json';
  const result = fs.readFileSync('./__tests__/__fixtures__/resultDeep.txt', 'utf-8');
  expect(genDiff(beforeJSON, afterJSON, 'tree')).toEqual(result);
});

test('YAML deep diff to Tree', () => {
  const beforeYAML = './__tests__/__fixtures__/beforeDeep.yml';
  const afterYAML = './__tests__/__fixtures__/afterDeep.yml';
  const result = fs.readFileSync('./__tests__/__fixtures__/resultDeep.txt', 'utf-8');
  expect(genDiff(beforeYAML, afterYAML, 'tree')).toEqual(result);
});

test('.ini deep diff to Tree', () => {
  const beforeINI = './__tests__/__fixtures__/beforeDeep.ini';
  const afterINI = './__tests__/__fixtures__/afterDeep.ini';
  const result = fs.readFileSync('./__tests__/__fixtures__/resultDeep.txt', 'utf-8');
  expect(genDiff(beforeINI, afterINI, 'tree')).toEqual(result);
});

#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format');
// .parse(process.argv);

const files = program.parse(process.argv).args;

if (files.length > 0) {
  const [before, after] = files;
  console.log(genDiff(before, after));
}

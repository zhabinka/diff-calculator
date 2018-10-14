#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.6.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'plain')
  .parse(process.argv);

const files = program.args;

if (files.length > 0) {
  const [before, after] = files;
  console.log(genDiff(before, after, program.format));
}

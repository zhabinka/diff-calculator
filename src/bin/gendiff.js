#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.6.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'tree')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  })    
  .parse(process.argv);

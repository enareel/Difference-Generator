#!/usr/bin/env node

import { Command } from 'commander';
import { Options } from '../src/constants.js';
import genDiff from '../src/genDiff.js';

// Формируем экземпляр объекта Команды.
const program = new Command();
program
  .name(Options.name)
  .version(Options.version)
  .description(Options.description)
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    // Выводим различия.
    console.log(genDiff(filepath1, filepath2, options.format));
  });

program.parse();

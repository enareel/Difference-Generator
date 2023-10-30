#!/usr/bin/env node

import { Command } from 'commander';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import getFiles from '../src/parsers.js';
import genDiff from '../src/genDiff.js';
import stylish from '../src/stylish.js';

// Вспомогательные данные.
const data = {
  NAME: 'gendiff',
  VERSION: '0.0.1',
  DESCRIPTION: 'Compares two configuration files and shows a difference.',
  SRC_DIR: '__fixtures__',
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Функция создания корректных путей до файлов.
 * @param {...string} paths Пути до файлов (абс. или относ.).
 * @returns {string|string[]}
 */
const makeCorrectPath = (...filepaths) => {
  const correctPath = filepaths.map((item) =>
    path.resolve(__dirname, '..', data.SRC_DIR, item)
  );
  if (correctPath.length > 1) {
    return correctPath;
  }
  return correctPath.at();
};

// Формируем экземпляр объекта Команды.
const program = new Command();
program
  .name(data.NAME)
  .version(data.VERSION)
  .description(data.DESCRIPTION)
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    if (options.format === 'stylish') {
      console.log(
        stylish(
          genDiff(...getFiles(...makeCorrectPath(filepath1, filepath2))),
          '*',
          3
        )
      );
    }
  });

program.parse();

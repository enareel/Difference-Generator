#!/usr/bin/env node

import { Command } from 'commander';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import fs from 'node:fs';
import genDiff from '../src/genDiff';

// Вспомогательные переменные
const data = {
  NAME: 'gendiff',
  VERSION: '0.0.1',
  DESCRIPTION: 'Compares two configuration files and shows a difference.',
  SRC_DIR: '__fixtures__',
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Функция определения корректных (абс. или отн.) путей файлов.
 * @param {string[]} paths Массив путей.
 * @returns {string[]}
 */
const makeCorrectPath = (paths) =>
  paths.map((item) => path.resolve(__dirname, '..', data.SRC_DIR, item));

/**
 * Функция синхронного "взятия" файлов.
 * @param {string[]} filepaths Массив путей до файлов.
 * @returns {Object[]}
 */
const getFiles = (filepaths) =>
  filepaths.map((file) => JSON.parse(fs.readFileSync(file, 'utf-8')));

// Формируем экземпляр объекта Команды
const program = new Command();
program
  .name(data.NAME)
  .version(data.VERSION)
  .description(data.DESCRIPTION)
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(getFiles(makeCorrectPath([filepath1, filepath2]))));
  });

program.parse();

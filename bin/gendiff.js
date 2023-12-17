#!/usr/bin/env node

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Command } from 'commander';
import { Options } from '../src/constants.js';
import { makeCorrectPath, readFileSync, getFormat } from '../src/utils.js';
import getData from '../src/parsers.js';
import genDiff from '../src/genDiff.js';

/**
 * Абсолютный путь до текущего файла на основе URL модуля.
 * @constant
 */
const __filename = fileURLToPath(import.meta.url);

/**
 * Абсолютный путь до папки с текущим файлом.
 * @constant
 */
const __dirname = path.dirname(__filename);

/**
 * Префиксный путь до файла.
 * @constant
 */
const prefixPath = [__dirname, '..', Options.fixturesDir];

// Формируем экземпляр объекта Команды.
const program = new Command();
program
  .name(Options.name)
  .version(Options.version)
  .description(Options.description)
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    // Считываем файлы.
    const file1 = readFileSync(makeCorrectPath(prefixPath, filepath1));
    const file2 = readFileSync(makeCorrectPath(prefixPath, filepath2));

    // Определяем расширение.
    const extName = path.extname(filepath1);

    // Parsing.
    const parsedData1 = getData(getFormat(extName), file1);
    const parsedData2 = getData(getFormat(extName), file2);

    // Выводим различия.
    console.log(genDiff(options.format, parsedData1, parsedData2));
  });

program.parse();

#!/usr/bin/env node

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Command } from 'commander';
import { Options } from '../src/constants.js';
import { makeCorrectPath, readFilesSync, getFormat } from '../src/utils.js';
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
    const files = readFilesSync(
      ...makeCorrectPath(
        [__dirname, '..', Options.fixturesDir],
        filepath1,
        filepath2
      )
    );

    // Определяем расширение.
    const extName = path.extname(filepath1);

    // Parsing.
    const parsedData = getData(getFormat(extName), ...files);

    // Выводим различия.
    console.log(genDiff(options.format, ...parsedData));
  });

program.parse();

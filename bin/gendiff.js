#!/usr/bin/env node

import { Command } from 'commander';
import { fileURLToPath } from 'node:url';
import { dirname, extname } from 'node:path';
import getData from '../src/parsers.js';
import genDiff from '../src/genDiff.js';
import { Options } from '../src/constants.js';
import { getFormat, makeCorrectPath, readFilesSync } from '../src/utils.js';

/**
 * Абсолютный путь до текущего файла на основе URL модуля.
 * @constant
 */
const __filename = fileURLToPath(import.meta.url);

/**
 * Абсолютный путь до папки с текущим файлом.
 * @constant
 */
const __dirname = dirname(__filename);

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
    const extName = extname(filepath1);

    console.log(extName);
    // Parsing.
    const parsedData = getData(getFormat(extName), ...files);

    console.log(genDiff(...parsedData));
  });

program.parse();

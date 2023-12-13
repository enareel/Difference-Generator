#!/usr/bin/env node

import { Command } from 'commander';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import getData from '../src/parsers.js';
import genDiff from '../src/genDiff.js';
import { data } from '../src/constants.js';
import { makeCorrectPath, readFilesSync } from '../src/utils.js';

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
  .name(data.NAME)
  .version(data.VERSION)
  .description(data.DESCRIPTION)
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    // Считываем файлы.
    const files = readFilesSync(
      ...makeCorrectPath([__dirname, '..', data.SRC_DIR], filepath1, filepath2)
    );

    // Парсим данные.
    const parsedData = getData();

    console.log(
      genDiff(
        ...readFilesSync(
          ...makeCorrectPath(
            [__dirname, '..', data.SRC_DIR],
            filepath1,
            filepath2
          )
        ),
        options.format
      )
    );
  });

program.parse();

/**
 * Модуль функции, демонстрирующей различия между двумя объектами.
 * @module genDiff
 */

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Options } from './constants.js';
import { makeCorrectPath, readFileSync, getFormat } from './utils.js';
import makeAST from './makeAST.js';
import getData from './parsers.js';
import getFormatter from './formatters/index.js';

/**
 * Абсолютный путь до текущего файла на основе URL модуля.
 * @constant {string}
 */
const __filename = fileURLToPath(import.meta.url);

/**
 * Абсолютный путь до папки с текущим файлом.
 * @constant {string}
 */
const __dirname = path.dirname(__filename);

/**
 * Префиксный путь до файла.
 * @constant {Array<string>}
 */
const prefixPath = [__dirname, '..', Options.fixturesDir];

/**
 * Функция демонстрации различий между двумя файлами.
 * @param {string} filepath1 Путь до первого файла.
 * @param {string} filepath2 Путь до второго файла.
 * @param {string} [formatter=stylish] Форматер.
 * @returns {import('./makeAST.js').AST}
 */
const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  // Считываем файлы.
  const fileContent1 = readFileSync(makeCorrectPath(prefixPath, filepath1));
  const fileContent2 = readFileSync(makeCorrectPath(prefixPath, filepath2));

  // Определяем расширение.
  const extName = path.extname(filepath1);

  // Parsing.
  const parsedData1 = getData(getFormat(extName), fileContent1);
  const parsedData2 = getData(getFormat(extName), fileContent2);

  // Формируем AST.
  const AST = makeAST(parsedData1, parsedData2);

  return getFormatter(formatter)(AST);
};

export default genDiff;

/**
 * Модуль тестирования функции parses.
 * @module genDiff.test
 */

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import jsYaml from 'js-yaml';
import { FORMAT_ERROR, Options } from '../src/constants.js';
import { makeCorrectPath, readFilesSync, getFormat } from '../src/utils.js';
import getData from '../src/parsers.js';

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

// Данные для парсинга.
const values = [
  {
    name: 'Парсинг данных.',
    data: [
      {
        file: 'file1.json',
        parser: JSON.parse,
      },
      {
        file: 'file6.yaml',
        parser: jsYaml.load,
      },
      {
        file: 'correctPlain1.txt',
      },
    ],
  },
];

// Тестирование парсинга файлов.
describe.each(values)('$name', ({ name, data }) => {
  test.each(data)('Проверка $file.', ({ file, parser }) => {
    // Формируем путь до файла.
    const correctPath = makeCorrectPath(
      [__dirname, '..', Options.fixturesDir],
      file
    );

    // Читаем файл.
    const element = readFilesSync(correctPath);

    // Определяем расширение.
    const extName = path.extname(file);

    expect(getData(getFormat(extName), element)).toEqual(
      parser ? parser(element) : element
    );
  });

  test('Проверка на выброс ошибки.', () => {
    // Название файла.
    const file = 'file1.html';

    // Формируем путь до файла.
    const correctPath = makeCorrectPath(
      [__dirname, '..', Options.fixturesDir],
      file
    );

    // Читаем файл.
    const element = readFilesSync(correctPath);

    // Определяем расширение.
    const extName = path.extname(file);

    expect(() => getData(getFormat(extName), element)).toThrow(
      new Error(FORMAT_ERROR)
    );
  });
});

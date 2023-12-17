/**
 * Модуль тестирования функции parses.
 * @module genDiff.test
 */

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import jsYaml from 'js-yaml';
import { FORMAT_ERROR, Options } from '../src/constants.js';
import { makeCorrectPath, readFileSync, getFormat } from '../src/utils.js';
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

/**
 * Префиксный путь до файла.
 * @constant
 */
const prefixPath = [__dirname, '..', Options.fixturesDir];

// Данные для парсинга.
const values = [
  {
    name: 'Парсинг данных.',
    data: [
      {
        filename: 'file1.json',
        parse: JSON.parse,
      },
      {
        filename: 'file6.yaml',
        parse: jsYaml.load,
      },
      {
        filename: 'correctPlain1.txt',
      },
    ],
  },
];

// Тестирование парсинга файлов.
describe.each(values)('$name', ({ data }) => {
  test.each(data)('Проверка $filename.', ({ filename, parse }) => {
    // Формируем путь до файла.
    const correctPath = makeCorrectPath(prefixPath, filename);

    // Читаем файл.
    const fileContent = readFileSync(correctPath);

    // Определяем расширение.
    const extName = path.extname(filename);

    // Вычисляем actual.
    const actual = getData(getFormat(extName), fileContent);

    // Вычисляем expected.
    const expected = parse ? parse(fileContent) : fileContent;

    expect(actual).toEqual(expected);
  });
});

test('Проверка на выброс ошибки.', () => {
  // Название файла.
  const filename = 'file1.html';

  // Формируем путь до файла.
  const correctPath = makeCorrectPath(prefixPath, filename);

  // Читаем файл.
  const fileContent = readFileSync(correctPath);

  // Определяем расширение.
  const extName = path.extname(filename);

  expect(() => getData(getFormat(extName), fileContent)).toThrow(
    new Error(FORMAT_ERROR),
  );
});
